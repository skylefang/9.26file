/*
* @Author: DELL-PC
* @Date:   2017-09-19 16:08:30
* @Last Modified by:   DELL-PC
* @Last Modified time: 2017-09-25 21:49:28
*/
function getClass(classname){
	if(document.getElementsByClassName){
		return document.getElementsByClassName(classname);
	}else{
		var newarr = [];
		var all = document.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
		   	if(checkClass(all[i].className,classname)){
		   		newarr.push(all[i]);
		   	}
		}
		return newarr;
	}
}
/*
checkClass(className,classname)
className 里面是否包含 classname
className 'box box1 box2'
classname 'box'
 */
function checkClass(className,classname){
	var arr = className.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i] == classname){
			return ture;
		}
	}
	return false;
}
/*
 (重载)
 */
function $(select,ranger){
	if(typeof select == 'string'){
		ranger = ranger || document;
	    var first = select.charAt(0);
		if(first =='.'){
			// class
			return getClass(select.substring(1),ranger);
		}else if(first=='#'){
			// id
			return document.getElementById(select.substring(1));
		}else if(/^[a-z][a-z1-6]{0,7}$/.test(select)){
	        // tag
	        return ranger.getElementsByTagName(select);
		}
    }else if(typeof select == 'function'){
    	window.addEventListener('load',select);
    }
	
}
// 元素漂浮
function Float(obj){
    this.obj = obj;
	this.maxX = window.innerWidth-this.obj.offsetWidth;
	this.maxY = window.innerHeight-this.obj.offsetHeight;
	this.speed = 3;
	this.speedY = 3;
}
Float.prototype.stop=function(){
    clearInterval(this.t);
}
Float.prototype.resize=function(){
    this.maxX = window.innerWidth-this.obj.offsetWidth;
	this.maxY = window.innerHeight-this.obj.offsetHeight;
}
Float.prototype.move = function(){
	let that = this;
	this.t = setInterval(function(){
		let lefts = that.obj.offsetLeft + that.speed;
		let tops = that.obj.offsetTop + that.speedY;
		if(lefts>=that.maxX){
			lefts=that.maxX;
			that.speed*=-1;
		}
		if(lefts<=0){
			lefts=0;
			that.speed*=-1;
		}
		if(tops>=that.maxY){
			tops=that.maxY
			that.speedY*=-1;
		}
		if(tops<=0){
			tops=0;
			that.speedY*=-1;
		}

		that.obj.style.left = lefts + 'px';
		that.obj.style.top = tops + 'px';
	},25)
}
// 用childNodes模拟children
/*
1.遍历 判断节点类型是否==1，是放到一个新数组中
 */
function children(parent){
	let newarr = [];
	let childs = parent.childNodes;
	childs.forEach(element=>{
		if(element.nodeType==1){
			newarr.push(element);
		}
	})
	return newarr;
}
/*
2.filter
 */
function children1(parent){
	let childs = parent.childNodes;
	let arr = Array.from(childs);
	let newarr = arr.filter(element=>element.nodeType==1);
	return newarr;
}

// 模拟firstElementChild
function firstChild(parent){
	return children(parent)[0];
}
// lastElementChild
function lastChild(parent){
	let child = children(parent);
	return child.pop();
}

// 找某个元素离他最近的一个标签
/*
1.首先获取他的父元素，然后找到这个元素
2.截取它后面的所有元素，放到一个数组中
3.在数组中寻找符合条件标签
 */
// 返回最近元素的节点
function next(element,tagname){
	let parent = element.parentNode;
	let child = parent.children;
	let index = 0;
	for(let i=0;i<child.length;i++){
		if(child[i]==element){
			index=i;
			break;
		}
	}
	let nextAll=Array.from(child).slice(index+1);
	for(let i=0;i<nextAll.length;i++){
		if(nextAll[i].nodeName==tagname.toUpperCase()){
			return nextAll[i];
		}
	}
	return null;
}
// 返回元素节点的下标
function next1(element,tagname){
	let parent = element.parentNode;
	let childs = parent.children;
	let index = 0;
	for(let i=0;i<childs.length;i++){
		if(childs[i]==element){
            index = i;
            break;
		}
	}
	let nextAll = Array.from(childs).slice(index+1);
	for(let i=0;i<nextAll.length;i++){
		if(nextAll[i].nodeName==tagname.toUpperCase()){
			return i;
		}
	}
	return null;
}

// 
function nextAll(element,tagname){
    let parent = element.parentNode;
	let child = parent.children;
	let index = 0;
	for(let i=0;i<child.length;i++){
		if(child[i]==element){
			index=i;
			break;
		}
	}
	let nextAll=Array.from(child).slice(index+1);
	return nextAll;
}

// 用while
function next2(element,tagname){
	let nextS = element.nextElementSibling;
	if(nextS==null){
		return null;
	}
	while(nextS.nodeName!=tagname.toUpperCase()){
		nextS=nextS.nextElementSibling;
		if(nextS==null){
		return null;
	    }
	    if(nextS.nodeName==tagname.toUpperCase()){
		return nextS;
	    }
	}
}
function next2All(element,tagname){
	let arr = [];
	let nextS = element.nextElementSibling;
	if(!nextS){
		return null;
	}
	arr.push(nextS);
	while(nextS!=null){
		nextS = nextS.nextElementSibling;
		if(nextS==null){
			return arr;
		}
		arr.push(nextS);
	}
}

/*
找某个元素的父元素
 */
/*function parent(element){
	if(element.nodeName='BODY' || element.nodeName='HTML'){
		return null;
	}
	let arr = [];
	let parent = element.parentNode;
	while(parent.nodeName!='BODY'){
		arr.push(parent);
		parent = parent.parentNode;
	}
	return arr;
}*/


/*
用insertBefore来模拟insertAfter
思路：获取当前元素的下一个兄弟元素  ,有的话在兄弟元素的前面插一个
 */
HTMLElement.prototype.insertAfter=function(element){
	let next = this.nextElementSibling;
	let parent = this.parentNode;
	if(next){
		parent.insertBefore(element,next);
	}else{
		parent.append(element);
	}
}
// 在特定元素的儿子里最前面加一个元素
HTMLElement.prototype.prependChild=function(element){
	let first = this.firstElementChild;
	if(first){
		this.insertBefore(element, first);
	}else{
		this.appendChild(element);
	}
}