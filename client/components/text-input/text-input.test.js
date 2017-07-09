/* global describe, beforeEach, it, expect, spyOn */

import React from 'react';
import {render} from 'react-dom'
import {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithTag,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import Analyzer from '../../analyzer';
import TextInput from './text-input';

// TODO: Create helper for clicking on updated this.suggestionButtons()
describe('TextInput Component', function () {
    beforeEach(function () {
        this.mockAnalyzer = new Analyzer();
        spyOn(this.mockAnalyzer, 'suggest').and.callFake(input => ({
                '': ['some', 'words', 'here'],
                'some': ['other', 'things', 'there'],
                'some things': ['even', 'more', 'stuff'],
                'some there': ['even', 'more', 'stuff'],
                'some other': ['even', 'more', 'stuff']
            }[input])
        );

        this.node = document.createElement('div');
        this.component =
            render(<TextInput analyzer={this.mockAnalyzer}/>, this.node);

        this.composition =
            findRenderedDOMComponentWithTag(this.component, 'textarea');
        this.suggestionButtons = () =>
            scryRenderedDOMComponentsWithClass(this.component, 'suggestion');
        this.endSentenceButton =
            findRenderedDOMComponentWithClass(this.component, 'end-sentence');
        this.deleteButton =
            findRenderedDOMComponentWithClass(this.component, 'delete');
    });

    it('calls the Analyzer on initialization', function () {
        expect(this.mockAnalyzer.suggest).toHaveBeenCalledTimes(1);
    });

    it('creates a button for each word returned from the Analyzer', function () {
        expect(this.suggestionButtons().length).toEqual(3);
    });

    it('appends a word to the composition on button click', function () {
        const suggestionButtons = this.suggestionButtons();
        Simulate.click(suggestionButtons[0]);
        expect(this.composition.value).toEqual(suggestionButtons[0].value);

        const updatedSuggestionButtons = this.suggestionButtons();
        Simulate.click(updatedSuggestionButtons[0]);
        expect(this.composition.value)
            .toEqual(suggestionButtons[0].value + ' ' + updatedSuggestionButtons[0].value);
    });

    it('updates suggestion buttons on suggestion button click', function () {
        const suggestionButtons = this.suggestionButtons();
        const suggestions = suggestionButtons.map(button => button.value);
        expect(suggestions).toEqual(['some', 'words', 'here']);

        Simulate.click(suggestionButtons[0]);
        expect(this.mockAnalyzer.suggest)
            .toHaveBeenCalledWith(suggestionButtons[0].value);

        const updatedSuggestionsButtons = this.suggestionButtons();
        const updatedButtonValues = updatedSuggestionsButtons.map(button => button.value);
        expect(updatedButtonValues).toEqual(['other', 'things', 'there']);

        Simulate.click(updatedSuggestionsButtons[0]);
        expect(this.mockAnalyzer.suggest).toHaveBeenCalledWith('some other');
    });

    it('updates suggestion buttons on new analyzer', function () {
        const buttonValues = this.suggestionButtons().map(button => button.value);
        expect(buttonValues).toEqual(['some', 'words', 'here']);

        const mockUpdatedAnalyzer = new Analyzer();
        spyOn(mockUpdatedAnalyzer, 'suggest').and.returnValue(['high', 'on', 'fire']);
        render(<TextInput analyzer={mockUpdatedAnalyzer}/>, this.node);

        const updatedSuggestionButtons = this.suggestionButtons();
        const updatedSuggestions = updatedSuggestionButtons.map(button => button.value);
        expect(updatedSuggestions).toEqual(['high', 'on', 'fire']);

    });

    describe('endCurrentSentence button', function () {
        it('renders a button to end a sentence', function () {
            Simulate.click(this.suggestionButtons()[0]);
            Simulate.click(this.endSentenceButton);

            expect(this.composition.value).toEqual('some.');
            expect(this.mockAnalyzer.suggest).toHaveBeenCalledWith('');

            const updatedSuggestionButtons = this.suggestionButtons();
            Simulate.click(updatedSuggestionButtons[0]);
            expect(this.composition.value).toEqual('some. some');
        });

        it('is disabled if composition is empty', function () {
            expect(this.endSentenceButton.disabled).toBeTruthy();

            Simulate.click(this.suggestionButtons()[0]);
            expect(this.endSentenceButton.disabled).toBeFalsy();

            Simulate.click(this.deleteButton);
            expect(this.endSentenceButton.disabled).toBeTruthy();
        });

        it('is disabled if previous entry is period', function () {
            Simulate.click(this.suggestionButtons()[0]);
            expect(this.endSentenceButton.disabled).toBeFalsy();

            Simulate.click(this.endSentenceButton);
            expect(this.endSentenceButton.disabled).toBeTruthy();
        });
    });

    describe('delete button', function () {
        it('removes a word', function () {
            Simulate.click(this.suggestionButtons()[0]);

            let updatedSuggestionButtons = this.suggestionButtons();
            Simulate.click(updatedSuggestionButtons[0]);
            Simulate.click(this.endSentenceButton);

            updatedSuggestionButtons = this.suggestionButtons();
            Simulate.click(updatedSuggestionButtons[0]);
            expect(this.composition.value).toEqual('some other. some');

            Simulate.click(this.deleteButton);
            expect(this.composition.value).toEqual('some other.');
            expect(this.mockAnalyzer.suggest).toHaveBeenCalledWith('');

            Simulate.click(this.deleteButton);
            expect(this.composition.value).toEqual('some other');
            expect(this.mockAnalyzer.suggest).toHaveBeenCalledWith('some other');

            Simulate.click(this.deleteButton);
            expect(this.composition.value).toEqual('some');
            expect(this.mockAnalyzer.suggest).toHaveBeenCalledWith('some');
        });

        it('is disabled if composition is empty', function () {
            expect(this.deleteButton.disabled).toBeTruthy();

            Simulate.click(this.suggestionButtons()[0]);
            expect(this.endSentenceButton.disabled).toBeFalsy();

            Simulate.click(this.deleteButton);
            expect(this.endSentenceButton.disabled).toBeTruthy();
        });
    });
});
