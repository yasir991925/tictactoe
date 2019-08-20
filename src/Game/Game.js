import React , { Component } from 'react'
import Board from './Board'

class Game extends Component{
    constructor(props){
        super(props)
        this.state = {
            history: [{squares: Array(9).fill(null)}],
            isNext: true,
            stepNumber: 0
        }
        changingCrusor(document.getElementById("mouse"))
    }

    handleCLick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if(calculateWin(squares) || squares[i]){
            return
        }
        squares[i] = this.state.isNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{squares:squares}]),
            isNext: !this.state.isNext,
            stepNumber: history.length
        })
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            isNext: (step % 2) === 0
        })
    }

    render(){
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const squares = current.squares
        const winner = calculateWin(squares)
        const moves = history.map((step,move)=>{
            const desc = move ? 'Go to move' + move : 'Go to Game Start'
            return (<li key={move}><button onClick={()=>this.jumpTo(move)}>{desc}</button></li>)
        })
        let status
        if(winner){
            status = "Winner " + winner
        } else {
            status = "Next player " + (this.state.isNext ? 'X' : 'O')
            changingCrusorState(this.state.isNext ? 'X' : 'O')
        }
        return(
            <div className="game">
                <h1>Tic Tac Toe</h1>
                <div>{status}</div>
                <div className="game-board">
                    <Board 
                        squares={squares}
                        onClick = {(i)=>this.handleCLick(i)}            
                    />
                </div>
                <div className="game-info">
                <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWin(squares){
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    for (let i = 0; i< winConditions.length; i++){
        const [a,b,c] = winConditions[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]
        }
    }
    return null
}

function changingCrusor(mouse){
    document.onmousemove = handleMouseMove
    function handleMouseMove(event){
        event = event || window.event
        mouse.style.transform = `translate(${event.clientX}px,${event.clientY}px)`
    }
}

function changingCrusorState(turn){
    document.getElementById('mouse').innerHTML = turn
}

export default Game