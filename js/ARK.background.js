ARK.backg =
{
	img: new Image()
};

ARK.backg.draw = function ()
{
	var map=ARK.backg.map,
	l = ARK.viewPort.y+ARK.viewPort.height/map.tile.set.projHeight>>0;
	l = (l>map.terrain.length)?map.terrain.length:l;
	for(var row = ARK.viewPort.y/map.tile.set.projHeight>>0; row < l; row++)
		for(var column = ARK.viewPort.x/map.tile.set.projWidth>>0, ll = map.terrain[row].length; column < ll; column++) {
			if(map.terrain[row][column]!=-1)
				ARK.backg.ctx.clearRect(column*map.tile.set.projWidth-ARK.viewPort.oldX, row*map.tile.set.projHeight-ARK.viewPort.oldY, map.tile.set.projWidth, map.tile.set.projHeight);
			map.tile.setPosition(map.terrain[row][column]);
			map.tile.draw(ARK.backg.ctx, column*map.tile.set.projWidth, row*map.tile.set.projHeight);
		}
}
ARK.backg.img.onload = function(){
	this.id='staticbackg';
	document.getElementById('game').appendChild(this);
};