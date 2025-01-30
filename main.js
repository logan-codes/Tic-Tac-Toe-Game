var turn=0;
let board=[0,0,0,0,0,0,0,0,0]
function play(Id){
    var player1 = "X";
    var player2 = "O";
    if (turn%2==0){
        document.getElementById(Id).innerHTML=player1;
        board[Id]=1;
        turn++;
    }
    else if (turn===9){
        reset()
    }
    else{
        document.getElementById(Id).innerHTML=player2;
        board[Id]=2;
        turn++;
    }

}
function reset(){
    turn=0;
    for(i=1;i<10;i++){
        document.getElementById(i).innerHTML=null;
    }
}
function wincondition(){

}