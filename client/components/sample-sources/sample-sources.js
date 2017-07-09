import React, {Component, PropTypes} from 'react';

import './sample-sources.scss';

class SampleSources extends Component {
    render() {
        return (
            <div className="sample-sources">
                <p>try these: </p>
                {this.props.sources.map(({name, text}) =>
                    <button key={name}
                            value={text}
                            onClick={this.props.handleClick}>
                        {name}
                    </button>
                )}
            </div>
        );
    }
}

SampleSources.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired,
    handleClick: PropTypes.func.isRequired
};

export default SampleSources;