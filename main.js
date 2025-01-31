var turn=0;
let board=[0,0,0,0,0,0,0,0,0,0]
let winner;
document.body.style.backgroundColor = "rgb(94, 4, 4)";
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
        alert("Congratulations Player"+winner+" wins.");
        reset();
    }
    else if (turn===9){
        alert("Tie.");
        reset();
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