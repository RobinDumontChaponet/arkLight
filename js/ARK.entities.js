ARK.entities = {
	'list':[],
	'toDraw':[],
	'id':0
};



ARK.entities.Entity = function (type, tile, x, y, width, height, behavior)
{
	this.type=type;
	this.x = x;
	this.y = y;
	this.oldX = this.x;
	this.oldY = this.y;
	//this.frame=0;
	//this.move=0;
	this.tile=tile;
	this.width=(width)?width:this.tile.set.projWidth;
	this.height=(height)?height:this.tile.set.projHeight;

	this.toDraw=false;
	this.colliding=[];
	this.xVel=0;
	this.yVel=0;
	this.zVel=0;
	this.cL=this.cR=this.cT=this.cD=1;
	this.cdL=this.cdR=this.cdT=this.cdD=0;
	this.moving=false;

	this.behavior=behavior;
	console.log(behavior);
};
ARK.entities.Entity.prototype.draw = function()
{
	if(!this.toDraw && intersects(this, ARK.viewPort))
	{
		this.toDraw=true;
		ARK.entities.toDraw.push(this);
	}
};

ARK.entities.Character = function (type, tile, x, y, width, height, behavior)
{
	ARK.entities.Entity.apply(this, arguments);
};

ARK.entities.Plateform = function (type, tile, x, y, width, height, behavior)
{
	ARK.entities.Entity.apply(this, arguments);
};




ARK.entities.add = function(entity)
{
	ARK.entities.list.push(entity);
	entity.draw();
	entity.id=++ARK.entities.id;
	quad.add(entity);
}

ARK.entities.Entity.prototype.remove = function(entity)
{
	ARK.entities.list.splice(ARK.entities.list.indexOf(entity), 1);
	ARK.front.ctx.clearRect(this.X-ARK.viewPort.x, this.y-ARK.viewPort.y, this.width, this.height);
	ARK.entities.id--;
	quad.remove(entity);
}

	
ARK.entities.Entity.prototype.isColliding = function()
{ //detect & handle collisions.
	var t=this, tQuad=t.quad[t.quadid], i=tQuad.length;
	t.colliding.length=0;
	t.cL=t.cR=t.cT=t.cD=1;
	t.cdL=t.cdR=t.cdT=t.cdD=0;
	for(;i--;)
	{
		var collider=tQuad[i], dist;
		if(intersects(t, collider) && collider.id!=t.id) // : sweep
		{
			// prune :
			t.colliding.push(collider);
			t.cL=(t.x+t.xVel < collider.x+collider.width && t.x > collider.x+collider.width*.5 && t.y+t.height-4>collider.y)?0:t.cL;
			//|| !ARK.backg.map.weight[(t.x/ARK.backg.map.tile.set.width>>0)-1][(t.y/ARK.backg.map.tile.set.height>>0)-1]
			t.cR=(t.x+t.width+t.xVel > collider.x && t.x+t.width*.5 < collider.x && t.y+t.height-4>collider.y)?0:t.cR;
			t.cT=(t.y < collider.y+collider.height && t.y > collider.y+collider.height*.5)?0:t.cT;
			//t.cD=(t.y+t.height+t.yVel > collider.y && t.y+t.height*.5 < collider.y)?0:t.cD;


			if( t.y+t.height+t.yVel >= collider.y){
				t.cD=0;
				var dist=collider.y-(t.y+t.height+t.yVel);
				t.cdD=( dist<t.cdD)?dist:t.cdD;
				console.log('cD : '+t.cD+'; cdD : '+t.cdD);
			}


		}
	}
	//console.log(t.cL, t.cR, t.cT, t.cD);
	return t.colliding.length;
};


ARK.entities.Character.prototype = (function(parent)
{
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(ARK.entities.Entity);

ARK.entities.Plateform.prototype = (function(parent)
{
	function protoCreator(){};
	protoCreator.prototype = parent.prototype;
	return new protoCreator();
})(ARK.entities.Entity);


ARK.entities.Character.prototype.gravity = function()
{
	/*if((this.y<ARK.height-this.height)*this.cD) {
		this.falling=true;
		if(this.zVel<6)
			this.zVel++;
		this.y+=this.zVel;
		this.draw();
	} else {
		this.zVel=this.cdD;

		this.falling=false;
	}*/
};
ARK.entities.Plateform.prototype.gravity = function() {};


ARK.entities.Character.prototype.jump = function(speed)
{
	var t=this, jumpHeight=60, start=this.y, vel=-8, jump=setInterval(function()
	{
		if(vel>-2)
			vel++;
		if(t.y<=start-jumpHeight || !t.cT)
			clearInterval(jump);
		t.y+=vel;
		t.draw();
	}, 8);
};

ARK.entities.Character.prototype.move = function(xVel, yVel)
{
	if(xVel!=0 && yVel!=0) { xVel/=1.3; yVel/=1.3 }
	this.xVel=xVel;
	this.yVel=yVel;
	if((this.xVel!=0 || this.yVel!=0) && !this.moving){
		var t=this;
		t.moving=true;
		t.x=(t.x+t.xVel*((t.xVel>0)?t.cR:t.cL))|0;
		t.y=(t.y+t.yVel*((t.yVel>0)?t.cD:t.cT))|0;
		t.tile.x+=t.tile.set.width*t.cR*t.cL;
		if(t.tile.x==t.tile.set.width*t.tile.set.columns) t.tile.x=0;
		//if(t.tile.x/t.tile.set.width==2) stepLSound.pPlay(0);
		//if(t.tile.x/t.tile.set.width==9) stepRSound.pPlay(0);
		t.tile.y=(((t.xVel!=0)?t.xVel/Math.abs(t.xVel)*3:0)+((t.yVel!=0)?t.yVel/Math.abs(t.yVel):0)+4)*t.tile.set.height;
		t.draw();
		setTimeout(function(){t.move()},4);
	} else {
		this.moving=false;
	}
};