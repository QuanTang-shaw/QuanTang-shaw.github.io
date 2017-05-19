
function Observer (data) {
	this.data=data;
	this.walk(data);
}

Observer.prototype.walk= function(obj){
	let val;
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
				val=obj[key];
				if (typeof val=='object') {
					new Observer(val);
				}
				this.convert(key,val);
			}
		}
};
Observer.prototype.convert=function (attr,val) {
	Object.defineProperty(this.data, attr, {
		configurable:true,
		enumerable:true,
		get:function () {
			console.log(`你访问了属性${attr}`);
			console.log(val);
			return val;
		},
		set:function (newVal) {
			console.log(`你设置了属性${attr}`);
			console.log(`新的属性${attr}=${newVal}`);
			if(newVal===val)return;
			val=newVal;
		}

	})	
}

let app1=new Observer(
	{
		name:'jokey',
		age:23
	}	
)

