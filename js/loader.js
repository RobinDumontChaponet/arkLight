var imgExtensions = ['jpg', 'jpeg', 'png', 'apng', 'gif', 'bmp', 'psd'],
	audioExtensions=['ogg', 'mp3', 'm4a'],
	videoExtensions=['mov', 'mp4', 'mpeg4', 'ogg']; 

function getFileExt (src) {
	return src.substring(src.lastIndexOf(".")+1, src.length)
}

Loader = function (box, reportBox, array) {
	this.box=box;
	this.reportBox=reportBox;
	this.report=(reportBox)?1:0;
	this.array=(array)?array:[];
	this.got=[];
	this.error=[];
	this.maxConnections=6;
	this.running=0;
	this.arrayLength=this.array.length;
	this.length=0;
	this.downloadedLength=0;
	this.percent=(this.length)?(this.downloadedLength/this.length)*100:0;
	
	this.box.style.opacity=1;
	this.counter=new hud.TextCounter();
	this.counter.insertBefore(this.box.childNodes[0]);
	if(this.percent) this.counter.changeTo(this.percent);
	
};
Loader.prototype.run=function () {
	if(this.running<this.maxConnections && this.array.length) {
		//this.running=1;
		//for(var t=this, i=0, l=((t.array.length>t.maxConnections)?t.maxConnections:t.array.length)-t.running; i<l; i++) {
			this.get(this.array.pop(), this.report);
			this.run();
		//}
	}
}
Loader.prototype.need = function (array) {
	for(var t=this, i=0, l=array.length; i<l; i++) {
		t.array.push(array[i]);
		t.arrayLength++;
	}
	this.run();
}
Loader.prototype.get  = function (src, report) {
	if(this.got.lastIndexOf(src)==-1) {
		this.running++;
		var el, ext=getFileExt(src), t=this, size;
		function loaded () {
			t.running--;
			t.run();
			delete el;
			if(report)
				t.reportBox.innerHTML+='"'+src+'" has been preloaded<br />';
			console.log('"'+src+'" has been preloaded');
			t.got.push(src);
		}
		function error () {
			t.running--;
			t.run();
			delete el;
			if(report)
				t.reportBox.innerHTML+='<span style="color:#FC6C71">"'+src+'" could not be preloaded</span><br />';
			console.log('"'+src+'" could not be preloaded !');
			t.error.push(src);
		}
		function aProgress (e) {
			if (e.lengthComputable) {
				console.log('progress computable.');
				t.length=e.total;
				t.downloadedLength=e.loaded;
				t.percent=(t.length)?(t.downloadedLength/t.length)*100:0;
				t.counter.changeTo(t.percent);
			} else {
				t.length=size;
				t.downloadedLength=e.loaded;
				t.percent=(t.length)?t.downloadedLength/t.length*100|0:0;
				t.counter.changeTo(t.percent);
			}
			if(t.percent>=100) {
				t.box.innerHTML='<img src="assets/loader2.gif" alt="Loading..." />';
				t.box.getElementsByTagName('img')[0].style.opacity=.5;
			}
		}
		function aCanceled(evt) {
			t.reportBox.innerHTML+='<span style="color:#FC6C71">Canceled</span><br />';
			console.log('xhr canceled !');
		}

		function get () {
			el.src=src;
		}

		if (src.indexOf('index.php?load=')) {
			var xhr = getXMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 3) {
					var header=xhr.responseText.match(/size:(\d*);/i);
					if(header && !size) {
						size=header[1];
					}
				}
				if(xhr.readyState == 4) {
					var content=xhr.responseText.match(/\[.*\]data:.*;base64,((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?);/i);
					if(content)
						console.log('state4: ', '.');
				}
			}

			xhr.addEventListener("progress", aProgress, false);
			xhr.addEventListener("load", loaded, false);
			xhr.addEventListener("error", error, false);
			xhr.addEventListener("abort", aCanceled, false);

			xhr.open("GET", src, true);
			xhr.send(null);
		} else if (imgExtensions.lastIndexOf(ext)!=-1) {
			el=new Image();
			el.onload = loaded;
			el.onerror = error;
			get();
		} else if (audioExtensions.lastIndexOf(ext)!=-1) {
			el=new Audio();
			el.addEventListener('canplaythrough', loaded);
			get();
		} else if (videoExtensions.lastIndexOf(ext)!=-1) {
			el=new Video();
			el.addEventListener('canplaythrough', loaded);
			get();
		}
	}
};