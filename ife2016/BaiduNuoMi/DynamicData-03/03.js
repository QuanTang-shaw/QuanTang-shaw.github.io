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


let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
