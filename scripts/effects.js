/*!
 * SonixTrip Reader effects.js
 * http://sonixtrip.be
 *
 * Authors: Marc Thunissen
 * Copyright Oc&eacute;  Software Laboratories, 2014-2015
 */
	
		var timers = [];
		var viewPort = { w: 500, h: 700 };

		function setViewPort(w,h)
		{
				viewPort.w = w;
				viewPort.h = h;
		}

    function SetPosition(img,picture,view,kkk)
    {
        var min = view.area;
        var max = view.area;
        if (!min) alert(JSON.stringify(view));
        var zoom = Math.min( (viewPort.w/(min.x2-min.x1)*2), (viewPort.h/(min.y2-min.y1)*2) );
        var x = -((min.x1*zoom+min.x2*zoom)/2-viewPort.w)/2;
        var y = -((min.y1*zoom+min.y2*zoom)/2-viewPort.h)/2;
        var w = (picture.w/2)*zoom;
        var h = (picture.h/2)*zoom;

        var xMargin = (viewPort.w+(max.x1*zoom-max.x2*zoom)/2)/2;
        document.getElementById("LeftShutter").style.width = Math.round(xMargin)+"px";
        document.getElementById("RightShutter").style.width = Math.round(xMargin)+"px";

        var yMargin = (viewPort.h+(max.y1*zoom-max.y2*zoom)/2)/2;
        document.getElementById("TopShutter").style.height = Math.round(yMargin)+"px";
        document.getElementById("BottomShutter").style.height = Math.round(yMargin)+"px";

        img.style.left = Math.round(x)+"px";
        img.style.top = Math.round(y)+"px";
        img.style.width = Math.round(w)+"px";
        img.style.height = Math.round(h)+"px";
    }
    
    function JumpTo(img,picture,view)
    {
      img.style.transitionDuration = 0;
      SetPosition(img,picture,view,'1');
    }
    
    function MoveTo(img,picture,view,duration,motion)
    {
      SetTransition(img,duration,motion,true);
      SetPosition(img,picture,view,'2');
    }
    
    function SelectPicture(img,src)
    {
      img.style.transitionDuration = 0;
      img.style.opacity = 0;
      if (img.lastSrc==src)
      {
      	img.onload(); // force the event
      }
      else
      {
				img.lastSrc = src;
				img.src = src;
			}
    }
    
    function FadeIn(img,duration,motion)
    {
      SetTransition(img,duration,motion,false);
      img.style.opacity = 1;
    }

    function FadeOut(img,duration,motion)
    {
      SetTransition(img,duration,motion,false);
      img.style.opacity = 0;
    }

    function CrossFade(oldImg,newImg,duration,motion)
    {
      FadeOut(oldImg,duration,motion);
      FadeIn(newImg,duration,motion);
    }
    
    function SetTransition(img,duration,motion,move)
    {
      img.style.transitionTimingFunction = motion;
      if (move)
      { img.style.transitionProperty = "top,left,width,height,opacity";
      }
      else
      { img.style.transitionProperty = "opacity";
      }
      img.style.transitionDuration = duration+"ms";
      leftShutter.style.transitionDuration = duration+"ms";
      rightShutter.style.transitionDuration = duration+"ms";
      topShutter.style.transitionDuration = duration+"ms";
      bottomShutter.style.transitionDuration = duration+"ms";
    }

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */
/* --- Timer management                                                                --- */
/* --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------- */

		function setTimer(method,delay)
		{
				var timer = setTimeout(function()
				{
					// writeTrace("TIMER started "+timer+" ("+delay+")");
					method();
				}
				,delay);
				timers.push(timer);
				// writeTrace("TIMER scheduled "+timer+" ("+delay+")");
		}

		function cancelAllTimers()
		{
				var idx;
				for (idx in timers)
				{
						clearTimeout(timers[idx]);
				}
				timers = [];
				writeTrace("TIMERS cleared");
		}

