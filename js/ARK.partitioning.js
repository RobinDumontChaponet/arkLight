// JavaScript Document

/*function QuadTree (x, y, width, height) {
	this.tree=[];
	this.tree.push([], [], [], []);
	this.type='quad';
	this.x=x;
	this.y=y;
	this.width=width
	this.height=height;
}
QuadTree.prototype.add = function(entity) {
	var i;
	if(entity.x<this.x+this.width*.5)
		i=(entity.y<this.y+this.height*.5)?0:2;
	else
		i=(entity.y<this.y+this.height*.5)?1:3;
	if(this.tree[i].type=='quad')
		this.tree[i].add(entity);
	else {
		this.tree[i].push(entity);
		entity.quad=this.tree;
		entity.quadid=i;
		if(this.tree[i].length>20) {
			var qt=new QuadTree(((i&1)==1)?this.x+this.width*.5:this.x, (i>2)?this.y+this.height*.5:this.y,this.width*.5, this.height*.5);
			qt.subdivide(this.tree[i]);
			this.tree[i]=qt;
		}
	}
};
QuadTree.prototype.subdivide = function(leaves) {
	var t=this;
	for(var i=leaves.length-1; i--;) {
		t.add(leaves[i]);
	}
};
QuadTree.prototype.remove = function(entity) { //remove from the entire tree
	//for(i in entity.quad) {
	//	if(entity.quad[i]==entity)
	//		entity.quad.split(i);
	//}
	throw 'remove from quad, not yet implemented !';
};*/


function QuadTree (x, y, width, height) {
	this.tree=[];
	this.tree.push([]);
	this.type='simple';
	this.x=x;
	this.y=y;
	this.width=width
	this.height=height;
}
QuadTree.prototype.add = function(entity) {
	this.tree[0].push(entity);
	entity.quad=this.tree;
	entity.quadid=0;
};
QuadTree.prototype.remove = function(entity) {
	this.tree.splice(this.tree.indexOf(entity), 1);
};


// returns true if there is any overlap
function intersects(a, b) {
	return !(
		((a.y + a.height) < (b.y)) ||
		(a.y > (b.y + b.height)) ||
		((a.x + a.width) < b.x) ||
		(a.x > (b.x + b.width))
	);
}