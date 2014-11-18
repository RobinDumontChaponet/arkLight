// ARK_ a2.6.2_ r-dc_
// Editor_

ARK.editor=true;

function tilesLibInit (list) {
	var tilesLib = document.createElement('div'), map=ARK.backg.map;
	tilesLib.id='tilesLib';
	for(var i=0, l=list.length; i<l; i++) {
		var img=document.createElement('img'), set=list[i];
		img.src=set.img.src;
		img.width=set.projWidth*set.columns+set.padding*set.columns;
		img.height=set.projHeight*(set.img.height/set.height>>0)+set.padding*(set.img.height/set.height>>0);
		img.onclick=function(e){
			var el=this.getBoundingClientRect(),
			map=ARK.backg.map,
			p = {
				x: e.clientX-el.left,
				y: e.clientY-el.top
			};
				n=(p.y/(set.projHeight+set.padding)>>0)*set.columns+(p.x/(set.projWidth+set.padding)>>0);
			console.log(p.y, set.width, set, n);
		};
		tilesLib.appendChild(img);
	}
	document.body.appendChild(tilesLib);
}
var n=1, tool='addMap', snap=false;

function toggleSnap (button) {
	snap=(snap===true)?false:true;
	button.classList.toggle('active');
}
function snap2grid (pos, gridWidth, gridHeight) {
	return {
		x: Math.floor(pos.x/gridWidth)*gridWidth,
		y: Math.floor(pos.y/gridHeight)*gridHeight
	}
}

function saveMap (button) {
	var map=ARK.backg.map,
	file = '"tileSet" : "'+map.tile.set.img.src+'",<br />"tileSetPadding": '+map.tile.set.padding+',<br />"tileWidth": '+map.tile.set.width+',<br />"tileHeight": '+map.tile.set.height+',<br />"tileProjWidth": '+map.tile.set.projWidth+',<br />"tileProjHeight": '+map.tile.set.projHeight+',<br />"backgImg": "'+map.backgSrc+'",<br />"worldWidth": '+map.worldWidth+',<br />"worldHeight": '+map.worldHeight+',<br /><br />',
	ent = ARK.entities.list;

	file += '<br />"entities" : [<br />';
	for (var i=0, l = ent.length; i<l; i++) {
		file += "&nbsp;&nbsp;&nbsp;&nbsp;ARK.entities.add(new ARK.entities.Character ('"+ent[i].type+"', new ARK.Tile(new ARK.TileSet("+ent[i].tile.set.img.src+", "+ent[i].tile.set.width+", "+ent[i].tile.set.height+", "+ent[i].tile.set.padding+", "+ent[i].tile.set.projWidth+", "+ent[i].tile.set.projHeight+"), "+ent[i].tile.x+", "+ent[i].tile.y+"), "+ent[i].x+", "+ent[i].y+"), "+ent[i].width+", "+ent[i].height+");<br />";
	}
	file += '],<br />';

	file += '<br />"terrain" : [<br />';
	for(var row = 0, l=map.terrain.length; row < l; row++) {
		file+='&nbsp;&nbsp;&nbsp;&nbsp;[';
		for(var column = 0, ll = map.terrain[row].length-1; column < ll; column++)
			file+=map.terrain[row][column]+', ';
		file+=map.terrain[row][column++];
		file+='],<br />';
	}
	file += '],<br />';

	file += '<br />"weight" : [<br />';
	for(var row = 0, l=map.weight.length; row < l; row++) {
		file+='&nbsp;&nbsp;&nbsp;&nbsp;[';
		for(var column = 0, ll = map.weight[row].length-1; column < ll; column++)
			file+=map.weight[row][column]+', ';
		file+=map.weight[row][column++];
		file+='],<br />';
	}
	file += '],<br />';

	file += '<br /><br />"shadow" : [<br />';
	for(var row = 0, l=map.shadow.length; row < l; row++) {
		file+='&nbsp;&nbsp;&nbsp;&nbsp;[';
		for(var column = 0, ll = map.shadow[row].length-1; column < ll; column++)
			file+=map.shadow[row][column]+', ';
		file+=map.shadow[row][column++];
		file+='],<br />';
	}
	file += ']<br />';

	var modal=new hud.Modal(file);
	modal.appendTo();
}

function editorInit () {
	document.body.classList.add('editor')
	
	var tools=document.createElement('div');
	tools.id='tools';
	tools.innerHTML='<button type="button" id="addEntityButton" onClick="tool=\'addEntity\'; this.classList.add(\'active\'); document.getElementById(\'addMapButton\').classList.remove(\'active\')"'+((tool=='addEntity')?' class="active"':'')+'><img src="style/entity-64.png" title="addEntity" /></button><button type="button" id="addMapButton" onClick="tool=\'addMap\'; this.classList.add(\'active\'); document.getElementById(\'addEntityButton\').classList.remove(\'active\')"'+((tool=='addMap')?' class="active"':'')+'><img src="style/map-64.png" title="addMapTile" /></button><button type="button" onClick="toggleSnap(this)"'+((snap)?' class="active"':'')+'><img src="style/snap-64.png" title="snap2grid" /></button><button type="button" onClick="saveMap()"><img src="style/save-64.png" title="Save" /></button>';
	document.body.appendChild(tools);
	
	
	tilesLibInit(new Array(
		new ARK.TileSet('tiles/med/med.png', 257, 200, 0, 82, 64)
	));

	ARK.front.canvas.addEventListener('click', function(e){
		var pos=getMousePos(e);
		pos.x+=ARK.viewPort.x;
		pos.y+=ARK.viewPort.y;
		if(snap)
			pos=snap2grid(pos, ARK.backg.map.tile.set.projWidth, ARK.backg.map.tile.set.projHeight);

		if(tool=='addEntity')
			ARK.entities.add( new ARK.entities.Character('bloc', new ARK.Tile( new ARK.TileSet('tiles/med/med.png', 120, 120, 0, 32, 32), n), pos.x, pos.y, new ARK.behaviors.Behavior()) );
		else if(tool=='addMap') {
			var map=ARK.backg.map,
			row=pos.y/map.tile.set.projHeight>>0,
			column=pos.x/map.tile.set.projWidth>>0;
			if(row>=map.terrain.length)
				for(i=row-map.terrain.length+1; i--;) {
					map.terrain.push([]);
					map.weight.push([]);
				}
			map.terrain[row][column]=n;
			map.weight[row][column]=0;
			ARK.backg.draw();
		}
		console.log(pos.x, pos.y);

	}, false);
}