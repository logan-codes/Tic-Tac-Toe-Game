var turn=0;
let board=[0,0,0,0,0,0,0,0,0,0]
let winner;
let p1s=0;
let p2s=0;
let mode;
let loop;
let time;
let timerID;

function ToggleMenu(){
    SFXaudio.pause();
    SFXaudio.play();
    ToggleDis("DropdownItems");
    if (document.getElementsByClassName("DropdownItems")[0].style.display=="flex"){
        document.getElementsByClassName("Stage1")[0].style.filter="blur(5px)";
        document.getElementsByClassName("Stage2")[0].style.filter="blur(5px)";
        document.getElementById("MenuIcon").src="media/images/close.png";
    }   
    else{
        document.getElementsByClassName("Stage1")[0].style.filter="none";
        document.getElementsByClassName("Stage2")[0].style.filter="none";
        document.getElementById("MenuIcon").src="media/images/menu.png";
    }

    if (timerID){
        clearInterval(timerID);
        timerID=null;
    }
    else{
        StartTimer(time,"Countdown");
    }

    if (document.getElementsByClassName("Settings-page")[0].style.display=="flex"){
        ToggleDis("Settings-page");
    }
    if (document.getElementsByClassName("Htp-page")[0].style.display=="flex"){
        ToggleDis("Htp-page");
    }
}

function Resume(){
    SFXaudio.play();
    if (document.getElementsByClassName("Settings-page")[0].style.display=="flex"){
        ToggleDis("Settings-page");
    }
    if (document.getElementsByClassName("Htp-page")[0].style.display=="flex"){
        ToggleDis("Htp-page");
    }
    ToggleDis("DropdownItems");
    if (document.getElementById("MenuIcon").src=="media/images/close.png"){
        document.getElementsByClassName("Stage1")[0].style.filter="blur(5px)";
        document.getElementsByClassName("Stage2")[0].style.filter="blur(5px)";
        document.getElementById("MenuIcon").src="media/images/menu.png";
    }
    else{
        document.getElementsByClassName("Stage1")[0].style.filter="none";
        document.getElementsByClassName("Stage2")[0].style.filter="none";
        document.getElementById("MenuIcon").src="media/images/close.png";
    }
    StartTimer(time,"Countdown");
}

function MainMenu(){
    SFXaudio.play();
    BGaudio.play();
    CBGaudio.pause();
    QBGaudio.pause();
    Reset();
    ToggleDis("Stage1");
    ToggleDis("Stage2");
    ToggleDis("Stage3");
    p1s=0;
    p2s=0;
    UpdateScore();
    document.body.style.backgroundColor= "var(--grey-400)";
    ToggleMenu();
    ToggleDis("Resume");
    ToggleDis("MainMenu");
    ToggleDis("StartBtn");
    ToggleDis("ModeSelec");
    StopTimer();
    clearInterval(loop);
    if(mode=="casual"){
        ToggleDis("Countdown");
    }
}

function Settings(){
    SFXaudio.play();
    if (document.getElementsByClassName("Htp-page")[0].style.display=="flex"){
        ToggleDis("Htp-page");
    }
    ToggleDis("Settings-page");
}

function Htp(){
    SFXaudio.play();
    if (document.getElementsByClassName("Settings-page")[0].style.display=="flex"){
        ToggleDis("Settings-page");
    }
    ToggleDis("Htp-page");
}

function BGvolume(){
    var bgv = document.getElementById("BGvolume").value;
    BGaudio.volume = bgv/100;
    CBGaudio.volume = bgv/100;
    QBGaudio.volume = bgv/100;
}

function SFXvolume(){
    var sfxv = document.getElementById("SFXvolume").value;
    SFXaudio.volume = sfxv/100;
}

function Mute(){
    document.getElementById("BGvolume").value=0;
    document.getElementById("SFXvolume").value=0;
    SFXaudio.volume = 0.0;
    BGaudio.volume = 0.0;
    CBGaudio.volume = 0.0;
    QBGaudio.volume = 0.0;
}

function Start(){
    ToggleDis("StartBtn");
    ToggleDis("ModeSelec");
    SFXaudio.play();
    document.getElementsByClassName("TxtDis")[0].innerHTML="Select a mode to start the game";
}

function Casual(){
    document.getElementsByClassName("TxtDis")[0].innerHTML="Welcome to the Tic Tac Toe Game";
    BGaudio.pause();
    CBGaudio.play();
    SFXaudio.play();
    mode="casual";
    ToggleDis("Stage1");
    ToggleDis("Stage2");
    document.body.style.backgroundColor= "var(--red-900)";
    ToggleDis("Resume");
    ToggleDis("MainMenu")
    ToggleDis("Countdown");
}

function QuickDraw(){
    document.getElementsByClassName("TxtDis")[0].innerHTML="Welcome to the Tic Tac Toe Game";
    BGaudio.pause();
    QBGaudio.play();
    SFXaudio.play();
    mode="quickDraw";
    ToggleDis("Stage1");
    ToggleDis("Stage2");
    document.body.style.backgroundColor= "var(--red-900)";
    ToggleDis("Resume");
    ToggleDis("MainMenu");
    StartTimer(3,"Countdown");
    loop =setInterval(()=>{
        if(document.getElementsByClassName("Countdown")[0].innerHTML=="Time's up"){
            let ply= turn%2==0?"player2":"player1";
            EndGame(ply+" has won! due to Time out.");
            clearInterval(loop);
        }
    },1000);
}

function Back(){
    SFXaudio.play();
    ToggleDis("ModeSelec");
    ToggleDis("StartBtn");
    document.getElementsByClassName("TxtDis")[0].innerHTML="Welcome to the Tic Tac Toe Game";
}

function play(Id){
    SFXaudio.pause();
    SFXaudio.play();
    var player1 = "X";
    var player2 = "O";
    if (turn%2==0&&board[Id]==0){
        document.getElementById(Id).innerHTML=player1;
        document.getElementById(Id).className="Player1";
        board[Id]=1;
        turn++;
        document.getElementById("TurnDis").innerHTML="Player2's Turn";
        document.getElementById("TurnDis").className="P2"
        document.body.style.backgroundColor = "var(--blue-900)";
    }
    else if(turn%2!=0&&board[Id]==0){
        document.getElementById(Id).innerHTML=player2;
        document.getElementById(Id).className="Player2";
        board[Id]=2;
        turn++;
        document.getElementById("TurnDis").innerHTML="Player1's Turn";
        document.getElementById("TurnDis").className="P1"
        document.body.style.backgroundColor = "var(--red-900)";
    }
    StartTimer(3,"Countdown");
    if (WinCondition(board)){
        var message="Congratulations! Player"+winner+" wins.";
        if(winner==1){
            p1s++
        }
        else{
            p2s++
        }
        EndGame(message);
        UpdateScore();
    }
    else if (turn===9){
        EndGame("Good play! It was a tie");
    }
}

function Rematch(){
    document.getElementsByClassName("Stage1")[0].style.filter="none";
    document.getElementsByClassName("Stage2")[0].style.filter="none";
    Reset();
}

function Quit(){
    SFXaudio.play();
    BGaudio.play();
    CBGaudio.pause();
    QBGaudio.pause();
    Reset();
    ToggleDis("Stage1");
    ToggleDis("Stage2");
    p1s=0;
    p2s=0;
    UpdateScore();
    document.body.style.backgroundColor= "var(--grey-400)";
    ToggleDis("ModeSelec");
    ToggleDis("StartBtn");
    ToggleDis("Resume");
    ToggleDis("MainMenu");
    StopTimer();
    if(mode=="casual"){
        ToggleDis("Countdown");
    }
    document.getElementsByClassName("Stage1")[0].style.filter="none";
    document.getElementsByClassName("Stage2")[0].style.filter="none";
}

function StartTimer(dur,obj_name){
    if (timerID){
        clearInterval(timerID);
    }
    time = dur;
    var obj = document.getElementsByClassName(obj_name)[0]
    obj.innerHTML = time;
    timerID = setInterval (() =>{
        if (time>0){
            time--;
            obj.innerHTML = time;
        }
        else if (time==0){
            clearInterval(timerID);
            obj.innerHTML = "Time's up";
        }
        else{
            clearInterval(timerID);
        }
    }
    ,1000)
}

function StopTimer(){
    clearInterval(timerID);
    clearInterval(loop);
}

function ToggleDis(obj_name){
    var obj = document.getElementsByClassName(obj_name);
    if (obj.length > 0){
        for (i=0;i<obj.length;i++){
            if (obj[i].style.display == "none"){
                obj[i].style.display = "flex";
            }
            else{
                obj[i].style.display = "none";
            }
        }
    }
    else{ 
        obj = document.getElementById(obj_name)
        if (obj.style.display == "none"){
            obj.style.display = "flex";
        }
        else{
            obj.style.display = "none";
        }
    }
    console.log(obj);
}

function Reset(){
    SFXaudio.play();
    turn=0;
    board=[0,0,0,0,0,0,0,0,0,0];
    for(i=1;i<10;i++){
        document.getElementById(i).innerHTML=null;
        document.getElementById(i).classList.remove("Player1","Player2");
        document.getElementById("TurnDis").innerHTML="Player1's Turn";
        document.getElementById("TurnDis").className="P1"
        document.body.style.backgroundColor = "var(--red-900)";
    }
    StartTimer(3,"Countdown");
    ToggleDis("Stage3");
}

function WinCondition(board){
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
    StopTimer();
    ToggleDis("Stage3");
    document.getElementsByClassName("Stage1")[0].style.filter="blur(5px)";
    document.getElementsByClassName("Stage2")[0].style.filter="blur(5px)";
    document.getElementsByClassName("EndTxt")[0].innerHTML=message;
}

function UpdateScore(){
    document.getElementById("P1S").innerHTML="Player1's Score:"+p1s;
    document.getElementById("P2S").innerHTML="Player1's Score:"+p2s;
}


document.addEventListener("DOMContentLoaded", function() {
    ToggleDis("Stage2");
    ToggleDis("Stage3");
    ToggleDis("Resume");
    ToggleDis("MainMenu");
    ToggleDis("Settings-page");
    ToggleDis("Htp-page");
    ToggleDis("DropdownItems");
    ToggleDis("ModeSelec");
});
document.addEventListener("load", () => {
    let BGaudio = document.getElementById("BGaudio");
    let CBGaudio = document.getElementById("CBGaudio");
    let QBGaudio = document.getElementById("QBGaudio");
    let SFXaudio = document.getElementById("SFXaudio");
    BGaudio.play();
})
