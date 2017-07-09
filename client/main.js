import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import Voicebox from './components/voicebox/voicebox';

import addCorpus from './api';

import './styles/main.scss';

class App extends Component {
    render() {
        return (
            <Voicebox addCorpus={addCorpus}/>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.root'));