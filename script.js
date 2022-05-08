let whoseturn;
let winner;
let lineState;
const boardState=[];
const turnMsg=document.getElementById('turn-msg');
const tiles=document.getElementsByClassName('tile');

const ttob=document.getElementById('ttob');
const ltor=document.getElementById('ltor');
const diag1=document.getElementById('diag1');
const diag2=document.getElementById('diag2');


let winStates=[
    [0, 1, 2, 13, ltor], 
    [3, 4, 5, 48, ltor],
    [6, 7, 8, 82, ltor],
    [0, 3, 6, 14, ttob],
    [1, 4, 7, 49, ttob],
    [2, 5, 8, 83, ttob],
    [0, 4, 8, diag1],
    [2, 4, 6, diag2]
];


function checkWin(){// updates isGameOver and winner
    for(let winState of winStates){
        if(boardState[winState[0]]==boardState[winState[1]] && boardState[winState[1]]==boardState[winState[2]] && boardState[winState[0]]!=0){
            isGameOver=true;
            winner=boardState[winState[0]];
            lineState=winStates.indexOf(winState);
            return;
        }
    }
    isGameOver=true;
    for(let val of boardState){
        if(val==0){
            isGameOver=false;
        }
    }
}

function swapTurn(){
    whoseturn=whoseturn==='X'?'O':'X';
    turnMsg.innerText=`Player ${whoseturn}'s turn`;
}

function resetBoard(){
    ltor.style.width='0';
    ttob.style.height='0';
    diag1.style.width='0';
    diag2.style.width='0';
    lineState=-1;
    whoseturn='X';
    isGameOver=false;
    for(let element of tiles){
        element.innerText="";
    }
    winner=0;
    for(let i=0; i<9; i++){
        boardState[i]=0;
    }
    turnMsg.innerText=`Player ${whoseturn}'s turn`;
}

function drawWinningLine(){
    if(0<=lineState && lineState<3){
        winStates[lineState][4].style.width='30vh';
        winStates[lineState][4].style.top=winStates[lineState][3]+"%";
    }
    else if(3<=lineState && lineState<6){
        winStates[lineState][4].style.height='30vh';
        winStates[lineState][4].style.left=winStates[lineState][3]+"%";
    }
    else{
        winStates[lineState][3].style.width='40vh';
    }
}


for(let x of tiles){
    let ind=Array.from(x.parentNode.children).indexOf(x);
    x.addEventListener('mouseover', ()=>{
        if(boardState[ind]==0){
            x.classList.add('onMe');
            x.innerText=whoseturn;
        }
    })

    x.addEventListener('mouseout', ()=>{
        x.classList.remove('onMe');
        if(boardState[ind]==0){
            x.innerText="";
        }
    })

    x.addEventListener('click', ()=>{
        if(boardState[ind]==0 && !isGameOver){
            x.classList.remove('onMe');
            if(boardState[ind]==0){
                x.innerText="";
            }
            x.innerText=whoseturn;
            boardState[ind]=whoseturn==='X'?1:2;
            checkWin();
            if(isGameOver){
                let msg="";
                if(winner==1){
                    msg='X wins';
                }
                else if(winner==2){
                    msg='O wins';
                }
                else{
                    msg='Draw';
                }
                turnMsg.innerText=msg;
                drawWinningLine();
                return;
            }
            swapTurn();
        }
    })   
}


resetBoard();
document.getElementById('reset-btn').addEventListener('click', resetBoard);
