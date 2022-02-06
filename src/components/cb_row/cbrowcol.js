import React, { Component} from 'react';
import './../../App.css';

class CbRowCol extends Component {

    render() {
        return (
            <div>
                <ul className="cb-row">
                    {this.getChessBoard()}
                </ul>
            </div>
        );
    }

    getChessBoard() {
        let cheBoH = 400;
        let squHeight = 20;
    
        let numLength = cheBoH / squHeight;
        let rowArr = [];
        let colArr = [];
        for (let i = 0; i < numLength; i++) {
            let newclo = i;
            colArr.push(newclo);
            for (let j = 0; j < numLength; j++) {
                let newrow = j;
                rowArr.push(newrow);

            }
        }

        return colArr.map(column => rowArr.map(row => 
            <li 
                // key= {column*row}
                className='cb-r-square' 
                style={{
                        'top':row*20, 
                        'background': column%2 ===1 ? row%2 ===0 ? '#DCDCDC': '#FFFFE0' : row%2 ===1 ? '#DCDCDC ': '#FFFFE0', 
                        'left': column*20 +'px'
                        }}
            >
            </li>))
    }
}

export default CbRowCol;
// key={row*column}