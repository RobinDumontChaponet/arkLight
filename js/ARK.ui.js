// SL_ GUI/HUD utils

function getMousePos(e) {
	var canvas=ARK.front.canvas.getBoundingClientRect();
	return {
		x: e.clientX-canvas.left,
		y: e.clientY-canvas.top
	}
}

hud = {};

/*****************
 *   Counters:   *
 *****************/
 // simple (just display value) (used by others counter)
hud.Counter = function(value){
	this.el=document.createElement('div');
	this.el.className='HUDcounter';
	if(value) this.changeTo(value);
};
hud.Counter.prototype.appendTo = function (parent) {
	((parent)?parent:document.body).appendChild(this.el);
}
hud.Counter.prototype.insertBefore = function (before) {
	((before)?before.parentNode:document.body).insertBefore(this.el, before);
}
hud.Counter.prototype.changeTo = function (value) {
	this.value=value;
	this.el.innerHTML=value;
};

hud.Counter.prototype.destroy = function (){
	this.el.parentNode.removeChild(this.el);
};

 // same as above but using a span element
hud.TextCounter = function(value){
	this.el=document.createElement('span');
	this.el.className='HUDcounter';
	if(value) this.changeTo(value);
};
hud.TextCounter.prototype = (function(parent){
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(hud.Counter);


 // ImgBar
hud.ImgBar = function (src, value) {
	hud.Counter.apply(this, arguments);
	this.el.className+=' imgBar';
	this.src=src;
	if(value) this.changeTo(value);
};
hud.ImgBar.prototype = (function(parent){
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(hud.Counter);
hud.ImgBar.prototype.changeTo=function (value) {
	this.value=value;
	this.el.innerHTML='';
	for(var i=0, img; i<value; i++) {
		img = document.createElement('img');
		img.src = this.src;
		this.el.appendChild(img);
	}
};

 // ProgressBar
hud.ProgressBar = function (value) {
	hud.Counter.apply(this, arguments);
	this.el.className+=' progress';
	this.bar=document.createElement('span');
	this.el.appendChild(this.bar);
	if(value) this.changeTo(value);
};
hud.ProgressBar.prototype = (function(parent){
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(hud.Counter);
hud.ProgressBar.prototype.changeTo = function (value) {
	this.bar.style.paddingLeft=value+'%';
	this.bar.setAttribute('data-progress',Math.floor(value)+'%');
};

/*****************
 *    Modals:    *
 *****************/
 // simple (just display value) (used by others modal)
hud.Modal = function (value, animation) {
	this.el=document.createElement('div');
	this.el.className='HUDmodal';
	this.p = document.createElement('p');
	this.el.appendChild(this.p);

	if(value) this.changeTo(value, animation);
}
hud.Modal.prototype.appendTo = function (parent) {
	((parent)?parent:document.body).appendChild(this.el);
}
hud.Modal.prototype.changeTo = function (value, animation) {
	this.value=value;
	if(animation=='type')
		this.typeAnimation();
	else
		this.p.innerHTML=value;
};

hud.Modal.prototype.destroy = function () {
	this.el.parentNode.removeChild(this.el);
};
hud.Modal.prototype.typeAnimation = function (delay) {
	var array = this.value.split(""), p=this.p, delay=(delay)?delay:40,
	timer = setInterval(function (i) {
		if(array.length > 0) {
			p.innerHTML += array.shift();
		} else
			clearTimeout(timer);
	},delay);
}

 // Prompt
hud.Prompt = function (value, submitButtonValue) {
	hud.Modal.apply(this, arguments);
	this.el.className+=' prompt';
	this.submitButton = document.createElement('input');
	this.submitButton.type = 'button';
	this.submitButton.value = (submitButtonValue)?submitButtonValue:'Ok';
	this.el.appendChild(this.submitButton);
}
hud.Prompt.prototype = (function(parent) {
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(hud.Modal);


hud.Note = function ( msg, duration ) {
	var t=this;
	t.el = document.createElement('p');
	t.el.className = 'note';
	t.el.innerHTML = msg;
	if(!isNaN(duration)) {
		var timer = new Timer(function(){t.destroy()}, duration);
		t.el.addEventListener("mouseover", function(){timer.pause()}, false);
		t.el.addEventListener("mouseout", function(){timer.resume()}, false);
	}
	document.getElementById('notecontainer').appendChild( t.el );
}
hud.Note.prototype.destroy = function () {
	this.el.parentNode.removeChild(this.el)
};