// JavaScript Document

ARK.behaviors = {};

ARK.behaviors.Behavior = function ()
{
	console.log('behavior fetched');
};
ARK.behaviors.Behavior.prototype.update = function ()
{
};



ARK.behaviors.Player = function (entity)
{
	ARK.behavior.Behavior.apply(this, arguments);
};
ARK.behaviors.Player.prototype = (function(parent)
{
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(ARK.behaviors.Behavior);



ARK.behaviors.Bot = function (entity)
{
	ARK.behavior.Behavior.apply(this, arguments);
};
ARK.behaviors.Bot.prototype = (function(parent)
{
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(ARK.behaviors.Behavior);