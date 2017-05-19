
let $=function (id) {
	return  typeof id==='string'?document.querySelector(id):id;    
}

let addHandler=function (ele,event,fn) {
	if (ele.addEventListener) {
		ele.addEventListener(event,fn,false);
	}
	else if (ele.attachEvent) {
		ele.attachEvent("on"+event,fn);
	}
	else{
		ele["on"+event]=fn;
	}
}

let removeHandler=function (ele,event,fn) {
	if (ele.removeEventListener) {
		ele.removeEventListener(event,fn,false);
	}
	else if (ele.distachEvent) {
		ele.distachEvent("on"+event,fn);
	}
	else{
		ele["on"+event]=null;
	}
}

let oLoginBox=$("#login-box"),
	oCover=$("#cover"),
	signIn=$(".head"),
	oBottomMove=$(".bottomMove"),
	oRightMove=$(".rightMove"),
	oBrMove=$(".brMove"),
	oLoginHead=$(".login-head"),
	close=$("#cancel");

var Login=function (){
	this.loginBox=$("#login-box");
	this.loginHead=$(".login-head");
}
Login.prototype={
	autoCenter:function () {
		let browserWidth=document.documentElement.clientWidth,
			browserHeight=document.documentElement.clientHeight;
		this.loginBox.style.left=(browserWidth-this.loginBox.offsetWidth)/2+'px';
		this.loginBox.style.top=(browserHeight-this.loginBox.offsetHeight)/2+'px';
	},
	show:function(argument) {
		oCover.style.display='block';
		this.loginBox.style.display='block';
	},
	hide:function(){
		oCover.style.display='none';
		this.loginBox.style.display='none';
	},
	startResize:function (ev) {
		let e=ev||event;
		let type=e.target.getAttribute('name');
		let fn=ev=>{this.Resize(ev,type);};
		let self=this;
		addHandler(document,'mousemove',fn);
		document.onmouseup=function(){
			removeHandler(document,'mousemove',fn);
		}
	},
	Resize:function (ev,type) {
		let e=ev||event,
		    oldWidth=this.loginBox.offsetWidth-3,
		    oldHeight=this.loginBox.offsetHeight-3,
		    oldPositionX=oldWidth+this.loginBox.offsetLeft,
		    oldPositionY=oldHeight+this.loginBox.offsetTop,
			newPositionX,
			newPositionY,
			newWidth,
			newHeight;
		newPositionX=e.clientX-oldPositionX,
		newPositionY=e.clientY-oldPositionY;
		newWidth=Math.max((newPositionX+oldWidth),250);
		newHeight=Math.max((newPositionY+oldHeight),200);
		switch(type) {
			case 'right':
				this.loginBox.style.width=newWidth+'px';
				break;
			case 'bottom':
				this.loginBox.style.height=newHeight+'px';
				break;
			case 'both':
				this.loginBox.style.width=newWidth+'px';
				this.loginBox.style.height=newHeight+'px';
				break;
		}
	},
	startDrag:function (ev) {
		let e=ev||event;
		let self=this;
		this.px=e.clientX-this.loginBox.offsetLeft;
		this.py=e.clientY-this.loginBox.offsetTop;
		let fn=ev=>this.Drag(ev);
		addHandler(this.loginHead,'mousemove',fn);
		document.onmouseup=function () {
			removeHandler(self.loginHead,'mousemove',fn);
		};
		
	},
	Drag:function (ev) {
		let e=ev||event;
		this.loginBox.style.left=e.clientX-this.px+'px';
		this.loginBox.style.top=e.clientY-this.py+'px';
	}
}
let login=new Login();
addHandler(window,'load',()=>login.autoCenter());
addHandler(oCover,'click',()=>login.hide());
addHandler(signIn,'click',()=>login.show());
addHandler(close,'click',()=>login.hide())
addHandler(oBottomMove,'mousedown',()=>login.startResize());
addHandler(oRightMove,'mousedown',()=>login.startResize());
addHandler(oBrMove,'mousedown',()=>login.startResize());
addHandler(oLoginHead,'mousedown',(ev)=>login.startDrag(ev));


