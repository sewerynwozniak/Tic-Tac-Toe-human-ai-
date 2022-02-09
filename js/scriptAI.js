class TicTacToe{
  
    constructor(){
        this.createPlayers();
        this.createBoard();
        this.selectElements();
        this.events();   
        this.winningCells=null;
    }


    createPlayers(){
        this.circleBoard = [];
        this.timesBoard = [];
        this.currentPlayer='circle';
    }

    computerMove(){
        let bestScore = -1;
        let index;
       

        for(let i=0;i<this.board.length;i++){

            if(this.board[i]==null){
                this.board[i]='times'
                this.timesBoard.push(i.toString())
                let xScore = this.ifCanWin()
                if(xScore> bestScore){
                    bestScore=xScore;
                    index=i
                }
                this.board[i]=null
                this.timesBoard.pop()

                this.togglePlayer()
                this.board[i]='cicrcle'
                this.circleBoard.push(i.toString())
                let oScore = this.ifCanWin()
                if(oScore> bestScore){
                    bestScore=oScore;
                    index=i
                }
                this.board[i]=null
                this.circleBoard.pop()
                this.togglePlayer()
            }

            
        }

        this.board[index] = 'times'
        this.timesBoard.push(index.toString())
        this.cells[index].classList.add('times')



        if(this.checkWin()){
            this.stopGame()
            this.highlightWinningCombination()
            this.showNotification(this.checkWin())
            return
        }
        this.togglePlayer()

    }


    ifCanWin(){
        const score ={
            'times':10,
            'circle':5,
            'tie':0,
            null:0
        }

        

        return score[this.checkWin()]

    }





    checkWin(){
        const winningCombinations = [['0','1','2'], ['3','4','5'], ['6','7','8'], ['0','3','6'], ['1','4','7'], ['2','5','8'], ['0','4','8'], ['6','4','2']]


        const currentPlayerBoard = {
            circle: this.circleBoard,
            times: this.timesBoard
        }


        for( let arr of winningCombinations){
            if(arr.every(el=>currentPlayerBoard[this.currentPlayer].includes(el))){
                this.winningCells=arr;
               return this.currentPlayer;
            }  
        }

  

        if((this.board.filter(el=>el===null).length)==0){
            return 'tie';
        }

        return null


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
        this.circleBoard.push(cellNr);
        
        if(this.checkWin()){
            this.stopGame()
            this.showNotification(this.checkWin())
            return
        }    
        this.togglePlayer()
        this.computerMove()

    }



    showNotification(winner){
        let notificationText = winner=='tie'?'Tie!':`${winner} wins!`;
        this.notification.textContent = notificationText;
        this.notification.classList.add('notification--active')
    }


    highlightWinningCombination(){
        if(this.winningCells){
            this.winningCells.map(str=>Number(str)).forEach(el=>this.cells[el].classList.add('cell--win'))
        }     
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


