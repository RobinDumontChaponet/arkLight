/* ARK.Map = function (src) {
	var xhr=getXMLHttpRequest(), t=this;
	xhr.onreadystatechange  = function() { 
		if(xhr.readyState  == 4) {
			if(xhr.status  == 200) {
				var mapData = JSON.parse(xhr.responseText);
				t.terrain = mapData.terrain;
				t.weight = mapData.weight;
				t.name = mapData.name;
				console.log('t : '+t);
			} else
				throw 'xhr status for "'+src+'" : '+xhr.status;
		}
	}
	xhr.open("GET", src, true);
	loading.push(src);
	xhr.send(null);
}*/
ARK.Map = function (src)
{
	var mapData = temporaryMap;
	this.terrain = mapData.terrain;
	this.weight = mapData.weight;
	this.shadow = mapData.shadow;
	this.name = mapData.name;
	this.tile=new ARK.Tile(new ARK.TileSet(mapData.tileSet, mapData.tileWidth, mapData.tileHeight, mapData.tileSetPadding, mapData.tileProjWidth, mapData.tileProjHeight));
	ARK.backg.img.src=mapData.backgImg;
	this.backgSrc=mapData.backgImg;
	this.worldWidth=mapData.worldWidth;
	this.worldHeight=mapData.worldHeight;
	ARK.world.width=this.worldWidth;
	ARK.world.height=this.worldHeight;
}
ARK.Map.prototype.getN = function (x, y)
{
	return {
		terrain: this.terrain[y/this.tile.set.height>>0][x/this.tile.set.width>>0],
		weight: this.weight[y/this.tile.set.height>>0][x/this.tile.set.width>>0]
	}
}