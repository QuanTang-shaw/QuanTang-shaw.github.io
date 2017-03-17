
var $=function (id) {
	return  typeof id==='string'?document.querySelector(id):id;    
}

var addHandler=function (ele,event,fn) {
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

// alert(document.documentElement.clientWidth);
var autoCenter=function () {
	var browserWidth=document.documentElement.clientWidth,
		browserHeight=document.documentElement.clientHeight,
		oLoginBox=$("#login-box");
		oLoginBox.style.left=browserWidth/2-oLoginBox.offsetWidth/2+'px';
		oLoginBox.style.top=browserHeight/2-oLoginBox.offsetHeight/2+'px';
}

autoCenter();

addHandler(window,'click',function () {
	if (condition) {
		// statement
	}
})