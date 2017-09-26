window.onload=function(){
	let table = document.querySelector('tbody');
	let addBtn = document.querySelector('button.addBtn');
    let students = [
	    {name:'zhangsan',sex:'女',phone:'123456',jiguan:'山西忻州',birthday:'1997年11月07日'},
	    {name:'zhangsan',sex:'女',phone:'123456',jiguan:'山西忻州',birthday:'1997年11月07日'},
	    {name:'zhangsan',sex:'女',phone:'123456',jiguan:'山西忻州',birthday:'1997年11月07日'},
	    {name:'zhangsan',sex:'女',phone:'123456',jiguan:'山西忻州',birthday:'1997年11月07日'},
	    {name:'zhangsan',sex:'女',phone:'123456',jiguan:'山西忻州',birthday:'1997年11月07日'},
    ];
    addBtn.ondblclick=function(){
     students.forEach(element=>{
        createTr(element)
    })
    }
    // students.forEach(element=>{
    //     createTr(element)
    // })
    function createTr(obj){
    	let trs = document.createElement('tr');
    	trs.innerHTML =`
    	        <td>${obj.name}</td>
				<td>${obj.sex}</td>
				<td>${obj.phone}</td>
				<td>${obj.jiguan}</td>
				<td>${obj.birthday}</td>
				<td class="del"><button>删除</button></td>

    	`
    	table.appendChild(trs);


    }
	table.ondblclick=function(e){
		let element = e.target;
		if(element.nodeName == 'TD' && element.className!='del'){
			let oldv = element.innerText;
			element.innerText = '';
			let inputs = document.createElement('input');
			inputs.value = oldv;
			element.appendChild(inputs);
			inputs.onblur = function(){
				let newv = this.value.trim();
				element.removeChild(inputs);
				inputs = null;
				// element.innerText = newv;
				if(newv){
				   element.innerText = newv;
				}else{
				   element.innerText = oldv;
				}
			}
		}else if(element.nodeName == 'BUTTON'){
			let trs = element.parentNode.parentNode;
			table.removeChild(trs);
		}
	}	
}