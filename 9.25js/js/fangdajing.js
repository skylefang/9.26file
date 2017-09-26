/*
* @Author: DELL-PC
* @Date:   2017-09-25 16:14:36
* @Last Modified by:   DELL-PC
* @Last Modified time: 2017-09-25 18:06:58
*/
// $(function(){
// 	let small = $('.small')[0];
// 	console.log(small)
// })
window.addEventListener('load',function(){
	let small = $('.small')[0];
	let big = $('.big')[0];
	let bImg = $('img',big)[0];
	let opacity = document.querySelector('.opacity')
	let mask = document.querySelector('.mask')
	console.log(bImg)
	let mw = mask.offsetWidth,
	    mh = mask.offsetHeight,
	    sw = small.offsetWidth,
	    sh = small.offsetHeight,
	    bw = big.offsetWidth,
	    bh = big.offsetHeight;

	let bili = bImg.offsetWidth/parseInt(getComputedStyle(small,null).width);
	
	opacity.onmousemove=function(e){
		// 让鼠标到遮罩的中间
		let ox = e.offsetX-mw/2;
		let oy = e.offsetY-mh/2;
        if(ox>=sw-mw){
        	ox = sw-mw;
        }
        if(ox<=0){
        	ox = 0;
        }
        if(oy>=sh-mh){
        	oy = sh-mh;
        }
        if(oy<=0){
        	oy = 0;
        }
		mask.style.left = ox + 'px'
		mask.style.top = oy + 'px'
        /*以上为拖拽
        mask/small = big/bImg
        bImg = small*big / mask
         */
		bImg.style.width = sw * bw /mw +'px';
		bImg.style.height = sh * bh /mh +'px';

		bImg.style.left = -sw * ox /mw +'px';
		bImg.style.top = -sh * oy / mh +'px';

	}
})

