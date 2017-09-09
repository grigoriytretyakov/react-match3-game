import React from 'react';
import ReactDOM from 'react-dom';


class HiView extends React.Component {
    render() {
        return <m>Game will be here soon!</m>;
    }
}

ReactDOM.render(
    <HiView />,
    document.getElementById('game')
)
