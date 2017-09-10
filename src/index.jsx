import React from 'react';
import ReactDOM from 'react-dom';


class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <img src="/cats.png" alt="Котики" style={{maxWidth: '100%'}} />
            </div>
        )
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root')
)
