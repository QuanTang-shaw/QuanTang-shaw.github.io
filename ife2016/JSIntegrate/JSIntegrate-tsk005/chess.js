		var LittleBox=function (id,config) {
			this.wrap=document.querySelector(id);
			this.init(config);
		}
		LittleBox.prototype={
			init:function (config) {
				this.createChessBoard(config);
				this.Width=document.getElementsByClassName("pieceBox")[2].offsetWidth-1;
				this.Height=document.getElementsByClassName('pieceBox')[2].offsetHeight-1;
				this.setChessBoard(config.x,config.y);
				this.createPiece(config);
				this.piece.status=0;
				this.rows=config.x;
				this.cols=config.y;
				this._self=this;
			},
			createChessBoard:function (config) {
				var oFragment=document.createDocumentFragment(),
					piece,
					x=config.x,
					y=config.y;
				for(var j = 0; j < config.x; j++){
					for(var k = 0; k <config.y; k++){
						oFragment.appendChild(
							this.createBox(
								{x:x,
								 y:y,
								 j:j,
								 k:k
								}));						
					}
				}
				this.wrap.appendChild(oFragment);
			},
			createBox:function (obj) {
				pieceBox=document.createElement('div');
				pieceBox.className='pieceBox';
				if (obj.k==0&&obj.j>0) {
					pieceBox.style.clear='both';
				}
				if (obj.k==obj.y-1) {
					pieceBox.className+=' right-border';
				}
				if (obj.j==obj.x-1) {
					pieceBox.className+=' bottom-border';
				}
				return pieceBox;
			},
			createPiece:function (config) {
				var leftPos=Math.floor(Math.random()*config.y+0),
					topPos=Math.floor(Math.random()*config.x+0);
				var piece=document.createElement('div');
					piece.className='piece';
					piece.style.left=leftPos*(this.Width+1)+2+'px';
					piece.style.top=topPos*(this.Height+1)+2+'px';
					// piece.style.position="absolute";
				this.wrap.appendChild(piece);
				this.piece=piece;
				this.piece.rotate=0;
				this.leftPos=leftPos;
				this.topPos=topPos;
			},
			setChessBoard:function (x,y) {
				this.wrap.style.width=this.Width*y+(y-1)+'px';
				this.wrap.style.height=this.Height*x+x-1+'px';
			},
			move:function (dir) {
				var dir=dir||this.piece.status;
				if(dir==0){
					this.topPos>0&&this.topPos--;
				}
				if(dir==1){
					this.leftPos>0&&this.leftPos--;
				}
				if(dir==2){
					this.leftPos<this.cols-1&&this.leftPos++;
				}
				if(dir==3){
					this.topPos<this.rows-1&&this.topPos++;
				}
				this.piece.style.left=this.leftPos*(this.Width+1)+2+'px';
				this.piece.style.top=this.topPos*(this.Height+1)+2+'px';				
			},
			turn:function (dir) {
				switch(dir) {
					case 1:
						this.piece.rotate-=90;
						this.piece.status=1;	
						break;
					case 2:
						this.piece.rotate+=90;
						this.piece.status=2;
						break;
					case 3:
						this.piece.rotate+=180;
						this.piece.status=3;
						break;
					case 4:
						this.piece.rotate=270;
						break;
					case 5:
						this.piece.rotate=0;
						break;
					case 6:
						this.piece.rotate=90;
						break;
					case 7:
						this.piece.rotate=180;
						break;
				}
				if (this.piece.rotate >= 360) {
	                this.piece.rotate -= 360;
	             }
                if (this.piece.rotate <= - 360) {
                    this.piece.rotate += 360;
                }
				// this.piece&&
				this.piece.style.transform='rotate('+this.piece.rotate+'deg)';
			},
			instruction:{
				'GO':function (_this) {
					_this.move();
				},
				'TUN LEF':function (_this) {
					_this.turn(1);
				},
				'TUN RIG':function (_this) {
					_this.turn(2);
				},
				'TUN BAC':function (_this) {
					_this.turn(3);
				},
				//向屏幕的左侧移动一格，方向不变
				'TRA LEF':function (_this) {
					_this.move(1);
				},
				//向屏幕的上面移动一格，方向不变
				'TRA TOP':function (_this) {
					_this.move(0);
				},
				//向屏幕的右侧移动一格，方向不变
				'TRA RIG':function (_this) {
					_this.move(2);
				},
				//向屏幕的下面移动一格，方向不变
				'TRA BOT':function (_this) {
					_this.move(3);
				},
				//方向转向屏幕左侧，并向屏幕的左侧移动一格
				'MOV LEF':function (_this) {
					_this.turn(4);
					_this.move(1);
				},
				//方向转向屏幕上面，向屏幕的上面移动一格
				'MOV TOP':function (_this) {
					_this.turn(5);
					_this.move(0);
				},
				//方向转向屏幕右侧，向屏幕的右侧移动一格
				'MOV RIG':function (_this) {
					_this.turn(6);
					_this.move(2);
				},
				//方向转向屏幕下面，向屏幕的下面移动一格
				'MOV BOT':function (_this) {
					_this.turn(7);
					_this.move(3);
				}
			}
		}

	var chessControl=new LittleBox ("#box",{x:10,y:10});
	var text=document.querySelector('#text');
	var btn=document.querySelector('#btn');

	btn.addEventListener('click', function () {
	var	txt=text.value.trim().toUpperCase();
		chessControl.instruction[txt]&&chessControl.instruction[txt](chessControl._self);
	} );