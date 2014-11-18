ARK.controls = {
	left: 0,
	right: 0,
	up: 0,
	down: 0,
	space: 0,
	shift: 0
};
ARK.controls.keyed = function (event)
{
	var e = event || window.event;
	var key = e.which || e.keyCode;
	switch(key) {
		case 37: case 81: // [left]
			ARK.controls.left=1;				
			break;
		case 39: case 68: // [right]
			ARK.controls.right=1;
			break;
		case 38: case 90: // [up]
			ARK.controls.up=1;				
			break;
		case 40: case 83: // [down]
			ARK.controls.down=1;
			break;
		case 32: // [space]
			ARK.controls.space=1;
			break;
		case 16: // [shift]
			ARK.controls.shift=1;
			break;
		default :
			return true;
	}
	return false;
}
ARK.controls.dekeyed = function(event)
{
	var e = event || window.event;
	var key = e.which || e.keyCode;
	switch(key) {
		case 37: case 81: // [left]
			ARK.controls.left=0;
			break;
		case 39: case 68: // [right]
			ARK.controls.right=0;
			break;
		case 38: case 90: // [up]
			ARK.controls.up=0;				
			break;
		case 40: case 83: // [down]
			ARK.controls.down=0;
			break;
		case 32: // [space]
			ARK.controls.space=0;
			break;
		case 16: // [shift]
			ARK.controls.shift=0;
			break;
		default :
			return true;
	}
	return false;
}