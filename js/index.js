  // app.initialize();
		//var sections = new Array();
		
		//build menu
		
		/*
		function showHideDivs(sec,lr) {
				var cDiv;
				divs = sec.getElementsByTagName("div");
				if (divs.length>1) {
					for(k=0; k<divs.length; k++) {
						
						if(divs[k].className=="cDiv") {
							cDiv = k;
						}
						$(divs[k]).removeClass("cDiv");
						$(divs[k]).addClass("ncDiv");	
					}
				}
				
				if (lr="r") {
					if(typeof cDiv !== 'undefined') {
						cDiv = cDiv+1;
					}
					else {
						cDiv = 0;
					}
				}
				$(divs[cDiv]).removeClass("ncDiv");				
				$(divs[cDiv]).addClass("cDiv");
		}
		*/
		
function stopAudio() {
	$("audio").each(function() {
		this.pause();
		this.currentTime = 0;
		});
	$("span").removeClass("audPlaying");
		
	
	/*
	for (k=0; k<auds.length; k++) {
		auds[k].pause();
		auds[k].currentTime=0;
		document.getElementById(audSpansArray[k]).className = "";
	}
	*/
}
		
		
		
		function goTo(el) {
				stopAudio();
						
			window.scrollTo(0,0);
			dEl = el.replace("_link","");

			//showHideDivs(document.getElementById(dEl),"r");
			
			$("section").hide();
			$("section").removeClass("current");
			/*
			secs = document.getElementsByTagName("section");
			for (i=0; i<secs.length; i++) {
				$(secs[i]).hide();
				$(secs[i]).removeClass("current");
				
			}
			*/
			$('#'+dEl).show();
			$('#'+dEl).addClass("current");
			

			
				
			
			if (el == "home") {
				$('#left').hide();
				$('#right').hide();
				$('#up').hide();
			//	screen.orientation.lock("portrait");
			}
			else {
				$('#left').show();
				$('#right').show();
				$('#up').show();
			//	screen.orientation.unlock();
			}
			
			if (dEl=="L10") {
				$('#right').hide();
			}
			
			if (dEl=="L1") {
				$('#left').hide();
			}
			
						
			
		}
		
		function left(lessons2) {
			dcur = document.getElementsByClassName("current")[0];
			//alert(dcur);
			//alert(lessons2);
			pos = lessons2.indexOf(dcur.id);
			//alert(pos);
			//alert(lessons2[pos-1]);
			goTo(lessons2[pos-1]);
		
		}
		function right(lessons2) {
			dcur = document.getElementsByClassName("current")[0];
			pos = lessons2.indexOf(dcur.id);
			goTo(lessons2[pos+1]);
		
		}
		
		
	//	window.onload = function() {
		
		goTo("home");

		lessons = [1,2,3,4,"Reading 1",5,6,7,8,"Reading 2",9,10];
		lessons2 = new Array();
	
	
	
	 
	
	
	function buildNav() {
	/*
		if(window.innerHeight < window.innerWidth || window.screen.orientation==="landscape-primary" ||  window.screen.orientation==="landscape-secondary" ){ 
			dCols =3;
			document.getElementsByTagName("BODY")[0].className="landscape";
			alert(window.screen.orientation);
		} 
		else {
			dCols = 2;
			
			document.getElementsByTagName("BODY")[0].className="portrait";
						alert(window.screen.orientation);
		}
	*/
	
	dCols =2;
	
	for(m=1; m<dCols+1; m++) {
		aul = document.createElement("ul");
		aul.id ="lList"+m;
		aul.className = "lList";
		document.getElementById("lLists").appendChild(aul); 
		if (dCols==3) {
			document.getElementById("lLists").className = "threeCols";
		}
	}
	
	
		for (i=0; i<12; i++) {
			var nl = document.createElement("LI");
			var nlt = document.createTextNode(isNaN(lessons[i])? lessons[i] : "Lesson "+lessons[i]);
			
			dbase = isNaN(lessons[i])? "R"+(lessons[i].substr(8,1)) : "L"+lessons[i];
			
			nl.id = dbase+"_link";
		
			lessons2.push(dbase);
			
			nl.onclick= function() {
				goTo(this.id);
			}
		//	alert(nl);
			nl.appendChild(nlt);
			
			if (dCols==2) {
			
				if (i<6) {
				$('#lList1').append(nl);
				}
				else {
				$('#lList2').append(nl);
				}
			
			}
			else if(dCols==3) {
				if (i<4) {
				$('#lList1').append(nl);
				}
				else if (i<8) {
				$('#lList2').append(nl);
				}
				else {
				$('#lList3').append(nl);				
				}
			}
		}
		
	} 
	// end buildNav
		
	
		
		$('#left').click(function() {
			left(lessons2);
		});
		$('#right').click(function() {
			right(lessons2);
		});
		$('#up').click(function() {
			goTo("home");
		});
	
	
	var audSpans = document.getElementsByClassName("audSpan");
	var audSpansArray = new Array();
	for (i=0; i<audSpans.length; i++) {
		audSpansArray.push(audSpans[i].id);
	}
	
	
	
//	Object.prototype.insertAfter = function (newNode) { this.parentNode.insertBefore(newNode, this.nextSibling); }
	
	
	/*  create audBits */
	for(j=0; j<audSpans.length; j++) {
		aud = document.createElement("audio");
		aud.src="audio/"+audSpans[j].id+".mp3";
		aud.id = audSpans[j].id+"_aud";
		aud.className = "audBit";
		audSpans[j].onclick = function() {
			playIt(this);
			}
		audSpans[j].parentNode.appendChild(aud);
	}
	
	
	auds = document.getElementsByClassName("audBit");
	audsArray = new Array();
	for (i=0; i<auds.length; i++) {
		audsArray.push(auds[i].id);
		auds[i].onended = function() {
		elId = this.id;
		bits = elId.split("_");
			nextId = bits[0]+"_"+bits[1]+"_"+bits[2]+"_"+(Number(bits[3])+1);
			if (document.getElementById(nextId)) {
				playIt(document.getElementById(nextId));
			}
			dSpan = document.getElementById((elId).replace("_aud",""));
			dSpan.className="";
		}
	}
	
	
	/* fin create audBits */
	
	
	/* h3 to play all  */
	h3s = document.getElementsByTagName('h3');
		for (i=0; i<h3s.length; i++) {
			h3s[i].onclick = function() {
				playIt(this.nextElementSibling.firstElementChild);				
			}
		}
	
	
	
	var pauseIt = false;
		
	
	function playIt(dSpan) {
//	alert(audSpansArray);

		if (dSpan.className=="audPlaying") {
			pauseIt = true;
		}
		stopAudio();
		
		if (!pauseIt) {	
		dSpan.className = "audPlaying";
		pos = audSpansArray.indexOf(dSpan.id);
		auds[pos].play();
		}
		pauseIt = false;
	}
	
	
	function playEm(el) {
			audis = el.getElementsByTagName("span");
			for (j=0; j<audis.length; j++) {
				dAudio = (audis[j].id).replace("","");
				document.getElementById(dAudio).onended = function() {
				dSpan = document.getElementById((this.id).replace("_aud",""));
				dSpan.className="";
				if (dSpan.nextElementSibling.tagName=="SPAN") {
					dSpan.nextElementSibling.click();
					}
				}
			}
			audis[0].click();
		}
		
		
		
		
		
	aChat = document.getElementsByClassName("dialog");
	

	
	for(i=0; i<aChat.length; i++) {
		aTable = aChat[i];
		tds = document.getElementsByTagName("td");
		dLeft = true;
		for(j=0; j<tds.length; j++) {
			if (dLeft) {
			tds[j].className = "speaker";
			dLeft = false;
			}	
			else {
			dLeft = true;
			tds[j].className = "speech";
			}
		}
	}
	
	buildNav();
	
	cMores = document.getElementsByClassName("cMore");
			for (i=0; i<cMores.length; i++) {
				cMores[i].onclick = function() {
					this.nextElementSibling.style.display=this.nextElementSibling.style.display=="block"?"none":"block";
				}
			}
	
