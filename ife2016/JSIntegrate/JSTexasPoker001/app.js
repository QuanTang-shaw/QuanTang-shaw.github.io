		//发牌，产生0-51的随机数
		var randomCard=function() {
			var pCard=[],
				pCommonCard=[],
				// pPlayerCard1=[],
				// pPlayerCard2=[],
				num,
				poker=[],
				isRepeat;
			for(var j = 0; j < 7; j++){
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
			// toPoker(pPlayer1_Card,poker);
		};



		var TexasPoker=function(card) {
			// this.ResourceNum=card;
			this.in();
		}
		TexasPoker.prototype={
			this.init:function (){
				this.pokerCards=[];
				this.toPoker(this.ResourceNum,this.pokerCards);
				this.spliceColor=this.pokerCards.map(function(ele) {
					return ele[0];
				});
				this.spliceNum=this.pokerCards.map(function(ele) {
					return ele[1];
				});	
			},
			this.toPoker:function (arr,poker) {
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
			this.spliceCard:function (e) {
				var result;
				e==0&&(result=this.pokerCards.filter(function (ele) {
					ele[0]==0;
				}));
				e==1&&(result=this.pokerCards.filter(function (ele) {
					ele[0]==1;
				}));
				e==2&&(result=this.pokerCards.filter(function (ele) {
					ele[0]==2;
				}));
				e==3&&(result=this.pokerCards.filter(function (ele) {
					ele[0]==3;
				}));
				return result;	
			},
			this.cardSort:function (arr,type) {
				type==0&&arr.sort(function (a,b) {return a-b;});
				type==1&&arr.sort(function (a,b) {return a[1]-b[1];});
				type==2&&arr.sort(function (a,b) {return a[0]-b[0];});
			},
			this.detectType:function () {
				// this.cardSort(this.pokerCards);	
				this.cardSort(0,this.spliceColor);
				var spadeNum=this.countRepeat(this.spliceColor,0),	
					heartNum=this.countRepeat(this.spliceColor,1),	
					clubNum=this.countRepeat(this.spliceColor,2),	
					diamondNum=this.countRepeat(this.spliceColor,3);	
				//检测是否有相同花色大于4个
				if(spadeNum>4||heartNum>4||clubNum>4||diamondNum>4){
					var flushCards=[];
					spadeNum>4&&(flushCards=this.spliceCard(0));
					heartNum>4&&(flushCards=this.spliceCard(1));
					clubNum>4&&(flushCards=this.spliceCard(2));
					diamonNum>4(&&flushCards=this.spliceCard(3));

					    //如果是顺子，说明是同花顺
					  if(this.isStraightFlush(flushCards))
					  {

					  	flushCards[0][1]==10?this.pokerCards.cardType="royal flush ":
					  	 this.pokerCards.cardType="straight flush";

					  }
					  else{
					  	// 是同花
					  	 this.pokerCards.cardType='Flush';
					  }

				}
				else{
					var aCardRe=this.countRepeat(1,this.spliceNum);
					this.cardSort(aCardRe,0);
					var isFour=aCardRe.includes(4),
						isFullHouse=aCardRe.includes(3),
						isTwo=aCardRe.includes(2),

					isFour&&this.pokerCards.cardType="four of a kind";  

					if (isFullHouse) {
						if (isTwo) {
							this.pokerCards.cardType="full house";
						}
						else{
							this.pokerCards.cardType="three of a kind";
						}
					}
					else if(){

					}
					else{

					}








				}
			},
			this.isStraightFlush:function (arr) {
				this.cardSort(arr,1);
				var isContinuation=arr.every(function (ele,index,arr){
						return ele[1]==index+arr[0][1];
					});
				console.log(isContinuation);
				return isContinuation;	
			},
			//统计数组中重复元素个数，方法一统计单个，方法二统计数组
			this.countRepeat:function (type,arr,ele) {
				if (type==1) {
					var Index=arr.indexOf(ele);
						lastIndex=arr.lastIndexOf(ele);
						len=lastIndex-Index;
					return len;	
				}
				else if(type==2){
					var countNum=[],
						i=0,
						Index=0,
						newIndex=0,
						ele=arr[Index];
				    do{
						newIndex=arr.lastIndexOf(ele);
						newIndex!=-1&&(len=(newIndex-Index)+1);
						countNum.push(len);
						Index=newIndex+1;
						ele=arr[Index];
					}while(Index<arr.length);
					return countNum;
				}					
			}
		}

		