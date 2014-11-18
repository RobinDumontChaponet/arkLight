ARK.front = {};
ARK.front.draw = function ()
{
	requestAnimationFrame(ARK.front.draw);
	ARK.viewPort.update();
	var l=ARK.entities.toDraw.length;
	if(l)
	{
		for (l; l--;)
		{
			var t=ARK.entities.toDraw[l];
			ARK.front.ctx.clearRect(t.oldX-ARK.viewPort.oldX, t.oldY-ARK.viewPort.oldY, t.width, t.height);
			
			t.isColliding(); //update t.colliding property (array).
			for(var i=t.colliding.length;i--;)
				t.colliding[i].draw();
		}

		for (l=ARK.entities.toDraw.length; l--;)
		{
			var t=ARK.entities.toDraw[l];

			t.tile.draw(ARK.front.ctx, t.x, t.y);

			t.oldX=t.x; t.oldY=t.y;
			t.toDraw=false;
			t.gravity();
			ARK.entities.toDraw.splice(l,1);
		}
	}
}
