 window.addEventListener('load',function(){
	let b1 = $('.b1')[0];
	let b2 = $('.b2')[0];
	let text = $('textarea')[0];
    let user = $('input')[0]
	let area = document.querySelector('.area');
	let li = document.querySelector('.a1');
	let num = document.querySelector('span.num');
	let rest = document.querySelector('span.rest');
    let ul = document.querySelector('ul');
	console.log(ul)
	ul.onmouseover=function(e){
		if(e.target.nodeName=='LI'){
			e.target.style.background='#FEE3D3';
		}  
	}
	ul.onmouseout=function(e){
		if(e.target.nodeName=='LI'){
			e.target.style.background='#fff';
		}  
	}
	text.addEventListener('keyup',function(){
		let value = this.value;
		num.innerText = value.length;
		rest.innerText = this.maxLength - value.length;
	})
    // 鼠标点击事件
	b1.addEventListener('click',function(){
		let lis = document.createElement('li');
	    area.prependChild(lis,li);
	    lis.className = 'a1'
	    lis.innerHTML =`
	         <img src="img/timg.jpg" alt="">
	  	  <div class="middle">
	  	  	<h3>${user.value}</h3>
	  	  	<p>${text.value}</p>
	  	  </div>
	    `;
        text.value = '';
        user.value = '';
        num.innerText = 0;
        rest.innerText = text.maxLength	;
	})
	b2.addEventListener('click',function(){
		text.value = '';	
	})
	// 键盘
	text.onkeydown=function(e){
		if(e.shift && e.keyCode == 13){
			let lis = document.createElement('li');
	    area.prependChild(lis,li);
	    lis.className = 'a1'
	    lis.innerHTML =`
	         <img src="img/timg.jpg" alt="">
	  	  <div class="middle">
	  	  	<h3>${user.value}</h3>
	  	  	<p>${text.value}</p>
	  	  </div>
	    `;
        text.value = '';
        user.value = '';
        num.innerText = 0;
        rest.innerText = text.maxLength	;
		}
	}

})
