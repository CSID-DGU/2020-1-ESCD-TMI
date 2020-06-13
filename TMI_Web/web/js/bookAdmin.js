document.getElementById('detail').addEventListener('click',move_url_detail);
document.getElementById('using').addEventListener('click',move_url_using);


function move_url_detail() {
	
    location.href = 'detail.html';//장부관리하는 페이지로 이동 
	
}

function move_url_using() {
	
    location.href = 'using.html';//세부내역 보여주는 페이지로 이동 
	
}


