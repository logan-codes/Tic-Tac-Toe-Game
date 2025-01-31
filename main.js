var turn=0;
let board=[0,0,0,0,0,0,0,0,0]
function play(Id){
    var player1 = "X";
    var player2 = "O";
    if (turn%2==0&&board[Id]==0){
        document.getElementById(Id).innerHTML=player1;
        board[Id]=1;
        turn++;
    }
    else if(turn%2!=0&&board[Id]==0){
        document.getElementById(Id).innerHTML=player2;
        board[Id]=2;
        turn++;
    }
    if (wincondition(board)){
        console.log("Congratulations player wins.");
        reset();
    }
    else if (turn===9){
        console.log("Tie.");
        reset();
    }

}
function reset(){
    turn=0;
    board=[0,0,0,0,0,0,0,0,0,0];
    for(i=1;i<10;i++){
        document.getElementById(i).innerHTML=null;
    }
}
function wincondition(board){
    if(0!=board[1]&&board[1]==board[4]&&board[1]==board[7]){
        return true;
    }
    else if(0!=board[2]&&board[2]==board[5]&&board[2]==board[8]){
        return true;
    }
    else if(0!=board[3]&&board[3]==board[6]&&board[3]==board[9]){
        return true;
    }
    else if(0!=board[1]&&board[1]==board[2]&&board[1]==board[3]){
        return true;
    }
    else if(0!=board[4]&&board[4]==board[5]&&board[4]==board[6]){
        return true;
    }
    else if(0!=board[7]&&board[7]==board[8]&&board[7]==board[9]){
        return true;
    }
    else if(0!=board[1]&&board[1]==board[5]&&board[1]==board[9]){
        return true;
    }
    else if(0!=board[3]&&board[3]==board[5]&&board[3]==board[7]){
        return true;
    }
    else{
        return false;
    }
}