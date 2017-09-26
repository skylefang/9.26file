/*

*/
class drag{
	constructor(obj){
		this.obj = obj;
	}
	move(){
		let that = this;
		this.obj.addEventListener('mousedown',function(e){
			let ox = e.offsetX , oy = e.offsetY;
			document.addEventListener('mousemove',fn);
			that.obj.addEventListener('mouseup',function(){
				document.removeEventListener('mousemove',fn);
			})
			function fn(e){
				let lefts = e.clientX-ox;
			    let tops = e.clientY-oy;
			    that.obj.style.left = `${lefts}px`;
			    that.obj.style.top = `${tops}px`;
			}
		})
	}
}