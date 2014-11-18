// JavaScript Document

ARK.webAudio = {
	'ctx': ''
};

ARK.webAudio.init = function ()
{
	if (typeof AudioContext !== "undefined")
		ARK.sounds.ctx = new AudioContext();
	else if (typeof webkitAudioContext !== "undefined")
		ARK.sounds.ctx = new webkitAudioContext();
	else
		throw new Error('AudioContext not supported.');
}

ARK.webAudio.sound = function (src)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", src, true);
	xhr.responseType = "arraybuffer";
	
	xhr.onload = function() {
		// create a sound source
		this.source = ARK.webAudio.ctx.createBufferSource();
		// The Audio Context handles creating source buffers from raw binary
		this.buffer = ARK.webAudio.ctx.createBuffer(xhr.response, true/* make mono */);
		// Add the buffered data to our object
		this.source.buffer = this.buffer;
		// Plug the cable from one thing to the other
		this.source.connect(ARK.webAudio.ctx.destination);
	};
	xhr.send();
};
ARK.webAudio.sound.prototype.play = function (startPos)
{
	this.source.noteOn(ARK.webAudio.ctx.currentTime);
	this.source.start(startPos);
};
ARK.webAudio.sound.prototype.stop = function ()
{
	this.source.noteOff(ARK.webAudio.ctx.currentTime);
	this.source.stop();
};

///////////////////////////////////////////////////////

ARK.audioTag = {
	'ctx': '',
	'soundSource': '', 
	'soundBuffer': ''
};

ARK.audioTag.sound = function (src)
{
	this.el=document.createElement('audio');
	this.el.preload='auto';
	this.el.autobuffer='autobuffer';
	this.el.src=src;
};
ARK.audioTag.sound.prototype.play = function (startPos)
{
	this.el.currentTime=startPos;
	this.el.play();
};
ARK.audioTag.sound.prototype.pPlay = function (startPos)
{
	var tmp=this.el.cloneNode(false);
	tmp.addEventListener('canplaythrough', function()
	{
		tmp.currentTime=startPos;
		tmp.play();
	});
	tmp.addEventListener('ended', function() 
	{
		delete tmp;
	});
};
ARK.audioTag.sound.prototype.pause = function ()
{
	this.el.pause();
};

//////////////////////////////////////////////////////////


/*if (typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined")
{ // webAudio API
	ARK.sounds = ARK.webAudio;
	delete ARK.audioTag;
	ARK.sounds.init();
}
else */if(!!document.createElement('audio').canPlayType)
{ // audio TAG
	ARK.sounds = ARK.audioTag;
	delete ARK.webAudio;
}