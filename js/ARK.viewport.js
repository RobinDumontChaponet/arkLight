ARK.world = {};

ARK.viewPort = {};

ARK.viewPort.update = function ()
{
	this.oldX=this.x;
	this.oldY=this.y;

	// Horizontal
	if(ARK.player.x - this.x  + this.leadX > this.width)
		this.x = ARK.player.x - (this.width - this.leadX);
	else if(ARK.player.x  - this.leadX < this.x)
		this.x = ARK.player.x  - this.leadX;
	if (this.x < 0)
		this.x = 0;
	if (this.x+this.width > ARK.world.width)
		this.x = ARK.world.width - this.width;
	
	// Vertical
	if(ARK.player.y - this.y  + this.leadY > this.height)
		this.y = ARK.player.y - (this.height - this.leadY);
	else if(ARK.player.y  - this.leadY < this.y)
		this.y = ARK.player.y  - this.leadY;
	if (this.y < 0)
		this.y = 0;
	if (this.y+this.height > ARK.world.height)
		this.y = ARK.world.height - this.height;

	if(this.x!=this.oldX || this.y!=this.oldY) {
		ARK.backg.draw();
		for(var i=ARK.entities.list.length; i--;)
			ARK.entities.list[i].draw();
	}
}