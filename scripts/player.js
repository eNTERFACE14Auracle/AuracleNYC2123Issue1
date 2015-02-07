/*!
 * SonixTrip Reader player.js
 * http://sonixtrip.be
 *
 * Authors: Marc Thunissen, Alexis Rochette
 * Copyright Oc&eacute;  Software Laboratories - IRISIB, 2014-2015
 */

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Global data                                                                     --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		var imgMain;
		var imgAlt;
		var leftShutter,rightShutter,topShutter,bottomShutter;
		var debugMode = false;
		var logMode = false;
		var currentView = null;
		var lastPicture = null;
		var modeAutomatic = false;
		var modeSuspended = false;
		var step1 = 0;
		var step2 = 0;
		var cinematicRunning = false;
		var currentSequence = null;
		var endOfSequence = false;
		var beginOfStory = false;
		var endOfStory = false;
		var currentViewLabel = "???";
		var startTime = new Date();
		var touchController = null;

/*Main for player*/
window.onkeydown = keyDown;
startPlayer();
			
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Logging                                                                         --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function writeTrace(message)
		{
				var stamp = new Date(new Date()-startTime).toISOString().substr(11,8);
				var oldText = $("#Traces").text();
				var newText = oldText+"\n"+stamp+": "+message;
				$("#Traces").text(newText);
		}

		var userLog = [];

		function writeLog(message)
		{
				var stamp = new Date(new Date()-startTime).toISOString().substr(11,8);
				var oldText = $("#Logs").text();
				var newText = oldText+"\n"+stamp+": "+message;
				$("#Logs").text(newText);
		}
	
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- View transition                                                                 --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function goFading(view,picture)
		{
				var imgTmp = imgMain;
				imgMain = imgAlt;
				imgAlt = imgTmp;
				imgMain.onload = function()
				{
					JumpTo(imgMain,picture,view);
					CrossFade(imgAlt,imgMain,view.transition.duration,"linear");
				};
				SelectPicture(imgMain,picture.src);
		}
		
		function goFadingOut(view)
		{
				FadeOut(imgMain,view.transition.duration,"linear");
		}
		
		function goGliding(view,picture)
		{
				MoveTo(imgMain,picture,view,view.transition.duration,view.transition.motion);
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Sound management                                                                --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function getAudio(soundId)
		{
				if (!media.sounds[soundId]) return null;
				if (!media.sounds[soundId].audio)
				{
						media.sounds[soundId].audio = new Audio();
						media.sounds[soundId].audio.ready = false;

						media.sounds[soundId].audio.addEventListener("loadedmetedata",function()
						{
							writeTrace("loadedmetedata "+soundId);
						});
						media.sounds[soundId].audio.addEventListener("loadeddata",function()
						{
							writeTrace("loadeddata "+soundId);
						},false);
						media.sounds[soundId].audio.addEventListener("canplay",function()
						{
							writeTrace("canplay "+soundId);
							media.sounds[soundId].audio.ready = true;
						});
						media.sounds[soundId].audio.addEventListener("canplaythrough",function()
						{
							writeTrace("canplaythrough "+soundId);
						});

						media.sounds[soundId].audio.src = media.sounds[soundId].src;
						if (media.sounds[soundId].loop)
						{
								media.sounds[soundId].audio.loop = "loop";
						}
						media.sounds[soundId].audio.load();
				}
				return media.sounds[soundId].audio;
		}
		
/* --------------------------------------------------------------------------------------- */

		function setVolume(audio,volume,delay)
		{
				if (!delay)
				{
					audio.volume = volume;
					writeTrace("VOLUME "+audio.volume);
					return;
				}
				var count = 10;
				var timeStep = delay/10;
				if (timeStep<100)
				{
					timeStep = 100;
					count = delay/timeStep;
				}
				var volumeStep = (volume-audio.volume)/count;
				var timer = setInterval(function()
				{
					count--;
					if (count==0)
					{
						audio.volume = volume;
						clearInterval(timer);
					}
					else
					{
						var newVolume = audio.volume+volumeStep;
						if (newVolume>1) newVolume = 1;
						if (newVolume<0) newVolume = 0;
						audio.volume = newVolume;
					}
					writeTrace("VOLUME "+audio.volume);
				},timeStep);
		}

/* --------------------------------------------------------------------------------------- */

		function startAudio(audio,startPosition,volume,fadingIn)
		{
				audio.pause();
				audio.currentTime = startPosition/1000;
				audio.volume = 0;
				setVolume(audio,volume,fadingIn);
				audio.play();
		}
	
/* --------------------------------------------------------------------------------------- */

		function startSound(sound,startPosition)
		{
				var audio = getAudio(sound.id);
				if (!audio.ready)
				{
						writeTrace("SOUND "+sound.id+" loading...");
						setTimeout(function()
						{
								startSound(sound,startPosition);
						},200);
						return;
				}

				var delay = (sound.delay) ? sound.delay : 0;
				var volume = (sound.volume) ? sound.volume : 0;
				var fadeIn = ( sound.fading && sound.fading.in ) ? sound.fading.in : 0;			

				writeTrace("SOUND "+sound.id+", volume: "+volume+", startPos: "+startPosition+", delay: "+delay+", fade: "+fadeIn);

				if (startPosition)
				{
						if (delay>startPosition)
						{
							delay -= startPosition;
							startPosition = 0;
						}
						else
						{
							startPosition -= delay;
							delay = 0;
						}
				}
				else
				{
						startPosition = 0;
				}

				if (delay)
				{
						setTimeout(function()
						{
								writeTrace("SOUND "+sound.id+" START");
								startAudio(audio,startPosition,volume,fadeIn);
						},delay);
				}
				else
				{
						writeTrace("SOUND "+sound.id+" START");
						startAudio(audio,startPosition,volume,fadeIn);
				}
		}

/* --------------------------------------------------------------------------------------- */

		function stopSound(sound,fast)
		{
				var audio = getAudio(sound.id);
				var fadeOut = (fast) ? 0 : ( ( sound.fading && sound.fading.out ) ? sound.fading.out : 0 );
				setVolume(audio,0,fadeOut);
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- View management                                                                 --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function processView(view,tag,fast)
		{
				writeLog("SHOW VIEW "+tag+" ("+(modeAutomatic?"Automatic":"Manual")+(modeSuspended?" Suspended":"")+")");
				writeTrace("VIEW Starting("+tag+"): "+view.note);

				var newPicture = (lastPicture==null) || (lastPicture!=view.picture);
				lastPicture = view.picture;

				var picture = (view.picture)?(media.pictures[view.picture]):null;
				var backgroundColor = "#FFFFFF";
				if (view.backgroundColor)
				{
					backgroundColor = view.backgroundColor;
				}
				$("#LeftShutter,#RightShutter,#TopShutter,#BottomShutter,#ViewPort").css("transition-duration",view.transition.duration);
				$("#LeftShutter,#RightShutter,#TopShutter,#BottomShutter,#ViewPort").css("background-color",backgroundColor);

			// Perform the image transition

				var theView = view;
				if (fast)
				{
					var F = function() {};
					F.prototype = view;
					theView = new F();
					theView.transition = { mode : "travelling", duration: 500 };
				}

				if (picture==null)
				{
						goFadingOut(theView);
				}
				else if (newPicture)
				{
						goFading(theView,picture);
				}
				else if (theView.transition.mode=="travelling")
				{
						goGliding(theView,picture);
				}
				else
				{
						goFading(theView,picture);
				}

			// Start / stop the background sounds

				for (soundId in media.backgroundSounds)
				{
						var backgroundSound = media.backgroundSounds[soundId];
						backgroundSound.wasRunning = backgroundSound.running;
						backgroundSound.running = false;
				}
				for (idx in view.backgroundSounds)
				{
						var soundId = view.backgroundSounds[idx];
						var backgroundSound = media.backgroundSounds[soundId];
						backgroundSound.running = true;
				}
				for (soundId in media.backgroundSounds)
				{
						var backgroundSound = media.backgroundSounds[soundId];
						if ( backgroundSound.running && !backgroundSound.wasRunning )
						{
								startSound(backgroundSound,0);
						}
						else if ( !backgroundSound.running && backgroundSound.wasRunning )
						{
								backgroundSound.state = 0;
								stopSound(backgroundSound);
								writeTrace("SOUND B("+soundId+") STOP");
						}
				}

			// Start the view sounds

				for (idx in view.sounds)
				{
						startSound(view.sounds[idx],0);
				}

				if (view.duration)
				{
						writeTrace("VIEW Started("+tag+"). Duration: "+view.duration);
				}
				else
				{
						writeTrace("VIEW Started("+tag+"). Start: "+view.start);
				}
				return view.duration;
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Cinematic management                                                            --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function startCinematic(sequence,tag,startIndex)
		{
				var idx;

				writeLog("START CINEMATIC");
				writeTrace("SEQUENCE Start("+tag+")");

				var startTime = 0;
				if (startIndex)
				{
						startTime = sequence.views[startIndex].start;
				}

			// Start the sequence sounds

				for (idx in sequence.sounds)
				{
						startSound(sequence.sounds[idx],startTime);
				}

			// Schedule the pages

				$.each(sequence.views,function(idx,view)
				{
						var viewStartTime = view.start - startTime;
						if (viewStartTime>=0)
						{
								//writeTrace("VIEW Schedule("+tag+"."+idx+")");
								setTimer(function()
								{
										selectView(step1,idx);
										processView(currentView,currentViewLabel);
								},viewStartTime);
						}
				});

				var duration = sequence.duration-startTime;
				writeTrace("SEQUENCE Started("+tag+"). Duration: "+duration);
				return duration;
		}

		function stopCinematic()
		{
				var idx;
				if (!currentSequence) return;
				writeLog("STOP CINEMATIC");
				writeTrace("SEQUENCE Stopping sequence sound");
				for (idx in currentSequence.sounds)
				{
						stopSound(currentSequence.sounds[idx],true);
				}
				cinematicRunning = false;
		}
	
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Player initialization                                                           --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function startPlayer()
		{
				writeLog("STARTING");
				writeTrace("Starting");
				imgMain  = document.getElementById("MainPicture");
				imgAlt = document.getElementById("SecondPicture");
				leftShutter = document.getElementById("LeftShutter");
				rightShutter = document.getElementById("RightShutter");
				topShutter = document.getElementById("TopShutter");
				bottomShutter = document.getElementById("BottomShutter");
				$("#Traces").hide();
				$("#Logs").hide();
				$("#TouchBoard").hide();
				$("#IconClose").hide();
				$("#Welcome").hide();
				clickNext(true);

				// getAudio("BackgroundVent1");
				// getAudio("BackgroundVent2");
				// getAudio("BackgroundVent3");
				// getAudio("BackgroundDroplet");
				// getAudio("BackgroundGlacier");
				// getAudio("EventSteps");
				// getAudio("EventBell");
				// getAudio("EventStab");
				// getAudio("EventChimes");
				// getAudio("CrackClosing");
				// getAudio("Avalanche");
				// getAudio("Theme1");
				// getAudio("EndTheme");

				initTouch();
				touchController.setTouchable(true);
				
				setWindowSize($(window).width(),$(window).height());
				$(window).resize(function()
				{
					setWindowSize($(window).width(),$(window).height());
					goToFullScreen();
				});
				
				goToFullScreen();
		}

		function goToFullScreen()
		{
				if (document.body.webkitRequestFullScreen)
				{
					window.addEventListener("click",function(e)
					{
						document.body.webkitRequestFullScreen();
					});
				}
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Viewport mananager                                                              --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function setWindowSize(w,h)
		{
				writeLog("RESIZE "+w+"x"+h);
				setViewPort(w,h);
				if (currentView)
				{
						MoveTo(imgMain,media.pictures[currentView.picture],currentView,500,"linear");
				}
				touchController.setZone(80,w-80,0,h)
				$("#DebugMsg").text(w+"x"+h);
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Status display                                                                  --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function showButtons()
		{
				if (isPlayAvailable())
				{
					$("#IconPlay").show(500);
				}
				else
				{
					$("#IconPlay").hide(500);
				}

				if (isAutoAvailable())
				{
						$("#IconAuto").show(500);
				}
				else
				{
					$("#IconAuto").hide(500);
				}

				if (isNextAvailable())
				{
					$("#IconNext").show(500);
				}
				else
				{
					$("#IconNext").hide(500);
				}

				if (isBackAvailable())
				{
					$("#IconBack").show(500);
				}
				else
				{
					$("#IconBack").hide(500);
				}

				if (isPauseAvailable())
				{
					$("#IconPause").show(500);
				}
				else
				{
					$("#IconPause").hide(500);
				}

				if (isJumpAvailable())
				{
					$("#Thumbnails").css({ opacity: 1, cursor: "pointer" });
				}
				else
				{
					$("#Thumbnails").css({ opacity: 0.5, cursor: "default" });
				}

				showStatus();
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Debugging                                                                       --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function showStatus()
		{
				var status = currentViewLabel + " - " + (modeAutomatic?"Automatic":"Manual") + " - " + (modeSuspended?"Suspended":"Not suspended") + " - " + (currentSequence?(endOfSequence?"End of sequence":"In sequence"):"Out of sequence") + " - " + (cinematicRunning?"Running":"Static")
				writeTrace("STATUS "+status);
		}

		function toogleDebug()
		{
				if (logMode)
				{
					debugMode = true;
					logMode = false;
				}
				else
				{
					debugMode = !debugMode;
				}
				showLogsAndTraces();
		}

		function toogleLogs()
		{
				if (debugMode)
				{
					debugMode = false;
					logMode = true;
				}
				else
				{
					logMode = !logMode;
				}
				showLogsAndTraces();
		}
	
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- View selector                                                                   --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function selectView(i1,i2)
		{
				writeLog("SELECT "+i1+"."+i2);
				writeTrace("SELECT "+i1+"."+i2);
				step1 = i1;
				step2 = i2;
				if (media.views[step1].views)
				{
						currentView = media.views[step1].views[step2];
						currentSequence = media.views[step1];
						currentViewLabel = step1+"."+step2;
						endOfSequence = ((step2+1)==media.views[step1].views.length);
						beginOfStory = (step1==0) && (step2==0);
						endOfStory = ((step1+1)==media.views.length) && endOfSequence;
				}
				else
				{
						currentView = media.views[step1];
						currentSequence = null;
						currentViewLabel = step1;
						endOfSequence = false;
						beginOfStory = (step1==0) && (step2==0);
						endOfStory = ((step1+1)==media.views.length);
				}
				writeTrace("SELECT DONE");
				showStatus();
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Navigation on views                                                             --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function goToFirstView()
		{
				selectView(0,0);
				return true;
		}

/* --------------------------------------------------------------------------------------- */

		function goToNextView()
		{
				if ( media.views[step1].views && ((step2+1)<media.views[step1].views.length) )
				{
						selectView(step1,step2+1);
						return true;
				}
				if ((step1+1)==media.views.length)
				{
					return false;
				}
				selectView(step1+1,0);
				return true;
		}

/* --------------------------------------------------------------------------------------- */

		function goToPreviousView()
		{
				if ( media.views[step1].views && (step2>0) )
				{
						selectView(step1,step2-1);
						return true;
				}
				if (step1==0) return false;
				if (media.views[step1-1].views)
				{
						selectView(step1-1,media.views[step1-1].views.length-1);
				}
				else
				{
						selectView(step1-1,0);
				}
				return true;
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Helper functions                                                                --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function doPause()
		{
				if (currentSequence)
				{
						modeSuspended = true;
				}
				else
				{
						modeAutomatic = false;
				}
				showStatus();
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Button availibility and event handler                                           --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function isNextAvailable()
		{
				return ( !cinematicRunning && !endOfStory );
		}

		function clickNext(restart)
		{
				writeLog("CLICK NEXT");
				writeTrace("CLICK Next");
				cancelAllTimers();
				if (restart)
				{
						goToFirstView();
				}
				else
				{
						if (!goToNextView())
						{
							doPause();
							showButtons();
							return;
						}
						if (endOfStory)
						{
							showButtons();
							showEndOfStory();
						}
				}
				if (!modeSuspended)
				{
						if (currentSequence)
						{
								var duration = startCinematic(currentSequence,String(step1));
								cinematicRunning = true;
								showButtons();
								setTimer(function()
								{
										cinematicRunning = false;
										showButtons();
										if (modeAutomatic)
										{
											clickNext();
										}
								},duration);
								return;
						}
				}
				processView(currentView,currentViewLabel);
				showButtons();
				if ( modeAutomatic && ! modeSuspended )
				{
						setTimer(function()
						{
								clickNext();
						},currentView.duration);
				}
				goToFullScreen();
		}

/* --------------------------------------------------------------------------------------- */

		function isBackAvailable()
		{
				return ( !cinematicRunning && !beginOfStory );
		}

		function clickBack()
		{
				writeLog("CLICK BACK");
				writeTrace("CLICK Back");
				cancelAllTimers();
				stopCinematic();
				goToPreviousView();
				doPause();
				processView(currentView,currentViewLabel,true);
				showButtons();
				goToFullScreen();
		}

	/* --------------------------------------------------------------------------------------- */

		function isPauseAvailable()
		{
				return ( cinematicRunning || ( modeAutomatic && !modeSuspended ) );
		}

		function clickPause()
		{
				writeLog("CLICK PAUSE");
				writeTrace("CLICK Pause");
				cancelAllTimers();
				stopCinematic();
				doPause();
				showButtons();
				goToFullScreen();
		}
	
/* --------------------------------------------------------------------------------------- */

		function isPlayAvailable()
		{
				if ( !endOfStory && ( modeSuspended || ( !modeAutomatic && !cinematicRunning ) ) )
				{
					return ( currentSequence && !endOfSequence );
				}
				return false;
		}

		function isAutoAvailable()
		{
				if ( !endOfStory && ( modeSuspended || ( !modeAutomatic && !cinematicRunning ) ) )
				{
					return ( !currentSequence || endOfSequence );
				}
				return false;
		}

		function clickPlay()
		{
				writeTrace("CLICK Play");
				if ( currentSequence && !endOfSequence )
				{
						writeLog("CLICK PLAY (cinematic)");
						modeSuspended = false;
						var duration = startCinematic(currentSequence,currentViewLabel,step2);
						cinematicRunning = true;
						showButtons();
						setTimer(function()
						{
								cinematicRunning = false;
								showButtons();
								if (modeAutomatic)
								{
										clickNext();
								}
						},duration);
				}
				else
				{
						writeLog("CLICK PLAY (automatic)");
						modeSuspended = false;
						modeAutomatic = true;
						clickNext();
				}
				goToFullScreen();
		}
	
/* --------------------------------------------------------------------------------------- */

		function isJumpAvailable()
		{
				return ( !cinematicRunning && ( !modeAutomatic || modeSuspended ) );
		}

		function clickJumpToPicture(picture)
		{
				if (!isJumpAvailable()) return;
				writeLog("CLICK on picture "+picture);
				writeTrace("JUMP TO "+picture);
				cancelAllTimers();
				stopCinematic();
				var i1,i2;
				for (i1 in media.views)
				{
						if (media.views[i1].picture==picture)
						{
								writeTrace("FOUND VIEW "+i1);
								selectView(Number(i1),0);
								doPause();
								processView(currentView,currentViewLabel,true);
								showButtons();
								return;
						}
						else if (media.views[i1].views)
						{
								for (i2 in media.views[i1].views)
								{
										if (media.views[i1].views[i2].picture==picture)
										{
												writeTrace("FOUND VIEW "+i1+"."+i2);
												selectView(Number(i1),Number(i2));
												doPause();
												processView(currentView,currentViewLabel,true);
												showButtons();
												return;
										}
								}
						}
				}
				goToFullScreen();
		}
	
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */


		function showEndOfStory()
		{
				writeLog("End of the story");
				setTimeout(function()
				{
						$("#EndOfStory").css("opacity",1);
						setTimeout(function()
						{
								$("#EndOfStory").css("opacity",0);
						},5000);
				},3000);
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function initTouch()
		{
				touchController = new TouchController(document,
				{ click : function()
					{	openMenu();
					}
				, swipeRight : function()
				  { if (isBackAvailable())
				  	{	clickBack();
				  } }
				, swipeLeft : function()
				  { if (isNextAvailable())
				  	{	clickNext();
				  } }
				, swipeUp : function()
				  { if (isBackAvailable())
				  	{	clickBack();
				  } }
				, swipeDown : function()
				  { if (isNextAvailable())
				  	{	clickNext();
				  } }
				});
		}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function openMenu()
		{
				clickPause();
				debugMode = true;
				logMode = true;
				$("#TouchBoard").show();
				$("#Traces").hide();
				$("#Logs").hide();
				$("#IconClose").hide();
				touchController.setTouchable(false);
				goToFullScreen();
		}
	
		function clickTouchPlay()
		{
				$("#TouchBoard").hide();
				touchController.setTouchable(true);
				clickPlay();
				goToFullScreen();
		}

		function clickTouchPause()
		{
				$("#TouchBoard").hide();
				touchController.setTouchable(true);
				goToFullScreen();
		}
		
		function clickTouchJumpToPicture(picture)
		{
				$("#TouchBoard").hide();
				touchController.setTouchable(true);
				clickJumpToPicture(picture);
				clickPlay();
				goToFullScreen();
		}

		function clickTouchDebug()
		{
				debugMode = true;
				$("#Traces").show();
				$("#IconClose").show();
				$("#TouchBoard").hide();
				touchController.setTouchable(false);
				goToFullScreen();
		}

		function clickTouchLogs()
		{
				logMode = true;
				$("#Logs").show();
				$("#IconClose").show();
				$("#TouchBoard").hide();
				touchController.setTouchable(false);
				goToFullScreen();
		}


/* --------------------------------------------------------------------------------------- */



function keyDown(e){
    e = e || window.event;
    char = e.which || e.keyCode;
    if(char == KEY_RIGHT || char == KEY_UP){
        clickNext();
    }
    else if(char == KEY_LEFT || char == KEY_DOWN){
    	clickBack();
	}
}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		
