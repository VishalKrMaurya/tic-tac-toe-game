let text = "X";
let gameover = false;

// To check the turn
const changeTurn = () => {
    return text === "X" ? "O" : "X";
}

const winner = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    wins.forEach(a => {
        if ((boxtexts[a[0]].innerText === boxtexts[a[1]].innerText) && 
            (boxtexts[a[2]].innerText === boxtexts[a[1]].innerText) && 
            (boxtexts[a[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtexts[a[2]].innerText + " Won";
            gameover = true;
            // Disable all boxes after game is over
            Array.from(boxtexts).forEach(box => {
                box.removeEventListener('click', boxClickHandler);
            });
        }
    });

    // Check for draw
    if (!gameover) {
        let isDraw = Array.from(boxtexts).every(box => box.innerText !== "");
        if (isDraw) {
            document.querySelector('.info').innerText = "Draw";
            gameover = true;
        }
    }
}

// Click handler function
const boxClickHandler = (event) => {
    let boxtext = event.target.querySelector('.boxtext');
    if (boxtext.innerText === '' && !gameover) {
        boxtext.innerText = text;
        text = changeTurn();
        winner();
        if (!gameover) {
            document.querySelector('.info').innerText = "Turn for " + text;
        }
    }
}

// Main function
let boxes = document.getElementsByClassName("box");

// It will return a HTML collection so we use array
Array.from(boxes).forEach(element => {
    element.addEventListener('click', boxClickHandler);
});

// Reset Button
let reset = document.getElementById('reset'); // Ensure you have the correct ID for your reset button

reset.addEventListener('click', (e) => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });

    text = "X";
    gameover = false;
    document.querySelector('.info').innerText = "Turn for " + text;

    // Reattach click event handlers to boxes
    Array.from(boxes).forEach(element => {
        element.addEventListener('click', boxClickHandler);
    });
});
