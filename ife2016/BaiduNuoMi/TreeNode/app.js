

let TreeNode=function (obj) {
	this.NodeBody=obj.nodebody;
	this.childNodes=obj.childNodes||[];
	this.data =obj.data ||'';
}

TreeNode.prototype={
	bindEvent:function () {
		/* body... */
	}
	render:function () {
			
	},
	addChild:function (text) {
		if(text.trim()==""){
			alert("内容不能为空！");
			return this;
		}
		let newNode=`<div class="nodebody">
			<label class="nodeHead">
				<span class="nodeArrow"></span>
				<img src="Folder.png" class="nodeIcon folder">
				<span class="nodeTitle">${text}</span></label>
		</div>`;
		this.NodeBody.appendChild(newNode);
	},
	deleteChild:function (argument) {
		/* body... */
	},
	toggleFold:function (argument) {
	 	/* body... */
	 },
	isFold:function (argument) {
	 	/* body... */
	 },
	isleaf:function (argument) {
	 	/* body... */
	}

};

let rootNodeBody=document.querySelector(".nodebody");
let rootNode=new TreeNode({nodebody:rootNodeBody,childNodes:[],data:'Web'});