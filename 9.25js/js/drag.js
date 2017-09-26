window.addEventListener('load',function(){
	let box = document.querySelector('.box');
	
	box.addEventListener('mousedown',function(e){
		let oX = e.offsetX ,  oY = e.offsetY
		// let oY = e.offsetY;   为防止移的过快而掉出去此处的对象由box换成document
		document.addEventListener('mousemove',fn);
		
		box.addEventListener('mouseup',function(){
			document.removeEventListener('mousemove',fn);
		})
		function fn(e){
			let lefts = e.clientX-oX;
			let tops = e.clientY-oY;
			// 换成document后把this换成box
			box.style.left = `${lefts}px`;
			box.style.top = `${tops}px`;
		}
	})
})
