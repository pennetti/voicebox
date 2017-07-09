/* global describe, it, beforeEach, expect, spyOn */

import React from 'react';
import {
    Simulate,
    renderIntoDocument,
    findRenderedComponentWithType,
    findRenderedDOMComponentWithTag,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import Voicebox from './voicebox';
import TextInput from '../text-input/text-input';
import Analyzer from '../../analyzer';
import smallCorpus from '../../test/fixtures/smallCorpus';

// TODO: Find a better solution for testing asynchronous form submission
describe('Voicebox Component', function () {
    beforeEach(function () {
        this.mockAddCorpus = jasmine.createSpy().and.returnValue(
            new Promise(resolve => resolve(smallCorpus))
        );

        this.component = renderIntoDocument(
            <Voicebox addCorpus={this.mockAddCorpus}/>
        );

        this.input = findRenderedDOMComponentWithTag(this.component, 'textarea');
        this.form = findRenderedDOMComponentWithTag(this.component, 'form');
    });

    it('calls API with input text on submit', function () {
        Simulate.change(this.input, {target: {value: 'some text'}});
        Simulate.submit(this.form);

        expect(this.mockAddCorpus).toHaveBeenCalled();
        expect(this.mockAddCorpus).toHaveBeenCalledWith('some text');
    });

    it('does not call API with input on submit if input is an empty string', function () {
        Simulate.change(this.input, {target: {value: ''}});
        Simulate.submit(this.form);

        expect(this.mockAddCorpus).not.toHaveBeenCalled();
    });

    it('does not call API with input on submit if input is whitespace', function () {
        Simulate.change(this.input, {target: {value: '   '}});
        Simulate.submit(this.form);

        expect(this.mockAddCorpus).not.toHaveBeenCalled();
    });

    it('renders a new component after API call', function (done) {
        const analyzerComponent = scryRenderedDOMComponentsWithClass(
            this.component,
            'analyzer'
        );
        expect(analyzerComponent.length).toEqual(0);

        setTimeout(() => {
            expect(this.component.state.analyzer).toEqual(new Analyzer(smallCorpus));
            const analyzer = findRenderedComponentWithType(
                this.component,
                TextInput
            );
            expect(analyzer).not.toBeNull();
            expect(analyzer.props.analyzer).toEqual(new Analyzer(smallCorpus));
            done();
        }, 10);

        Simulate.change(this.input, {target: {value: 'some text'}});
        Simulate.submit(this.form);
    });
});
