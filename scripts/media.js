/*!
 * SonixTrip Reader media.js
 * http://sonixtrip.be
 *
 * Authors: Marc Thunissen, Alexis Rochette
 * Copyright Oc&eacute;  Software Laboratories, 2014-2015
 */

  var media = 
  { pictures : 
    { page01 : { src : "pictures/01.jpg" , w : 1906 , h : 1080 }
    , page03 : { src : "pictures/03.jpg" , w : 1903 , h : 1080 }
    , page04 : { src : "pictures/04.jpg" , w : 1903 , h : 1080 }
    , page05 : { src : "pictures/05.jpg" , w : 1903 , h : 1080 }
    , page06 : { src : "pictures/06.jpg" , w : 1903 , h : 1080 }
    , page07 : { src : "pictures/07.jpg" , w : 1906 , h : 1080 }
    , page08 : { src : "pictures/08.jpg" , w : 1906 , h : 1080 }
    , page09 : { src : "pictures/09.jpg" , w : 1906 , h : 1080 }
    , page10 : { src : "pictures/10.jpg" , w : 1906 , h : 1080 }
    , page11 : { src : "pictures/11.jpg" , w : 1906 , h : 1080 }
    , page12 : { src : "pictures/12.jpg" , w : 1906 , h : 1080 }
    , page13 : { src : "pictures/13.jpg" , w : 1906 , h : 1080 }
    , page14 : { src : "pictures/14.jpg" , w : 1906 , h : 1080 }
    , page15 : { src : "pictures/15.jpg" , w : 1903 , h : 1080 }
    , page16 : { src : "pictures/16.jpg" , w : 1903 , h : 1080 }
    , page17 : { src : "pictures/17.jpg" , w : 1906 , h : 1080 }
    , page18 : { src : "pictures/18.jpg" , w : 1906 , h : 1080 }
    , page19 : { src : "pictures/19.jpg" , w : 1906 , h : 1080 }
    , page20 : { src : "pictures/20.jpg" , w : 1906 , h : 1080 }
    , page21 : { src : "pictures/21.jpg" , w : 1906 , h : 1080 }
    , page22 : { src : "pictures/22.jpg" , w : 613  , h : 1080 }
    , page23 : { src : "pictures/23.jpg" , w : 612  , h : 1080 }
    , page24 : { src : "pictures/24.jpg" , w : 1906 , h : 1080 }
    , page25 : { src : "pictures/25.jpg" , w : 1906 , h : 1080 }
    , page26 : { src : "pictures/26.jpg" , w : 1906 , h : 1080 }
    , page27 : { src : "pictures/27.jpg" , w : 1906 , h : 1080 }
    , page28 : { src : "pictures/28.jpg" , w : 1906 , h : 1080 }
    , page29 : { src : "pictures/credits.jpg" , w : 1903 , h : 1080 }
    }
  , sounds :
    { sOpeningMusic	: { src : "sounds/00_Musique fade out sur im 8.wav", loop : false }
		, sAmb2 	: { src : "sounds/03_Amb loop until 8.wav", loop : true }
    , sAmb3  : { src : "sounds/04_Amb loop until 6.wav", loop : true }
    , sHelico  : { src : "sounds/04_Helico fade out.wav", loop : true}
    , sAvion  : { src : "sounds/05_Avion fade out.wav", loop : true }
    , sAmb5   : { src : "sounds/06_Amb Loop until 8.wav", loop : true }
    , sEau  : { src : "sounds/07_Eau Loop until 10.wav", loop : true }
    , sMarteau   : { src : "sounds/07_Marteau.wav", loop : true }
    , sAmb7   : { src : "sounds/08_amb loop until 10.wav", loop : true }
    , sCamion  : { src : "sounds/08_Camion Loop until 12.wav", loop : true }
    , sPas7  : { src : "sounds/08_Pas loop until 10.wav", loop : true }
    , sPasFade9  : { src : "sounds/10_Pas fade out.wav", loop : true }
    , sAmb11  : { src : "sounds/12_Amb loop.wav", loop : true }
    , sElement11  : { src : "sounds/12_Element Loop until 18.wav", loop : true }
    , sElementAvionOut11  : { src : "sounds/12_Elements avion fade out.wav", loop : false }
    , sPasOut11  : { src : "sounds/12_Pas verb fade out.wav", loop : false } //1.0
    , sAmb12  : { src : "sounds/13_Amb loop.wav", loop : true }
    , sAmb13  : { src : "sounds/14_Amb loop until 17.wav", loop : true }
    , sPasFade14  : { src : "sounds/15_Pas fade out.wav", loop : false }
    , sElementFade16  : { src : "sounds/17_elements fade out.wav", loop : false }
    , sAmb17  : { src : "sounds/18_Amb metro loop until 22.wav", loop : true }
    , sAvionFade17  : { src : "sounds/18_Avion fade out.wav", loop : false }
    , sEau17  : { src : "sounds/18_Eau Loop until 22.wav", loop : true }
    , sPas17  : { src : "sounds/18_Pas loop until 22.wav", loop : true }
    , sHelicoFade18  : { src : "sounds/19_Helico fade out.wav", loop : false } //0.3
    , sAmb21  : { src : "sounds/22_amb loop until 25.wav", loop : true }
    , sIntercom21  : { src : "sounds/22_intercom.wav", loop : false }
    , sPas21  : { src : "sounds/22_Pas.wav", loop : false }
    , sPorte23  : { src : "sounds/24_Porte.wav", loop : false }
    , sAmb24  : { src : "sounds/25_Amb couloir loop until 26.wav", loop : true }
    , sAmb25  : { src : "sounds/26_Amb couloir loop until 27.wav", loop : true }
    , sPorte25  : { src : "sounds/26_porte.wav", loop : false }
    , sAmb26  : { src : "sounds/27_Amb couloir loop until 29.wav", loop : true }
    , sPorteFade26  : { src : "sounds/27_porte fade out.wav", loop : false }
    , sPorte27  : { src : "sounds/28_porte.wav", loop : false }
    , sGenerique  : { src : "sounds/09 The Four of Us are Dying.wav", loop : true }
		}
  , backgroundSounds :
    { bOpeningMusic     : { id : "sOpeningMusic" , volume : 0.5 , fading : { in : 100, out : 100, change : 0 }, restart : true}
    , bAmb2 						: { id : "sAmb2"      , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb3 						: { id : "sAmb3"      , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bHelico           : { id : "sHelico"    , volume : 0.5 , fading : { in : 100, out : 1000, change : 0 } }
    , bAvion 						: { id : "sAvion" 	  , volume : 0.5 , fading : { in : 100, out : 1000, change : 0 } }
    , bAmb5             : { id : "sAmb5"      , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bEau              : { id : "sEau"       , volume : 1.0 , fading : { in : 100, out : 100, change : 0 } }
    , bMarteau          : { id : "sMarteau"   , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb7             : { id : "sAmb7"      , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bCamion           : { id : "sCamion"    , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPas7             : { id : "sPas7"      , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPasFade9         : { id : "sPasFade9"  , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb11            : { id : "sAmb11"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bElement11        : { id : "sElement11" , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bElementAvionOut11  : { id : "sElementAvionOut11" , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPasOut11         : { id : "sPasOut11"  , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb12            : { id : "sAmb12"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb13            : { id : "sAmb13"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPasFade14        : { id : "sPasFade14" , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bElementFade16    : { id : "sElementFade16" , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb17            : { id : "sAmb17"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAvionFade17      : { id : "sAvionFade17"   , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bEau17            : { id : "sEau17"     , volume : 1.0 , fading : { in : 100, out : 100, change : 0 } }
    , bHelicoFade18     : { id : "sHelicoFade18"  , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPas17            : { id : "sPas17"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb21            : { id : "sAmb21"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bIntercom21       : { id : "sIntercom21"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPas21            : { id : "sPas21"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPorte23          : { id : "sPorte23"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb24            : { id : "sAmb24"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb25            : { id : "sAmb25"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPorte25          : { id : "sPorte25"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bAmb26            : { id : "sAmb26"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPorteFade26      : { id : "sPorteFade26"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bPorte27          : { id : "sPorte27"     , volume : 0.5 , fading : { in : 100, out : 100, change : 0 } }
    , bGenerique        : { id : "sGenerique" , volume : 0.5 , fading : { in : 100, out : 100, change : 0 }, restart : true}
    }
  , views :
    [ { note : "NYC2123_0"
      , picture : "page01"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080 }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bOpeningMusic" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "New York_1"
      , picture : "page03"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bOpeningMusic", "bAmb2" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "2123_2"
      , picture : "page04"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bOpeningMusic", "bAmb2", "bAmb3", "bHelico" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "Two figures_3"
      , picture : "page05"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bOpeningMusic", "bAmb2", "bAmb3", "bHelico", "bAvion" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "At Night_4"
      , picture : "page06"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bOpeningMusic", "bAmb2", "bHelico" , "bAvion", "bAmb5" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "It had a bushy_5"
      , picture : "page07"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bOpeningMusic", "bAmb2", "bHelico", "bAvion", "bAmb5", "bEau", "bMarteau"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Gray at Night_6"
      , picture : "page08"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bEau", "bMarteau", "bAmb7", "bCamion", "bPas7" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "Brooklyn Rivera_7"
      , picture : "page09"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : ["bEau", "bMarteau", "bAmb7", "bCamion", "bPas7"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Ask Wagner_8"
      , picture : "page10"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : ["bMarteau", "bCamion", "bPasFade9"]
      ,"backgroundColor": "#000000"
      }
    , { note : "The methoxyhene..._9"
      , picture : "page11"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bCamion", ]
      ,"backgroundColor": "#000000"
      }
    , { note : "His Vision, annoying squirrel_10"
      , picture : "page12"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bCamion", "bAmb11", "bElement11", "bElementAvionOut11", "bPasOut11"]
      ,"backgroundColor": "#000000"
      }
    , { note : "The Concrete_11"
      , picture : "page13"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : ["bAmb11", "bElement11", "bElementAvionOut11", "bPasOut11", "bAmb12"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Give me a patch laney_12"
      , picture : "page14"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bElement11", "bElementAvionOut11", "bPasOut11", "bAmb13"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Are you kidding_13"
      , picture : "page15"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [  "bElement11", "bElementAvionOut11", "bPasOut11", "bAmb13", "bPasFade14"]
      ,"backgroundColor": "#000000"
      }
    , { note : "For fuck's sake_14"
      , picture : "page16"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bElement11", "bElementAvionOut11", "bPasOut11", "bAmb13", "bPasFade14"]
      ,"backgroundColor": "#000000"
      }
    , { note : "_15"
      , picture : "page17"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bElement11", "bElementFade16"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Asshuhhhhhhle_16"
      , picture : "page18"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bAmb17", "bAvionFade17", "bEau17", "bPas17"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Moon_17"
      , picture : "page19"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bAmb17", "bAvionFade17", "bEau17", "bPas17"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Door large_18"
      , picture : "page20"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bAmb17", "bAvionFade17", "bEau17", "bPas17"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Door close_19"
      , picture : "page21"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bAmb17", "bAvionFade17", "bEau17", "bPas17", "bHelicoFade18"]
      ,"backgroundColor": "#000000"
      }
    , { note : "What's a pretty_20"
      , picture : "page22"
      , area : { x1: 0, y1: 0, x2: 612, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bHelicoFade18", "bAmb21", "bIntercom21", "bPas21"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Free country_21"
      , picture : "page23"
      , area : { x1: 0, y1: 0, x2: 612, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bHelicoFade18", "bAmb21", "bIntercom21"]
      ,"backgroundColor": "#000000"
      }
    , { note : "The hydraulics wind up_22"
      , picture : "page24"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : ["bAmb21", "bPorte23" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "Open source anything_23"
      , picture : "page25"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : ["bAmb24" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "laney stepped_24"
      , picture : "page26"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : ["bAmb25","bPorte25" ]
      ,"backgroundColor": "#000000"
      }
    , { note : "Red Lamp_25"
      , picture : "page27"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bAmb26", "bPorteFade26"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Green Lamp_26"
      , picture : "page28"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 10 }
      , duration : 3000
      , backgroundSounds : [ "bAmb26", "bPorte27"]
      ,"backgroundColor": "#000000"
      }
    , { note : "Credits_27"
      , picture : "page29"
      , area : { x1: 0, y1: 0, x2: 1903, y2: 1080  }
      , transition : { mode : "", duration: 500 }
      , duration : 3000
      , backgroundSounds : [ "bGenerique" ]
      ,"backgroundColor": "#000000"
      }
    ]
  
  };
