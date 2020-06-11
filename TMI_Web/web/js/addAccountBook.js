document.getElementById('add_account').addEventListener('click',add,false);

function add() {
    var account_name = document.getElementById("account_name").value;
    var account = document.getElementById("account").value;
    var account_password = document.getElementById("account_password").value;
    var account_date = document.getElementById("account_date").value;

    if(account_name === "" || account === "" || account_password === "" || account_date === "")
    {
        alert("내용을 모두 입력해주세요.");
    }


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


    alert(account_date);
}
