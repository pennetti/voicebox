import React, {Component} from 'react';

import Analyzer from '../../analyzer';
import TextInput from '../text-input/text-input';
import SampleSources from '../sample-sources/sample-sources';
import {sources} from '../../fixtures/sources.json';
import './voicebox.scss';

// TODO: Add propTypes
class Voicebox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            analyzer: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*
     * @param {React.SyntheticEvent} event
     * @return {undefined}
     */
    handleChange(event) {
        this.setState({input: event.target.value});
    }

    /*
     * @param {React.SyntheticEvent} event
     * @return {Promise}
     */
    handleSubmit(event) {
        event.preventDefault();

        const {input} = this.state;

        if (!input.trim()) return;

        return this.props.addCorpus(input)
            .then(corpus => this.setState({analyzer: new Analyzer(corpus)}));
    }

    render() {
        const {analyzer, input} = this.state;

        return (
            <div className="voicebox">
                <h1>Voicebox</h1>
                <SampleSources sources={sources} handleClick={this.handleChange}/>
                <form onSubmit={this.handleSubmit}>
                    <textarea value={input} onChange={this.handleChange}/>
                    <input className="button" type="submit" value="create voice"/>
                </form>
                {analyzer ? <TextInput analyzer={analyzer}/> : null}
            </div>
        );
    }
}

export default Voicebox;