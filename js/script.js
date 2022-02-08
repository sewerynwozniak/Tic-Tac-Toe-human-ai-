class TicTacToe{
  
    constructor(){
        this.createPlayers();
        this.createBoard();
        this.selectElements();
        this.events();   

    }




    createPlayers(){
        this.circleBoard = [];
        this.timesBoard = [];
        this.currentPlayer='circle';
    }

    selectElements(){
        this.cells = document.querySelectorAll('.cell');
        this.buttonRestart = document.querySelector('.restartBtn');
        this.notification = document.querySelector('.notification');
    }

    createBoard(){
        this.board = [null, null, null, null, null, null, null, null, null];
    }

    events(){           
        this.cells.forEach(cell=>cell.addEventListener('click', this.selectCell))
        this.buttonRestart.addEventListener('click', this.restartGame)
    }

    stopGame(){
        this.cells.forEach(cell=>cell.removeEventListener('click', this.selectCell))
        this.cells.forEach(cell=>cell.classList.add('inactive'))
    }


    selectCell = (e)=>{
          
        const cellNr = e.target.dataset.cell;
        this.board[cellNr]=this.currentPlayer;
        e.target.classList.add(this.currentPlayer)
        this.currentPlayer == 'circle'? this.circleBoard.push(cellNr):this.timesBoard.push(cellNr)
        console.log(this.checkWin()) 
        this.togglePlayer()
    }


    checkWin(){
        const winningCombinations = [['0','1','2'], ['3','4','5'], ['6','7','8'], ['0','3','6'], ['1','4','7'], ['2','5','8'], ['0','4','8'], ['6','4','2']]

        const currentPlayerBoard = {
            circle: this.circleBoard,
            times: this.timesBoard
        }

         winningCombinations.forEach(arr=>{
             if(arr.every(el=>currentPlayerBoard[this.currentPlayer].includes(el))){

                 this.stopGame()
                 this.highlightWinningCombination(arr)
                 this.showNotification()
             }
         })

    }

    

    showNotification(){
        let notificationText = `${this.currentPlayer} wins!`;
        this.notification.textContent = notificationText;
        this.notification.classList.add('notification--active')
    }


    highlightWinningCombination(arr){
        arr.map(str=>Number(str)).forEach(el=>this.cells[el].classList.add('cell--win'))
    }

    clearBoardStyling(){
        this.cells.forEach(cell=>cell.classList.remove('circle', 'times', 'cell--win', 'inactive'))
        this.notification.classList.remove('notification--active')
    }

    togglePlayer(){
        this.currentPlayer == 'circle'? this.currentPlayer='times':this.currentPlayer='circle'
    }

    restartGame=()=>{
        this.createBoard()
        this.createPlayers()
        this.events()
        this.clearBoardStyling()
    }



}


const ticTacToe = new TicTacToe();


