const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const NewGameBtn = document.querySelector(".btn")


let currentPlayer;
let gameGrid

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach((box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";

    })

    NewGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`

}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X";
    }

    gameInfo.innerHTML = `current Player -${currentPlayer}`
}


function checkGameOver() {
    let ans = "";

    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {


            if (gameGrid[position[0]] === "X") {
                ans = "X";
            }
            else {
                ans = "O";
            }
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })

    if (ans !== "") {
        gameInfo.innerHTML = `Winner Player -${ans}`
        NewGameBtn.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    })

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        NewGameBtn.classList.add("active");
    }


}



function handClick(index) {
    if (gameGrid[index] == "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handClick(index);
    })
})

NewGameBtn.addEventListener("click", initGame)