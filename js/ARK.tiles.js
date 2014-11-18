//

ARK.TileSet = function (src, tileWidth, tileHeight, padding, projWidth, projHeight)
{
	this.img=new Image();
	this.img.src=src;
	this.width=tileWidth;
	this.height=tileHeight;
	this.padding=(padding)?padding:0;
	this.projWidth=(projWidth)?projWidth:this.width;
	this.projHeight=(projHeight)?projHeight:this.height;
	this.columns=this.img.width/this.width>>0;
}

ARK.Tile = function (tileSet, xOrN, y)
{
	this.set=tileSet;
	if(isNaN(y)) {
		this.x = Math.floor(xOrN % this.set.columns)*(this.set.width+this.set.padding)+this.set.padding;
		this.y = Math.floor(xOrN / this.set.columns)*(this.set.height+this.set.padding)+this.set.padding;
	} else {
		this.x=xOrN;
		this.y=y;
	}
}
ARK.Tile.prototype.draw = function (ctx, projX, projY)
{
	ctx.drawImage(this.set.img, this.x, this.y, this.set.width, this.set.height, projX-ARK.viewPort.x, projY-ARK.viewPort.y, this.set.projWidth, this.set.projHeight);
}

ARK.Tile.prototype.setPosition = function (xOrN, y)
{
	if(isNaN(y)) {
		this.x = Math.floor(xOrN % this.set.columns)*(this.set.width+this.set.padding)+this.set.padding;
		this.y = Math.floor(xOrN / this.set.columns)*(this.set.height+this.set.padding)+this.set.padding;
	} else {
		this.x=xOrN;
		this.y=y;
	}
}