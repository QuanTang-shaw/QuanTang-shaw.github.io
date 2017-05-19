
var GiantCanvas=function(){
  this.box=document.querySelector('.wrap');
  this.hugeCanvas=document.querySelector('.hugeCanvas');
  this.context=this.hugeCanvas.getContext('2d');
  this.thumbnails=document.querySelector('.Thumbnails');
  this.thumbnailBox=document.querySelector('.box');
  this.smallCanvas=document.querySelector('.smallCanvas');
  this.smallContext=this.smallCanvas.getContext('2d');
  this.hugeCanvasMoved=false;
  this.thumbnailMoved=false;
  this.init();
}

GiantCanvas.prototype={
  /*绑定事件*/
  init:function ()  {
    this.position();
    this.draw();
    this.box.addEventListener('mousedown', (ev)=>this.drag(ev), false);
    this.hugeCanvas.addEventListener('dblclick', ev=>this.canvasEdit(ev), false);
    this.smallCanvas.addEventListener('mousedown', (ev)=>this.thumBoxMove(ev), false);
    this.thumbnailBox.addEventListener('mousedown', (ev)=>this.thumBoxMove(ev), false);
  },
  /*初始化定位*/
  position:function () {
    let left=-(this.hugeCanvas.offsetWidth-this.box.offsetWidth)/2;
    let top=-(this.hugeCanvas.offsetHeight-this.box.offsetHeight)/2;
    this.hugeCanvas.style.left=`${left}px`;
    this.hugeCanvas.style.top=`${top}px`;

    let boxLeft=(this.thumbnails.offsetWidth-this.thumbnailBox.offsetWidth)/2;
    let boxTop=(this.thumbnails.offsetHeight-this.thumbnailBox.offsetHeight)/2;
    this.thumbnailBox.style.left=boxLeft+'px';
    this.thumbnailBox.style.top=/*this.thumbnail.offsetTop+*/boxTop+'px';
  },
  /*画图*/
  draw:function (){
    //画背景图
    let bgLinearGra=this.context.createLinearGradient(0,0,0,5500);
    bgLinearGra.addColorStop(0,'#007ACC');
    bgLinearGra.addColorStop(1,'#ADDEFF');
    this.context.fillStyle=bgLinearGra;
    this.context.fillRect(0,0,10800,6000);
    //画彩虹    
    const ct=this.context,
          roundX=5400,
          roundY=4000,
          startAngel=-0.85*Math.PI,
          endAngel=-0.15*Math.PI;
    let r=4000;
    // let color=["#FF00FF","#FFA500","#FFFF00","#00FF7F","#6A5ACD","#87CEFA","#9932CC"];
    let color=[10,30,60,100,200,240,290];
    let gradient=[];
    for (let i = 0; i <7; i++) {
      gradient[i]=ct.createRadialGradient(roundX,roundY,r,roundX,roundY,r-100);
      gradient[i].addColorStop(0,'hsl('+color[i]+','+85+'%,'+55+'%)');
      gradient[i].addColorStop(1,'hsl('+color[i]+','+50+'%,'+80+'%)');
      r-=100;
    }
    r=4000;
    for (let i = 0; i < 7; i++) {
      ct.beginPath();
      ct.arc(roundX,roundY,r,startAngel,endAngel);
      let x=roundX+r*Math.cos(endAngel);
      let y=roundY+r*Math.sin(endAngel);
      ct.lineTo(x,y);
      ct.arc(roundX,roundY,r-100,endAngel,startAngel,true);
      x=roundX+r*Math.cos(startAngel);
      y=roundY+r*Math.sin(startAngel);
      ct.lineTo(x,y);
      ct.fillStyle=gradient[i];
      ct.fill();
      r-=100;
    }
  this.smallContext.drawImage(this.hugeCanvas,0,0,270,150);
  },
  /*开始拖拽*/
  drag:function (ev) {
    let e=ev||window.event;
    this.hugeCanvasMoved=true;
    this.hugeCanvas.style.cursor = '-webkit-grabbing'

    let fn=ev=>this.hugeCanvasMove(ev);
    document.addEventListener('mousemove',fn,false);
    document.addEventListener('mouseup', 
      (ev)=>{document.removeEventListener('mousemove',fn, false);
           this.upDataPos(ev);}, false);
  },
  /*移动*/
  hugeCanvasMove:function (ev) {
    let cx=this.hugeCanvas.offsetLeft;
    let cy=this.hugeCanvas.offsetTop;
    let offsetWidth=-(this.hugeCanvas.offsetWidth-this.box.offsetWidth);
    let offsetHeight=-(this.hugeCanvas.offsetHeight-this.box.offsetHeight);
    cx=Math.min(Math.max(cx,offsetWidth),0);
    cy=Math.min(Math.max(cy,offsetHeight),0);
    this.hugeCanvas.style.left=ev.movementX+cx+'px';
    this.hugeCanvas.style.top=ev.movementY+cy+'px';
  },
  /*移动后更新位置*/
  upDataPos:function (ev) {
    if(this.hugeCanvasMoved){
      this.hugeCanvas.style.cursor = '-webkit-grab';
      this.thumbnailBox.style.left=Math.round(-this.hugeCanvas.offsetLeft/40)+'px';
      this.thumbnailBox.style.top=Math.round(-this.hugeCanvas.offsetTop/40)+'px';
      this.hugeCanvasMoved=false;
    }
    if (this.thumbnailMoved) {
      this.hugeCanvas.style.left=Math.round(-this.thumbnailBox.offsetLeft*40)+'px';
      this.hugeCanvas.style.top=Math.round(-this.thumbnailBox.offsetTop*40)+'px';
      this.thumbnailMoved=false;
    } 
  },
  /*画布编辑*/
  canvasEdit:function (ev) {
    this.context.beginPath();
    let img=document.querySelector('.img');
    console.log(img);
    this.context.drawImage(img,ev.offsetX-100,ev.offsetY-100,200,200);
    // this.context.arc(ev.offsetX,ev.offsetY,
    //   Math.random()*100+100,0,2*Math.PI,false);
    // this.context.fill();
    this.smallContext.drawImage(this.hugeCanvas,0,0,270,150);
  },
  /*缩略框移动*/
  thumBoxMove:function (ev) {
    this.thumbnailMoved=true;
    this.thumbnailBox.style.left=this.getPos(ev).x+'px';
    this.thumbnailBox.style.top=this.getPos(ev).y+'px';
    let fn=(ev)=>{this.thumbnailBox.style.left=this.getPos(ev).x+'px';
    this.thumbnailBox.style.top=this.getPos(ev).y+'px';};
    document.addEventListener('mousemove',fn, false);
    document.addEventListener('mouseup', ()=>{document.removeEventListener('mousemove',fn, false);
      this.upDataPos();}, false);    
  },
  getPos:function (ev) {
    let pX=Math.round(ev.pageX-this.thumbnails.offsetLeft-this.thumbnailBox.offsetWidth/2);
    let pY=Math.round(ev.pageY-this.thumbnails.offsetTop-this.thumbnailBox.offsetHeight/2);
    let maxLeft=this.thumbnails.offsetWidth-this.thumbnailBox.offsetWidth;
    let maxTop=this.thumbnails.offsetHeight-this.thumbnailBox.offsetHeight;
    pX=Math.min(Math.max(0,pX),maxLeft);
    pY=Math.min(Math.max(0,pY),maxTop);
    return{
      x:pX,
      y:pY
    }
  }
}

let g=new GiantCanvas();
