document.getElementById('sign_in').addEventListener('click',sign_in,false);

function sign_in() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(!check_email_format(email)){
        alert("이메일 형식이 잘못되었습니다.")
        document.getElementById("email").focus();
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

    //document.location.replace("home.html");
    location.href = 'home.html'
    //alert(1);
}

function check_email_format() {
    var email = document.getElementById("email").value;
    var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_email.test(email)){
        return false;
    }
    else{
        return true;
    }
}
