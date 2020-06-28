<html>
<head>
    <title>Title</title>
</head>
<body style="width: 100%;
        height: 100vh;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;

        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;">
<div style="overflow:scroll; width:100%; height:100%; margin-left: 10%; margin-right: 10%">
    <div style=" margin-top: 5%;
            float: right;
            margin-right: 7%;
            display: flex;">
        <div style="margin-left: 20px;">
            <form action = "/auth/logout" method = "get">
                <input type ="submit" value="로그아웃" style="background-color:transparent;  border:0px transparent solid;">
            </form>
        </div>
        <div style="margin-left: 20px;" onclick="home()">Home</div>
        <div style="margin-left: 20px;" onclick="add()">장부 추가하기</div>
    </div>

    <div style="margin-top: 15%;
            font-weight: bold;
            font-size: 40px;
            margin-bottom: 50px;">My Page</div>

    <% for(var i=0; i < books.length; i++){ %>
    <div
            style="
             border: 1px solid black;
             background-color: lightgrey;
             padding: 10px;
             float: left;
             height: 20%;
             width: 30%;
             margin-right: 1%;
             margin-bottom: 3%;
             text-align: center;
             display: -webkit-box;
             display: -ms-flexbox;
             display: flex;

            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;

            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            "
            onclick="move(this)"
            id=
                <%= i%>
    >
        <%=books[i].name %>
    </div>
    <%}%>

</div>
</body>
<script>
    function move(elem) {
        id = elem.id;
        window.location.href = "/manager/:" + elem.id;
    }

    function home() {
        window.location.href = "home.html";
    }
    function add() {
        window.location.href = "addAccountBook.html";
    }
</script>
</html>
