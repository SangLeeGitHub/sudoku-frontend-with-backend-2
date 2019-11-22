import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class Square extends Component {

  render() {
    let idnum = "id" + this.props.id;
    let selectedBGcolor = this.props.selected ? {backgroundColor: "Pink"} : {backgroundColor: "White"};

    return (
      <button 
        className="square" onClick={this.props.onClick} id={idnum} style={selectedBGcolor}>
        {this.props.value}
      </button>
    );
  }
}

export class Board extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
          cell: Array(81).fill(null),
          select: [],
          loading: true,
      }
  }

  handleClick(i) {

    let sel = this.state.select;

    if (sel.includes(i)) {
      const filtered = sel.filter(item => item !== i)
      sel = filtered;
    }
    else 
      sel.push(i);

    this.setState({select: sel});

    fetch('/sudoku/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sel),
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(body) {
      console.log(body);
    });
  }
  
  renderSquare(i, idx) {
    let sel = false;
    if (this.state.select === undefined) sel = false;
    else sel = this.state.select.includes(idx);

    return (
      <span key={idx}>
        <Square 
          value={i}
          id={idx}
          selected={sel}
          onClick={() => this.handleClick(idx)}
        />
      </span>
    );
  }

  createLine(i) {
    let row = [];

    for (let j = 0; j < 9; j++) {

        row.push(this.renderSquare(this.state.cell[(i * 9) + j] + 1, (i * 9) + j));
    }

    return row;
  }

  reload() {

    window.location.reload();
  }

  //
  // Request a Sudoku array to the server.
  //
  componentDidMount() {
    fetch('/sudoku/board')
    .then(res => res.json())
    .then((data) => {
      this.setState({ cell: data, loading: false })
    })
    .catch(console.log)
  }

  render() {
    const { loading } = this.state;
    let warn = this.state.select.length < 4 ? {display: "none"} : {};

    if (loading) {
      return (<div><FontAwesomeIcon icon={faSync} size="10x" spin /></div>)
    } 
    else {
      return (
        <div className="game-box">
          <div className="board-row">
            {this.createLine(0)}
          </div>
          <div className="board-row">
            {this.createLine(1)}
          </div>
          <div className="board-row">
            {this.createLine(2)}
          </div>
          <div className="board-row">
            {this.createLine(3)}
          </div>
          <div className="board-row">
            {this.createLine(4)}
          </div>
          <div className="board-row">
            {this.createLine(5)}
          </div>
          <div className="board-row">
            {this.createLine(6)}
          </div>
          <div className="board-row">
            {this.createLine(7)}
          </div>
          <div className="board-row">
            {this.createLine(8)}
          </div>
          <br />
            <button className="button" onClick={this.reload}>Reload</button>&nbsp;
          <br /><br />
          <div style={warn}> 
            If you select more than 4 cells,<br />you could need patience a bit.
          </div>
        </div>

      )
    }
  }
}

class App extends Component {

  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    );
  }
}

export default App;