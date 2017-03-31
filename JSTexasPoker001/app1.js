
var poker1=[
		[{color:'spade',value:'1'},
		{color:'spade',value:'2'},
		{color:'spade',value:'3'},
		{color:'spade',value:'4'},
		{color:'spade',value:'5'},
		{color:'spade',value:'6'},
		{color:'spade',value:'7'},
		{color:'spade',value:'8'},
		{color:'spade',value:'9'},
		{color:'spade',value:'10'},
		{color:'spade',value:'11'},
		{color:'spade',value:'12'},
		{color:'spade',value:'13'},],
		[
		{color:'heart',value:'1'},
		{color:'heart',value:'2'},
		{color:'heart',value:'3'},
		{color:'heart',value:'4'},
		{color:'heart',value:'5'},
		{color:'heart',value:'6'},
		{color:'heart',value:'7'},
		{color:'heart',value:'8'},
		{color:'heart',value:'9'},
		{color:'heart',value:'10'},
		{color:'heart',value:'11'},
		{color:'heart',value:'12'},
		{color:'heart',value:'13'},],
		[
		{color:'club',value:'1'},
		{color:'club',value:'2'},
		{color:'club',value:'3'},
		{color:'club',value:'4'},
		{color:'club',value:'5'},
		{color:'club',value:'6'},
		{color:'club',value:'7'},
		{color:'club',value:'8'},
		{color:'club',value:'9'},
		{color:'club',value:'10'},
		{color:'club',value:'11'},
		{color:'club',value:'12'},
		{color:'club',value:'13'},],
		[
		{color:'diamond',value:'1'},
		{color:'diamond',value:'2'},
		{color:'diamond',value:'3'},
		{color:'diamond',value:'4'},
		{color:'diamond',value:'5'},
		{color:'diamond',value:'6'},
		{color:'diamond',value:'7'},
		{color:'diamond',value:'8'},
		{color:'diamond',value:'9'},
		{color:'diamond',value:'10'},
		{color:'diamond',value:'11'},
		{color:'diamond',value:'12'},
		{color:'diamond',value:'13'},],
		]

	var	pPlayer1_Card=[],
		pPlayer2_Card=[],
		Player1=new Object;
		Player1.cardNum={},
		Player1.cardColor={},
		Player1.cardType={},
		Player1.card=[];

	//发牌，产生0-51的随机数
	var randomCard=function() {
		var pCard=[],
			pCommonCard=[],
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
		console.log(pPlayer1_Card);
		// console.log(pPlayer2_Card);
		toPoker(pPlayer1_Card,poker);
	}
	//转换成牌面，存储在二唯数组
	function toPoker(arr,poker) {
		var i=0,value,color;	
		Player1.card=[];	
		arr.forEach(function (ele,index) {
			poker[index]=[];
			color=Math.floor(ele/13);
			poker[index].push(color); 
			value=ele%13;
			poker[index].push(value);
		});
		// console.log(poker);
		for(var j = 0, length2 = poker.length; j < length2; j++){
			Player1.card.push(poker1[poker[j][0]][poker[j][1]]); 
		}
		console.log(Player1);
		// isSameColor (Player1);
		// kindCard(Player1);
		// isStraight(Player1.card,Player1);
		detection ();
	}

	function detection () {
		var single=0;
		Player1.cardType=null;
		isSameColor(Player1);
		testStraight(Player1.card,Player1);
		countRepeat(Player1.card,Player1)
		// console.log(Player1.cardNum);
		// console.log(Player1.cardNum);
		if(Player1.isflush){isStraightFlush();return;}

		for (e  in  Player1.cardNum) {
			if(Player1.cardNum[e].length==4){
				isFour();
				break;
				
			}
		}
		for (e in  Player1.cardNum) {
			if(Player1.cardNum[e].length==3){
				isThree();
				break;
			}
		}
		for (e in  Player1.cardNum) {
			if(Player1.cardNum[e].length==2){
				isTwo();
				break;
			}
		}

		for (e in  Player1.cardNum) {
			if(Player1.cardNum[e].length==1){
				single++;
				if (single>6) {
					Player1.cardType="high card";
					console.log("high card");
				}
				
			}
		}
					
			
			// if(Player1.cardNum[e].length==2){isTwo();break;}

			/*if(Player1.isStraight){
				Player1.cardType="straight flush";
				console.log("straight flush");
			}
			else{ 
			Player1.cardType="high card";
			console.log("high card"); 
			}*/
	}
	

	function isSameColor (Player1) {
		Player1.isflush=false;
		Player1.cardColor.spadeCard=Player1.card.filter(function(elem,index) {
			return elem.color=='spade';
		});
		Player1.cardColor.heartCard=Player1.card.filter(function(elem,index) {
			return elem.color=='heart';
		});
		Player1.cardColor.clubCard=Player1.card.filter(function(elem,index) {
			return elem.color=='club';
		});
		Player1.cardColor.diamondCard=Player1.card.filter(function(elem,index) {
			return elem.color=='diamond';
		});
		if (Player1.cardColor.spadeCard.length>4) {Player1.flushColor="spade";Player1.isflush=true;}
		if (Player1.cardColor.heartCard.length>4) {Player1.flushColor="heart";Player1.isflush=true;}
		if (Player1.cardColor.clubCard.length>4) {Player1.flushColor="club";Player1.isflush=true;}
		if (Player1.cardColor.diamondCard.length>4) {Player1.flushColor="diamond";Player1.isflush=true;}
		// console.log(Player1);
	}

/*	function kindCard(Player1) {
		cardSort(Player1.card,1);
		countRepeat(Player1.card,Player1);
	}*/

	function countRepeat(arr,Player1) {
		cardSort(Player1.card,1);
		Player1.cardNum.ace=arr.filter(function (ele) {return ele.value=='1';});
		Player1.cardNum.two=arr.filter(function (ele) {return ele.value=='2';});
		Player1.cardNum.three=arr.filter(function (ele) {return ele.value=='3';});
		Player1.cardNum.four=arr.filter(function (ele) {return ele.value=='4';});
		Player1.cardNum.five=arr.filter(function (ele) {return ele.value=='5';});
		Player1.cardNum.six=arr.filter(function (ele) {return ele.value=='6';});
		Player1.cardNum.seven=arr.filter(function (ele) {return ele.value=='7';});
		Player1.cardNum.eight=arr.filter(function (ele) {return ele.value=='8';});
		Player1.cardNum.nine=arr.filter(function (ele) {return ele.value=='9';});
		Player1.cardNum.ten=arr.filter(function (ele) {return ele.value=='10';});
		Player1.cardNum.joker=arr.filter(function (ele) {return ele.value=='11';});
		Player1.cardNum.queen=arr.filter(function (ele) {return ele.value=='12';});
		Player1.cardNum.king=arr.filter(function (ele) {return ele.value=='13';});
	}
	
	function testStraight(arr,Player1) {
		Player1.isStraight=false;
		cardSort(arr,1);
		var isContinuation=arr.every(function (ele,index,arr){
				console.log(index);
				if(index>=5) return true;
				return parseInt(ele.value)==index+parseInt(arr[0].value);
			});
		Player1.isStraight=isContinuation;
		v=arr.map(function(ele,index) {
			return ele.value;
		})
		console.log(v);
		return isContinuation;	
	}

	function isStraightFlush () {

		if(Player1.isStraight){
			Player1.cardType="straight flush";
			console.log("straight flush");
		}
		else{
			Player1.cardType="flush";
			console.log("flush");
		}
	}

	function isFour () {
		Player1.cardType="four of a kind";
		console.log("four of a kind");
	}

	function isThree() {
		// Player1.cardNum.cardType!=null?return:;
		var three=0;
		for (i in Player1.cardNum) {
			if (Player1.isStraight) {
				Player1.cardType="straight";
				console.log("straight");
			}
			else if(Player1.cardNum[i].length==2||Player1.cardNum[i].length==3){
				Player1.cardNum[i].length==3&&three++;
				if(Player1.cardNum[i].length==2||three==2){
					Player1.cardType="full house";
					console.log("full house");
				}
			}
			else{
				Player1.cardType="three of a kind";
				console.log("three of a kind");
			}
					
		}
	}


	function isTwo () {
		var pairs=0,k=0;
		for (j in Player1.cardNum) {
			k++;
			if (Player1.isStraight) {
				Player1.cardType="straight";
				console.log("straight");
			}
			else if(Player1.cardNum[j].length==2){
				pairs++;
				console.log(pairs);
				if(pairs==1){
					Player1.cardType="one pair";
					console.log("one pair");
				}
				if(pairs>=2){
					Player1.cardType="two pair";
					console.log("two pair");
				}
			}
		}
	}




	function cardSort(arr,type) {
		type==0&&arr.sort(function (a,b) {return a-b;});
		type==1&&arr.sort(function (a,b) {return a.value-b.value;});
		type==2&&arr.sort(function (a,b) {return a[1]-b[1];});
		type==3&&arr.sort(function (a,b) {return a[0]-b[0];});
	}


