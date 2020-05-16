document.getElementById('sign_up').addEventListener('click',sign_up,false);
document.getElementById('password2').addEventListener('input',check_password,false);
document.getElementById('password').addEventListener('input',check_password_reset,false);

var check = 0;
function sign_up() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(check == 0){
        alert("비밀번호가 다릅니다.");
        return;
    }
    //alert(email);
    /*var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + doc_title + "&doc_body=" + body + "&todo_count=" + todo_count + "&toggle_count=" + toggle_count ); //doc_alarm 추가

        if(http.readyState === 4 && http.status === 201){

            var response = JSON.parse(http.responseText);
        }
    }catch (e) {
        alert(e.toString());
    }
    */

    //document.location.replace("sign_in.html");
    location.href = 'sign_in.html'
    //alert(1);
}

function check_password_reset() {
    var password = document.getElementById("password").value;
    if(password === ''){
        check = 0;
        document.getElementById("check_password").innerText = '';

    }
}
function check_password(){
    //alert(1);
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    if(password2 == ''){
        check = 0;
        document.getElementById("check_password").innerText = '';
    }
    else if(password !== password2){
        check = 0;
        document.getElementById("check_password").innerText = '비밀번호 값이 다릅니다.';
    }
    else{
        check = 1;
        document.getElementById("check_password").innerText = '비밀번호 값이 같습니다.';
    }
}
