

	var poker1=[
			[{color:'spade',value:'A'},
			{color:'spade',value:'2'},
			{color:'spade',value:'3'},
			{color:'spade',value:'4'},
			{color:'spade',value:'5'},
			{color:'spade',value:'6'},
			{color:'spade',value:'7'},
			{color:'spade',value:'8'},
			{color:'spade',value:'9'},
			{color:'spade',value:'10'},
			{color:'spade',value:'J'},
			{color:'spade',value:'Q'},
			{color:'spade',value:'K'},],
			[
			{color:'spade',value:'A'},
			{color:'spade',value:'2'},
			{color:'spade',value:'3'},
			{color:'spade',value:'4'},
			{color:'spade',value:'5'},
			{color:'spade',value:'6'},
			{color:'spade',value:'7'},
			{color:'spade',value:'8'},
			{color:'spade',value:'9'},
			{color:'spade',value:'10'},
			{color:'spade',value:'J'},
			{color:'spade',value:'Q'},
			{color:'spade',value:'K'},]
			]

	//发牌，产生0-51的随机数
	function randomCard (argument) {
		var pCard=[],
			pCommonCard=[],
			pPlayerCard1=[],
			pPlayerCard2=[],
			num,
			poker=[],
			isRepeat;
		for(var j = 0; j < 9; j++){
			do{
				num=Math.floor(Math.random()*51);
				isRepeat=pCard.some(function (e) {
					return e==num;
				});
			}while(isRepeat);

			pCard.push(num);  
		}
		pCommonCard=pCard.slice(0,5);
		Card1=pCard.slice(5, 7);
		Card2=pCard.slice(-2);
		pPlayer1_Card=pCommonCard.concat(Card1);
		pPlayer2_Card=pCommonCard.concat(Card2);
		// console.log(pCard);
		// console.log(pCommonCard);
		// console.log(pPlayerCard1);
		// console.log(pPlayerCard2);
		toPoker(pPlayer1_Card,poker);
	}



	var TexasPoker=function (card) {
		this.playerCards=card;
	}

	TexasPoker.prototype={

		this.inition:function () {
			
		},
		this.toPoker:function () {
			var i=0,value,color;
			arr.forEach(function (ele,index) {
			poker[index]=[];
			color=Math.floor(ele/13);
			poker[index].push(color); 
			value=ele%13;
			poker[index].push(value);
			// i++;
			});
			console.log(poker.toString());
		},
		this.isContinuous:function () {
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
		},




	}


	//检测连续,是否为顺子
	function isContinuous(array){
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


	function toPoker (arr,poker) {
		var i=0,value,color;
		arr.forEach(function (ele,index) {
		poker[index]=[];
		color=Math.floor(ele/13);
		poker[index].push(color); 
		value=ele%13;
		poker[index].push(value);
		// i++;
		});
		console.log(poker.toString());
	}






randomCard ();


arr=[3,5,7,4,3,65,546,76,4,5,6,6,6];


function chenck (arr) {
	var repeatTimes,i=0;
	arr.sort(function (a,b) {
		return a-b;
	});

	var ele=arr[0],
		index=0,
		sameColorNum=[];


    do{
		ele&&index=arr.lastIndex(ele);
		index!=-1&&sameColorNum.push(index);
		index++;
		ele=arr[index];
		}while(index<arr.length);	
}