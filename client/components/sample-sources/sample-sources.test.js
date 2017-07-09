/* global describe, it, beforeEach, expect, spyOn */

import React from 'react';
import {findDOMNode} from 'react-dom';
import {
    Simulate,
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

import SampleSources from './sample-sources';

describe('SampleSource Component', function () {
    beforeEach(function () {
        this.mockHandleClick = jasmine.createSpy();
        this.sources = [{
            name: 'frodo',
            text: 'the ring bearer'
        }, {
            name: 'samwise',
            text: 'the faithful companion'
        }, {
            name: 'smeagle',
            text: 'the rascal'
        }];

        this.component = renderIntoDocument(
            <SampleSources sources={this.sources} handleClick={this.mockHandleClick}/>
        );

        this.buttons = scryRenderedDOMComponentsWithTag(this.component, 'button');
    });

    it('renders a button for each source in sources.json', function () {
        expect(this.buttons.length).toEqual(this.sources.length);
    });

    it('passes the source text to the handle click callback on click', function () {
        const buttonValue = findDOMNode(this.buttons[0]).value;

        Simulate.click(this.buttons[0]);

        expect(buttonValue).toEqual(this.sources[0].text);
        expect(this.mockHandleClick).toHaveBeenCalledTimes(1);
    });
});