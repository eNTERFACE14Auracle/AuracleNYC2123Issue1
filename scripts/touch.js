/*!
 * SonixTrip Reader touch.js
 * http://sonixtrip.be
 *
 * Authors: Marc Thunissen
 * Copyright Oc&eacute;  Software Laboratories, 2014-2015
 */

		function TouchController(target,handler)
		{
				var startTouch = null;
				var touchable = false;
				var minX,maxX,minY,maxY;
				
				this.setTouchable = function(touchableValue)
				{
						touchable = touchableValue;
				};
				
				this.setZone = function(newMinX,newMaxX,newMinY,newMaxY)
				{
						minX = newMinX;
						maxX = newMaxX;
						minY = newMinY;
						maxY = newMaxY;
				};

				target.addEventListener("touchstart",function(e)
				{
						if (!touchable) return;
						if (e.changedTouches.length==0) return;
						if ( (e.changedTouches[0].clientX<minX) || (e.changedTouches[0].clientX>maxX) ) return;
						if ( (e.changedTouches[0].clientY<minY) || (e.changedTouches[0].clientY>maxY) ) return;
						e.preventDefault();
						var i;
						var pos = [];
						for (i=0;i<e.changedTouches.length;i++) pos[i] = "("+e.changedTouches[i].clientX+";"+e.changedTouches[i].clientY+")";
						writeTrace("TOUCH START "+pos.join(","));
						startTouch = e.changedTouches[0];
				},false);

				target.addEventListener("touchend",function(e)
				{
						if (!touchable) return;
						if (e.changedTouches.length==0) return;
						if ( (e.changedTouches[0].clientX<minX) || (e.changedTouches[0].clientX>maxX) ) return;
						if ( (e.changedTouches[0].clientY<minY) || (e.changedTouches[0].clientY>maxY) ) return;
						e.preventDefault();
						var i;
						var pos = [];
						for (i=0;i<e.changedTouches.length;i++) pos[i] = "("+e.changedTouches[i].clientX+";"+e.changedTouches[i].clientY+")";
						writeTrace("TOUCH END "+pos.join(","));
						if (startTouch)
						{
								startTouch = null;
								writeTrace("TOUCH INVOKE CLICK");
								handler.click();
						}
				},false);

				target.addEventListener("touchmove",function(e)
				{
						if (!touchable) return;
						if (e.changedTouches.length==0) return;
						e.preventDefault();
						var i;
						var pos = [];
						for (i=0;i<e.changedTouches.length;i++) pos[i] = "("+e.changedTouches[i].clientX+";"+e.changedTouches[i].clientY+")";
						writeTrace("TOUCH MOVE "+pos.join(","));
						if (startTouch)
						{
								var endTouch = e.changedTouches[0];
								var deltaX = endTouch.clientX-startTouch.clientX;
								var deltaY = endTouch.clientY-startTouch.clientY;
								if (Math.abs(deltaX)>Math.abs(deltaY))
								{
										if (Math.abs(deltaX)>20)
										{
												if (deltaX>0)
												{
														if ( handler && handler.swipeRight )
														{
																writeTrace("TOUCH INVOKE SWIPE RIGHT");
																handler.swipeRight();
														}
												}
												else
												{
														if ( handler && handler.swipeLeft )
														{
																writeTrace("TOUCH INVOKE SWIPE LEFT");
																handler.swipeLeft();
														}
												}
												startTouch = null;
										}
								}
								else
								{
										if (Math.abs(deltaY)>20)
										{
												if (deltaY>0)
												{
														if ( handler && handler.swipeUp )
														{
																writeTrace("TOUCH INVOKE SWIPE UP");
																handler.swipeUp();
														}
												}
												else
												{
														if ( handler && handler.swipeDown )
														{
																writeTrace("TOUCH INVOKE SWIPE DOWN");
																handler.swipeDown();
														}
												}
												startTouch = null;
										}
								}
						}
				},false);
		}
	