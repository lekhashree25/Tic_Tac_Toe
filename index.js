let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector(".newGame");
let msgcontainer = document.querySelector(".wincontainer");
let winningMsg = document.querySelector(".winningMsg");
let count = 0;

//to know the turn
let turnO = true; //O if false 'X'
//winning pattern
let winningPattern = [ [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5] , [6,7,8]];


//add eventListener for each boxes
boxes.forEach((box)=>{//you need to make sure boxes are array
    box.addEventListener("click", () => {
        // console.log("Box was clicked!")
        if(turnO === true){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    count =0;
    enableBoxes();
    msgcontainer.classList.add("hide");
}
const showWinner = (winner) =>{
    winningMsg.innerText = `Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    winningMsg.innerText = "The Game is Draw";
    msgcontainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () =>{
    let winnerFound = false;
    for(let pattern of winningPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!= "" && pos2Val != "" && pos3Val!=""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            // console.log("Winner!", pos1Val)
            winnerFound = true;
            showWinner(pos1Val);
            return;
        }

        }

    }

    if(count === 9 && !winnerFound){
        showDraw();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
