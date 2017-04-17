function Pubsub() {
	this.handlers={};
}

Pubsub.prototype = {
	on:function  (eventType,handler) {
		let self=this;
		if(this.handlers[eventType]) {
			self.handlers[eventType].push(handler);
		}
		else {
			self.handlers[eventType]=[handler];
		}
	},
	of:function (eventType) {
		for (let ley in this.handlers) {
			if (this.handlers.hasOwnProperty(ley)&&key==eventType) {
				delete this.handlers[key];
			}
		}
	},
	emit:function (attr,...arg) {
		this.handlers[attr]&&this.handlers[attr].forEach(function (item) {
			item(...arg);
		});
	}
}

function Observer (data) {
	this.data=data;
	this.event=new Pubsub();
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
	let self=this;
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
			self.event.emit(attr,val,newVal);
			if(newVal===val)return;
			val=newVal;
		}

	})	
};
Observer.prototype.$watch = function(attr,handler){
	this.event.on(attr,handler);
};

let app = new Observer({
    name: 'liujianhuan',
    age: 25,
    company: 'Qihoo 360',
    address: 'Chaoyang, Beijing'
})

app.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
})

app.$watch('age', function(oldVal, newVal){
    console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
})

