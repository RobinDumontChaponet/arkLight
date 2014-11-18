// SL_ I/O utils

//console = {"log":function(x) {new hud.Note(x, 2000)}};

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall) }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function preloadImg (array) {
	for(var i=0, l=array.length; i<l; i++) {
		var el=new Image();
		el.src=array[i];
		el.onload = function()
		{
			//console.log('prelodImg: '+this.src);
			new hud.Note('Image "'+this.src+'" has been preload', 4000);
			delete el;
		}
	}
}
function preloadAudio (array) {
	for(var i=0, l=array.length; i<l; i++) {
		var el=new Audio();
		el.src=array[i];
		el.addEventListener('canplaythrough', function()
		{
			//console.log('prelodAudio: '+this.src);
			new hud.Note('Audio "'+this.src+'" has been preload', 4000);
			delete el;
		});
	}
}

function getXMLHttpRequest() {
	var xhr=false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
		try {
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xhr = false;
		}
	}
	@end @*/
	if (!xhr && typeof XMLHttpRequest!='undefined')
		try {
			xhr = new XMLHttpRequest();
		} catch (e) {
			xhr=false;
		}
	if (!xhr && window.createRequest)
		try {
			xhr = window.createRequest();
		} catch (e) {
			xhr=null;
		}
	return xhr;
}

var loading=[];

function aGet (src, callback) {
	var xhr=getXMLHttpRequest();
	xhr.onreadystatechange  = function() { 
		if(xhr.readyState  == 4)
			if(xhr.status  == 200)
				if(callback) callback(xhr.responseText);
			else
				throw 'xhr status for "'+src+'" : '+xhr.status;
	}
	xhr.open("GET", src, true);
	loading.push(src);
	xhr.send(null);
}

function h(s){
	for(var i=0,l=s.length,h=0;i<l;i++)h=((h<<5)-h)+s.charCodeAt(i);
	return h>>>0;
}
// h(streetlight.toString()); -> to Post & compare !

//addEventListener polyfill 1.0 / Eirik Backer / MIT Licence
(function(win, doc){
	if(win.addEventListener)return;		//No need to polyfill
 
	function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
	function addEvent(on, fn, self){
		return (self = this).attachEvent('on' + on, function(e){
			e = e || win.event;
			e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
			e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
			fn.call(self, e);
		});
	}
	function addListen(obj, i){
		if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
		else obj.addEventListener = addEvent;
		return obj;
	}
 
	addListen([doc, win]);
	if('Element' in win)win.Element.prototype.addEventListener = addEvent;			//IE8
	else{		//IE < 8
		doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});		//Make sure we also init at domReady
		docHijack('getElementsByTagName');
		docHijack('getElementById');
		docHijack('createElement');
		addListen(doc.all);	
	}
})(window, document);

if(document.getElementsByClassName==undefined){
	document.getElementsByClassName = function(className, parentElement) {
	if (Prototype.BrowserFeatures.XPath) {
		var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
		return document._getElementsByXPath(q, parentElement);
	} else {
		var children = ($(parentElement) || document.body).getElementsByTagName('*');
		var elements = [], child;
		for (var i = 0, length = children.length; i < length; i++) {
			child = children[i];
			if (Element.hasClassName(child, className))
				elements.push(Element.extend(child));
			}
			return elements;
		}
	};
}

function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}