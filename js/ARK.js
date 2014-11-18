// ARK_ a2.6.2_ r-dc_
// Core_

var ARK = {};
ARK.editor='';

ARK.update = function()
{
	ARK.player.move(ARK.controls.left*(-5+ARK.controls.shift*-4)+ARK.controls.right*(5+ARK.controls.shift*4), ARK.controls.up*(-5+ARK.controls.shift*-4)+ARK.controls.down*(5+ARK.controls.shift*4));
	if(ARK.controls.space && !ARK.player.falling)
		ARK.player.jump();
}

function ARKinit (backg, front, width, height)
{
	ARK.backg.canvas = backg;
	ARK.backg.ctx = backg.getContext('2d');
	ARK.front.canvas = front;
	ARK.front.ctx = front.getContext('2d'),
	ARK.backg.canvas.setAttribute('width', width);
	ARK.backg.canvas.setAttribute('height', height);
	ARK.front.canvas.setAttribute('width', width);
	ARK.front.canvas.setAttribute('height', height);
	ARK.width = width;
	ARK.height = height;
	ARK.map;
	ARK.xOrigin;
	ARK.yOrigin;
	ARK.viewPort.width = width;
	ARK.viewPort.height = height;
	ARK.viewPort.x=0;
	ARK.viewPort.y=0;
	ARK.viewPort.oldX=ARK.viewPort.x;
	ARK.viewPort.oldY=ARK.viewPort.y;
	ARK.viewPort.leadX=ARK.width/2;
	ARK.viewPort.leadY=ARK.height/2;
	//ARK.world.width=1600;
	//ARK.world.height=600;
	window.onkeydown=ARK.controls.keyed;
	window.onkeyup=ARK.controls.dekeyed;
	
	//ARK.backg.ctx.setTransform(1, Math.tan(Math.PI/4), 0, 1, 0, 0);

	setInterval(ARK.update, 40);
}

preloadImg (new Array('sprites/sprite2.png', 'tiles/med/med.png', 'tiles/med/moto.png'));
preloadAudio (new Array('assets/sfx-player-step.mp3'));

function init ()
{
	ARKinit(document.getElementById('backg'), document.getElementById('front'), 800, 600);
	quad = new QuadTree(0, 0, ARK.width, ARK.height);

	ARK.backg.map=new ARK.Map('maps/1.json');
	
	ARK.player = new ARK.entities.Character('player', new ARK.Tile(new ARK.TileSet('sprites/sprite2.png', 54, 94, 0), 52), 50, 200, 52, 88);
	ARK.entities.add(ARK.player);

	moto0 = new ARK.entities.Character('bot', new ARK.Tile(new ARK.TileSet('tiles/med/moto.png', 224, 73, 0, 98, 32), 0), 100, 144);
	ARK.entities.add(moto0);

	stepLSound = new ARK.sounds.sound('assets/sfx-player-step.mp3');
	stepRSound = new ARK.sounds.sound('assets/sfx-player-step.mp3');

	document.getElementById('game').style.opacity=1;

	ARK.backg.draw();
	ARK.front.draw();
	
	
	if(ARK.editor) editorInit();
}
window.onload=init;