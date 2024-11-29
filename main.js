const container=document.querySelector(".container");

const gameModulePattern=(function(){
    const createBoard=function(){
        return[
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
    };
    const createPlayer=function(symbol){
        const move = (row, col) => {
            if (board[row][col] === null) {
                board[row][col] = symbol;
                return true;
            } else {
                console.log("This cell is already occupied!");
                return false;
            }
        };
        return{symbol,move};
    }
    const createGame=function (){
        const x=createPlayer("X");
        const o=createPlayer("O");
        let currentTurn=x;
        let gameOver=false;
        let winner="";
    
        const printWinner = () => console.log(`Game Over. Winner is ${winner}`);
        const changeTurn=function(){
            console.log(`Before change: currentTurn is ${currentTurn.symbol}`);
            currentTurn = currentTurn === x ? o : x;
            //why do i need to define game.currentTurn here and why i can do this!??!
            game.currentTurn=currentTurn;
            console.log(`After change: currentTurn is ${currentTurn.symbol}`);
        }

        const finishGame=()=>gameOver=true;
        const decideWin=function(){
            for(let row=0;row<board.length;row++){
                if (board[row][0] === x.symbol && board[row][1] === x.symbol && board[row][2] ===x.symbol) {
                    finishGame();
                    winner="X"
                    return true; 
                }
                if (board[row][0] === o.symbol && board[row][1] === o.symbol && board[row][2] ===o.symbol) {
                    finishGame();
                    winner="O"
                    return true; 
                }
            }
            for(let col=0;col<board.length;col++){
                if(board[0][col]==x.symbol&&board[1][col]==x.symbol&&board[2][col]==x.symbol){
                    finishGame();
                    winner="X"
                    return true;
                }
                if(board[0][col]==o.symbol&&board[1][col]==o.symbol&&board[2][col]==o.symbol){
                    finishGame();
                    winner="O"
                    return true;
                }
            }
            if(board[0][0]==x.symbol&&board[1][1]==x.symbol&&board[2][2]==x.symbol){
                finishGame();
                winner="X";
                return true;
            }
            if(board[0][0]==o.symbol&&board[1][1]==o.symbol&&board[2][2]==o.symbol){
                finishGame();
                winner="O";
                return true;
            }
            if(board[0][2]==x.symbol&&board[1][1]==x.symbol&&board[2][0]==x.symbol){
                finishGame();
                winner="X"
                return true;
            }
            if(board[0][2]==o.symbol&&board[1][1]==o.symbol&&board[2][0]==o.symbol){
                finishGame();
                winner="O"
                return true;
            }
            return false;
        }
        return{x,o,gameOver,currentTurn,changeTurn,finishGame,decideWin,printWinner};
    }
    const displayGame=function(){    
        for(let i=0;i<3;i++){
            const row=document.createElement("div");
            row.classList.add("grid-col");
            for(let j=0;j<3;j++){
                const grid = document.createElement("button");
                grid.addEventListener('click',function(){
                    grid.textContent=game.currentTurn.symbol;
                    grid.classList.add("symbol");
                    playGame(j,i)
                })
                grid.classList.add("grid");
                row.appendChild(grid);
            }
            container.appendChild(row);
        }    
    } 
    return{createBoard,createPlayer,createGame,displayGame}
})();

const game=gameModulePattern.createGame();
const board=gameModulePattern.createBoard();
const display=gameModulePattern.displayGame();



function playGame(row,col){
    
    console.log(`Current turn before change in playgame: ${game.currentTurn.symbol}`);
    if (game.gameOver) {
        console.log("The game is already over!");
        return;
    }
    if (row == null || col == null || row < 0 || row > 2 || col < 0 || col > 2) {
        console.log("Invalid move. Provide valid row and column indices (0-2).");
        return;
    }
    console.log(`Player ${game.currentTurn.symbol}'s turn.`);
    if (game.currentTurn.move(row, col)) {
        if (game.decideWin()) {
            game.printWinner();
            return board;
        }

        // ONLY Change turn if move was successful!
        game.changeTurn();
        console.log(`Current turn after change in playgames: ${game.currentTurn.symbol}`);
        console.log("Next turn.");
        console.log(board);
        return board;
    }


    return board;
  
}
console.log("let play a game");


