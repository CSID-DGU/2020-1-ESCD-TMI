document.getElementById('sign_in').addEventListener('click',sign_in,false);

function sign_in() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(!check_email_format(email)){
        alert("이메일 형식이 잘못되었습니다.")
        document.getElementById("email").focus();
        return;
    }
    else if(password === ""){
        alert("비밀번호를 입력해주세요.");
        document.getElementById("password").focus();
    }

    var https = new XMLHttpRequest();
    try{
        https.open('Get', url + + email + "/" + password, false);
        https.send(null);

        if(https.readyState === 4 && https.status === 201) {
            var response = JSON.parse(https.responseText);
            //document.location.replace("sign_in.html");
            location.href = 'home.html'
        }
    }
    catch (e) {
        alert(e.toString())
    }
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
