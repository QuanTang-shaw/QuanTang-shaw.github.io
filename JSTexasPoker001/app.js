

var poker1=[
		{color:'black',value:'A'},
		{color:'black',value:'2'},
		{color:'black',value:'3'},
		{color:'black',value:'4'},
		{color:'black',value:'5'},
		{color:'black',value:'6'},
		{color:'black',value:'7'},
		{color:'black',value:'8'},
		{color:'black',value:'9'},
		{color:'black',value:'10'},
		{color:'black',value:'J'},
		{color:'black',value:'Q'},
		{color:'black',value:'K'},
];

for (let e of poker1) {
	console.log(e);
}

/*for(var j = 0; j < 51; j++){
	//取模，判断数字
	// var num=j%13;
	// 相除，判断花色
	var num=j/13;
	console.log(Math.floor(num));
	// console.log(num);
}
*/
	//发牌，产生0-51的随机数
	function randomCard (argument) {
		var pCard=[],num;
		for(var j = 0; j < 5; j++){
			do{
				num=Math.floor(Math.random()*10);
			}while(pCard.every(function (v) {return v==num;}));
			pCard.push(num);  
		}
		console.log(pCard);
		// toPoker(pCard);
	}

	function isRepeat (num,arr) {
		for (var k in arr) {
			if (arr[k]==num) {return true;}
		}
	}

/*	function toPoker (arr) {
		var poker={};
		console.log(typeof poker);
		var mold,rem,value,color,v;

		for(var i=0;i<arr.length;i++){
			mold=arr[i]%13;
			rem=arr[i]/13;
			// Object.defineProperties(poker, {'v'+i: value});
			poker['v'+i]=null;
			poker['v'+i].value=mold;
			poker['v'+i].color= Math.floor(rem);
		}
		console.log(poker);
	}*/

	randomCard();

var arr=[2,3,4,5,6,2];
isContinuationInteger(arr);

//检测连续,是否为顺子
function isContinuationInteger(array){
    var i=1;
    var isContinuation=true;
    for(var e in array){
        i++;
        if(array[e]!=i){
            isContinuation=false;
            break;
        }
    }
    console.log(isContinuation);
    return isContinuation;
}

