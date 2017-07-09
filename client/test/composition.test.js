/* global describe, beforeEach, it, expect */

import Composition from '../composition';

describe('Composition', function () {
    let composition;

    beforeEach(function () {
        composition = new Composition();
    });

    describe('#addText', function () {
        it('appends a space and text to the composition', function () {
            composition.addText('foo');
            expect(composition.getText()).toEqual('foo');
            composition.addText('bar');
            expect(composition.getText()).toEqual('foo bar');
        });
    });

    describe('#endCurrentSentence', function () {
        it('appends a period to the current text', function () {
            composition.addText('foo');
            composition.endCurrentSentence();
            expect(composition.getText()).toEqual('foo.');
        });

        it('resets the current sentence text', function () {
            composition.addText('foo bar');
            expect(composition.getCurrentSentenceText()).toEqual('foo bar');
            composition.endCurrentSentence();

            composition.addText('baz');
            expect(composition.getCurrentSentenceText()).toEqual('baz');
        });
    });

    describe('#getCurrentSentenceText', function () {
        it('returns text since beginning or last end of sentence', function () {
            composition.addText('foo bar');
            expect(composition.getCurrentSentenceText()).toEqual('foo bar');

            composition.endCurrentSentence();

            composition.addText('baz');
            expect(composition.getCurrentSentenceText()).toEqual('baz');
        });
    });

    describe('#getText', function () {
        it('returns full composition text', function () {
            composition.addText('foo bar');
            composition.endCurrentSentence();
            composition.addText('baz');
            expect(composition.getText()).toEqual('foo bar. baz');
        });
    });

    describe('#removeText', function () {
        it('removes text and space since last space from composition', function () {
            composition.addText('foo bar');
            composition.removeText();
            expect(composition.getText()).toEqual('foo');
        });

        it('removes period if previous text is period', function () {
            composition.addText('foo bar. one two.');
            composition.removeText();
            expect(composition.getText()).toEqual('foo bar. one two');
        });
    });

    describe('#isEmpty', function () {
        it('returns true if composition is an empty string', function () {
            expect(composition.isEmpty()).toEqual(true);
        });

        it('returns false if composition is not an empty string', function () {
            composition.addText('foo bar.');
            expect(composition.isEmpty()).toEqual(false);
        });
    });
});