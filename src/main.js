var turn=0;
let board=[0,0,0,0,0,0,0,0,0,0]
let winner;
let p1s=0;
let p2s=0;
function start(){
    toggleDis("stage1");
    toggleDis("stage2");
    document.body.style.backgroundColor= "rgb(94, 4, 4)";
    document.getElementById("Resume").disabled = false;
    document.getElementById("MainMenu").disabled = false;
}
function MainMenu(where){
    if(where != "home"){}
    reset();
    toggleDis("stage1");
    toggleDis("stage2");
    if (where=="back"){
        toggleDis("stage3"); 
    }
    p1s=0;
    p2s=0;
    updateScore();
    document.body.style.backgroundColor= "rgb(255, 255, 255)";
    toggleMenu();
    document.getElementById("Resume").disabled = true;
    document.getElementById("MainMenu").disabled = true;
}
function toggleMenu(){
    let menuObj=document.getElementsByClassName("menubtns")[0];
    if (menuObj.style.display=="none"){
        menuObj.style.display="flex";
        document.getElementsByClassName("menuicon")[0].src="../media/images/close.png"
    }
    else{
        menuObj.style.display="none";
        document.getElementsByClassName("menuicon")[0].src="../media/images/menu.png"
    }
}
function toggleDis(obj_name){
    var obj = document.getElementsByClassName(obj_name);
    for (i=0;i<obj.length;i++){
        if (obj[i].style.display == "none"){
            obj[i].style.display = "flex";
        }
        else{
            obj[i].style.display = "none";
        }
    }
}
function play(Id){
    var player1 = "X";
    var player2 = "O";
    if (turn%2==0&&board[Id]==0){
        document.getElementById(Id).innerHTML=player1;
        document.getElementById(Id).className="player1";
        board[Id]=1;
        turn++;
        document.getElementById("pdis").innerHTML="Player2's Turn";
        document.getElementById("pdis").className="p2"
        document.body.style.backgroundColor = "rgb(4, 28, 94)"
    }
    else if(turn%2!=0&&board[Id]==0){
        document.getElementById(Id).innerHTML=player2;
        document.getElementById(Id).className="player2";
        board[Id]=2;
        turn++;
        document.getElementById("pdis").innerHTML="Player1's Turn";
        document.getElementById("pdis").className="p1"
        document.body.style.backgroundColor = "rgb(94, 4, 4)";
    }
    if (wincondition(board)){
        var message="Congratulations! Player"+winner+" wins.";
        if(winner==1){
            p1s++
        }
        else{
            p2s++
        }
        EndGame(message);
        updateScore();
    }
    else if (turn===9){
        EndGame("Good play! It was a tie");
    }

}

function reset(){
    turn=0;
    board=[0,0,0,0,0,0,0,0,0,0];
    for(i=1;i<10;i++){
        document.getElementById(i).innerHTML=null;
        document.getElementById(i).classList.remove("player1","player2");
        document.getElementById("pdis").innerHTML="Player1's Turn";
        document.getElementById("pdis").className="p1"
        document.body.style.backgroundColor = "rgb(94, 4, 4)";
    }
    toggleDis("stage3");
}
function wincondition(board){
    if(0!=board[1]&&board[1]==board[4]&&board[1]==board[7]){
        winner=board[1];
        return true;
    }
    else if(0!=board[2]&&board[2]==board[5]&&board[2]==board[8]){
        winner=board[2];
        return true;
    }
    else if(0!=board[3]&&board[3]==board[6]&&board[3]==board[9]){
        winner=board[3];
        return true;
    }
    else if(0!=board[1]&&board[1]==board[2]&&board[1]==board[3]){
        winner=board[1];
        return true;
    }
    else if(0!=board[4]&&board[4]==board[5]&&board[4]==board[6]){
        winner=board[4];
        return true;
    }
    else if(0!=board[7]&&board[7]==board[8]&&board[7]==board[9]){
        winner=board[7];
        return true;
    }
    else if(0!=board[1]&&board[1]==board[5]&&board[1]==board[9]){
        winner=board[1];
        return true;
    }
    else if(0!=board[3]&&board[3]==board[5]&&board[3]==board[7]){
        winner=board[3];
        return true;
    }
    else{
        return false;
    }
}
function EndGame(message){
    toggleDis("stage3");
    document.getElementsByClassName("endscr")[0].innerHTML=message;
}
function updateScore(){
    document.getElementById("p1s").innerHTML="Player1's Score:"+p1s;
    document.getElementById("p2s").innerHTML="Player1's Score:"+p2s;
}