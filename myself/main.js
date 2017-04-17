$(function (){
	$('#wrap').fullpage({
		sectionsColor: ['#CCCCCC', '#45C478', '#CCCC99', '#91B493'],
		anchors: ['page1', 'page2', 'page3', 'page4'],
		menu:"#menu",
		navigationPosition:'right',
		afterRender:function(){
			$(".section1 h3").animate({
				// left:'40px',
				top:'0px',
				opacity:1,
				// transform:`rotateY(180deg)`,
				// color:'#00FFFF',
				fontSize:'150px'
			},
			1500,
			()=>$(".section1 h3")[0].style.transform=`rotateY(360deg)`
			);
		},
		afterLoad:function(anchorLink,index){
			if(index==2){
				$(".section2 h3").animate({opacity:1},1000);
				$(".skills").animate({marginLeft:'40%'},1000);
				$(".personal_details").animate({marginLeft:'13%'},1000);
			}
		},
		onLeave:function(index,nextIndex,direction){
			if(index==2){
				$(".section2 h3").animate({opacity:0},1000);
				$(".skills").animate({marginLeft:'140%'},1000);
				$(".personal_details").animate({marginLeft:'-33%'},1000);
			}
		}
	});

});
