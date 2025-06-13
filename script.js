const GameBoard = (function () { //IIFE (immediately invoked function expression) assigned to GameBoard object
    const board = ['', '', '', '', '', '', '', '', ''];

    function getBoard() {
        return [...board]; 
        //... used to return copy of board; 
        //outside code cannot mutate original board
    }

    function resetBoard() {
        board.fill('');
    }

    function markCell(index, mark) {
        if (board[index] == '') {
            board[index] = mark;
        }
        //if cell (board[index]) is empty, mark it
    }

    return {getBoard, resetBoard, markCell};
})(); // () used to immediately run function and returns object with these methods

function Player(name, mark) {
    return {name, mark}; 
    //return an object
    //used like: const Joshua = Player('Joshua', 'X');
    //so now Joshua is an object
}

const GameController = (function () {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        //is currentPlayer player1? if so, then switch to player2
        //if not, switch to player1
    }

    function checkWin() {
        const board = GameBoard.getBoard();
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6] //diagonals
        ];

        return wins.some(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
        //iterates over each array in wins
        //[a,b,c] destructures each win array
        //return true if any of the win arrays match what's on the board
        //.some iterates over array and returns true based on function inside
    }

        let isGameOver = false;

        const playRound = (index) => { //this function is called each time a click is deteced on the board
            if (isGameOver || GameBoard.getBoard()[index] !== '') return;
            //checks if game is already over, or if spot is already marked

            GameBoard.markCell(index, currentPlayer.mark);
            //takes index from event listener and marks the correct cell
            DisplayController.render();

            if (checkWin()) {
                console.log(`${currentPlayer.name} wins!`);
                isGameOver = true;
                return;
            }

            GameController.switchPlayer();
        }

    return {playRound, switchPlayer}

})();

const DisplayController = (function () {
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            GameController.playRound(index);
        });
    });

    const render = () => {
        const board = GameBoard.getBoard();
        cells.forEach((cell, i ) => {
            cell.textContent = board[i];
        });
    }

    return {render};
})();