let activePlayer = 'X';
let selectedSquares = [];
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("./images/x.png")';
        } else {
            select.style.backgroundImage = 'url("./images/o.png")';
        }

        selectedSquares.push(squareNumber + activePlayer);
        checkWinConditions() ;
        if (activePlayer === 'X') {
            activePlayer = 'O';
        } else {
            activePlayer = 'X';
        }
        audio( './media/place.mp3');
        if(activePlayer === 'O') {
            disableClick();
            setTimeout (function () { computersTurn(); }, 1000)
        }
        return true;
    }
    function computersTurn() {
        let success = false;
        let pickASquare;
        while(!success) {
            pickASquare = String(Math.floor(Math.random() * 9));
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                success = true;
            };
        }
    }
}
function checkWinConditions() {
        if (arrayIncludes('0X', '1X', '2X')) {drawWinLine(17, 33, 186, 33)}
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine(17, 101, 186, 101)}
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine(17, 169, 186, 169)}
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(33, 17, 33, 186)}
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(101, 17, 101, 186)}
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine(169, 17, 169, 186)}
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(33, 169, 170, 30)}
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(33, 33, 173, 173)}
    else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(17, 33, 186, 33)}
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(17, 101, 186, 101)}
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(17, 169, 186, 169)}
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(33, 17, 33, 186)}
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(101, 17, 101, 186)}
    else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine(169, 17, 169, 186)}
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(33, 169, 170, 30)}
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(33, 33, 173, 173)}
    else if (selectedSquares.length >= 9) {
        audio('./media/tie.mp3');
        setTimeout(function () { resetGame(); }, 1000);
    }
    function arrayIncludes(squareA, squareB, squareC) {
        const a= selectedSquares.includes(squareA)
        const b= selectedSquares.includes(squareB)
        const c= selectedSquares.includes(squareC)
        if (a === true && b === true && c === true) {return true}
    }
}
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}
function audio (audioURL) {
    let audio = new Audio (audioURL);
    audio.play();
}
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas= document.getElementById('win-lines')
    const c= canvas.getContext('2d');
    let x1= coordX1,
        y1= coordY1,
        x2= coordX2,
        y2= coordY2,
        x= x1,
        y= y1;
    function animateLineDrawing() {
        const animationLoop= requestAnimationFrame(animateLineDrawing);
        c.clearRect(0,0,100,100)
        c.beginPath();
        c.moveTo(x1,y1)
        c.lineTo(x,y)
        c.lineWidth=10;
        c.strokeStyle='rgba(70,255,33,.8)';
        c.stroke();
        if (x1 <= x2 && y1 <=y2) {
            if (x < x2) {x += 10; }
            if (y <y2) {y += 10; }
            if (x >= x2 && y >=y2) {cancelAnimationFrame(animationLoop);}
        }
        if (x1 <=x2 && y1 >= y2) {
            if (x<x2) {x += 10;}
            if (y>y2) {y -= 10;}
            if (x>=x2 && y <=y2) {cancelAnimationFrame(animationLoop); }
        }
    }
function clear() {
        const animationLoop= requestAnimationFrame(clear);
        c.clearRect(0,0,100,100);
        cancelAnimationFrame(animationLoop);
    }
    disableClick();
    audio('./media/winGame.mp3');
    animateLineDrawing();
    setTimeout (function () {clear(); resetGame(); }, 1000);
}
function resetGame() {
    for (let i=0; i<9; i++) {
        let square= document.getElementById(String(i))
            square.style.backgroundImage=''
    }
    selectedSquares=[];
}
