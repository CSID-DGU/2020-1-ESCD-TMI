document.getElementById('add_account').addEventListener('click',add,false);

function add() {
    var account_name = document.getElementById("account_name").value;
    var fintech_num = document.getElementById("fintech_num").value;
    var bank_num = document.getElementById("bank_num").value;
    var date = document.getElementById("date").value;

    /*var http = new XMLHttpRequest();
    try {
        http.open('Post',"https://sharesdocument.ml/doc", false );
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("user_id=" + user_id + "&doc_id=" + doc_id + "&doc_title=" + doc_title + "&doc_body=" + body + "&todo_count=" + todo_count + "&toggle_count=" + toggle_count ); //doc_alarm 추가

        if(http.readyState === 4 && http.status === 201){

            var response = JSON.parse(http.responseText);
                //document.location.replace("list.html");
                location.href = 'list.html'
        }
    }catch (e) {
        alert(e.toString());
    }
    */


    //alert(date_);
}
