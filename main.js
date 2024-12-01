const container=document.querySelector(".container");
const notification=document.querySelector(".notification");
const replayBtn=document.querySelector(".replay");
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
    
        const printWinner = function(){ 
            
            if(winner){
                notification.textContent=`Game Over. Winner is ${winner}`
                console.log(`Game Over. Winner is ${winner}`)
            }else{
                notification.textContent = "It's a Tie!";
                console.log(`it's a tie`)
            }
            
        }
        const changeTurn=function(){
            console.log(`Before change: currentTurn is ${currentTurn.symbol}`);
            currentTurn = currentTurn === x ? o : x;
            //why do i need to define game.currentTurn here and why i can do this!??!
            game.currentTurn=currentTurn;
            console.log(`After change: currentTurn is ${currentTurn.symbol}`);
        }
        const printNextTurn=function(){
            let nextTurn=currentTurn===x?o:x;
            notification.textContent=`Next Turn is ${nextTurn.symbol}`
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
            const isBoardFull = board.every(row => 
                row.every(cell => cell !== null)
            );
        
            if (isBoardFull && !winner) {
                gameOver = true;
                winner = "";
                console.log("It's a Tie!");
                return true;
            }
            return false;
        }
        return{x,o,gameOver,currentTurn,changeTurn,finishGame,decideWin,printWinner,printNextTurn};
    }
    const displayGame=function(){    
        for(let i=0;i<3;i++){
            const row=document.createElement("div");
            row.classList.add("grid-col");
            for(let j=0;j<3;j++){
                const grid = document.createElement("button");
                grid.classList.add("symbol");
                grid.classList.add("grid");
                row.appendChild(grid);
                grid.textContent="";
                grid.addEventListener('click',function(){
                    if(grid.textContent===""){
                        grid.textContent=game.currentTurn.symbol;
                        playGame(j,i)
                    }else{
                        notification.textContent="This cell is already occupied!"
                    }                 
                })
            }
            container.appendChild(row);
        }
        replayBtn.addEventListener('click',replayGame);    
    } 
    const replayGame=function(){
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        } 
        displayGame();
        notification.textContent="Player X's turn";
       
        board=createBoard();
        game=createGame();
        

    }
   
    return{createBoard,createPlayer,createGame,displayGame,replayGame}
})();

let game=gameModulePattern.createGame();
let board=gameModulePattern.createBoard();
gameModulePattern.displayGame();



function playGame(row,col){
    
    console.log(`Current turn before change in playgame: ${game.currentTurn.symbol}`);
    if (game.gameOver) {
        notification.textContent=`It's a tie`
        console.log("The game is already over!");
        return;
    }
    if (row == null || col == null || row < 0 || row > 2 || col < 0 || col > 2) {
        console.log("Invalid move. Provide valid row and column indices (0-2).");
        return;
    }
    console.log(`Player ${game.currentTurn.symbol}'s turn.`);
    game.printNextTurn();
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
console.log("let's play a game");


