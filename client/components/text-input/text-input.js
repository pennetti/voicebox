import React, {Component} from 'react';

import Composition from '../../composition';
import './text-input.scss';

// TODO: Separate text input component from composition
// TODO: Add propTypes
class TextInput extends Component {
    constructor(props) {
        super(props);

        this.composition = new Composition();

        this.state = {
            deleteDisabled: true,
            endSentenceDisabled: true,
            composition: this.composition.getText(),
            suggestions: this.props.analyzer.suggest(
                this.composition.getCurrentSentenceText()
            )
        };

        this.endSentence = this.endSentence.bind(this);
        this.removeText = this.removeText.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /*
     * @param {object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            suggestions: nextProps.analyzer.suggest(
                this.composition.getCurrentSentenceText()
            )
        });
    }

    endSentence() {
        this.composition.endCurrentSentence();

        this.setState({
            endSentenceDisabled: true,
            composition: this.composition.getText(),
            suggestions: this.props.analyzer.suggest(
                this.composition.getCurrentSentenceText()
            )
        });
    }

    removeText() {
        this.composition.removeText();

        this.setState({
            deleteDisabled: this.composition.isEmpty(),
            endSentenceDisabled: this.composition.isEmpty(),
            composition: this.composition.getText(),
            suggestions: this.props.analyzer.suggest(
                this.composition.getCurrentSentenceText()
            )
        });
    }

    /*
     * @param {React.SyntheticEvent} suggestion
     * @return {undefined}
     */
    handleClick(event) {
        this.composition.addText(event.target.value);

        this.setState({
            deleteDisabled: false,
            endSentenceDisabled: false,
            composition: this.composition.getText(),
            suggestions: this.props.analyzer.suggest(
                this.composition.getCurrentSentenceText()
            )
        });
    }

    render() {
        const {
            deleteDisabled,
            endSentenceDisabled,
            composition,
            suggestions
        } = this.state;

        return (
            <div className="text-input">
                <textarea value={composition} readOnly/>
                {suggestions.map(suggestion => (
                    <button key={suggestion}
                            value={suggestion}
                            className="suggestion"
                            onClick={this.handleClick}>
                        {suggestion}
                    </button>
                ))}
                <button key="end-sentence"
                        className="end-sentence"
                        disabled={endSentenceDisabled}
                        onClick={this.endSentence}>
                    .
                </button>
                <button key="delete"
                        className="delete"
                        disabled={deleteDisabled}
                        onClick={this.removeText}>
                    delete
                </button>
            </div>
        );
    }
}

export default TextInput;