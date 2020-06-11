document.getElementById('sign_up').addEventListener('click',sign_up,false);
document.getElementById('password2').addEventListener('input',check_password,false);
document.getElementById('password').addEventListener('input',check_password_reset,false);

var url = "";
function sign_up() {

    var name = document.getElementById("name").value;
    var fintech = document.getElementById("fintech").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(check_password()){
        alert("비밀번호가 다릅니다.");
    }
    else if(check_email_format()){
        alert("이메일 형식이 아닙니다.")
    }
    else{
        var https = new XMLHttpRequest();
        try{
            https.open('Get', url + name + "/" + fintech + "/" + email + "/" + password, false);
            https.send(null);

            if(https.readyState === 4 && https.status === 201) {
                var response = JSON.parse(https.responseText);
                //document.location.replace("sign_in.html");
                location.href = 'sign_in.html'
            }
        }
        catch (e) {
            alert(e.toString())
        }
    }
}

function check_password(){
    //alert(1);
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    if(password !== password2){
        return 0;
    }
    else{
        return 1
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
