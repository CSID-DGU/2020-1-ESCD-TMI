document.getElementById('save').addEventListener('click',save);

var stfArray = new Array(); // 물건 배열
var priceArray = new Array(); // 가격 배열
var i = 0;
var all_price = 0; // 총액 변수



function save() {
 
	var user_name = document.getElementById("name").value;   // 내역 이름
	for(var a=0; a<i; a++)
	{
		stfArray[a] = document.getElementById("stf"+a).value;   // 물품 이름
		priceArray[a]= document.getElementById("price"+a).value * 1; // 가격을 수로 변환 
		all_price += priceArray[a];
		
	}
	alert("저장되었습니다! 총 액수는 = "+all_price);

	location.href ="bookAdmin.html"
	
}


function CreateTextBox()
   {
  		
	    var txt1 = "<input type='textarea' id='stf"+i+"' placeholder ='상품명' />";
	    var txt2 = "<input type='textarea' id='price"+i+"' placeholder ='가격'/>\\<br />";
	    i++;
	    document.getElementById("txtPanel").innerHTML += (txt1 + txt2);

   }
 
function DeleteTextBox()
{
       document.getElementById("txtPanel").innerHTML = "";
}




