/* global describe, it, beforeEach, expect */

import Analyzer from '../analyzer';

import smallCorpus from './fixtures/smallCorpus';
import frequentWordsSentenceStart from './fixtures/frequent-words-sentence-start';
import consecutiveWordsOverFrequentWords from './fixtures/consecutive-words-over-frequent-words';
import largerNgramsFavored from './fixtures/larger-ngrams-favored';

describe('Analyzer', function () {
    describe('small corpus', function () {
        describe('#suggest', function () {
            it('returns frequent consecutive words', function () {
                const analyzer = new Analyzer(smallCorpus);

                let suggestion = analyzer.suggest('', 2);
                expect(suggestion).toContain('a');
                expect(suggestion).toContain('penny');

                suggestion = analyzer.suggest('a', 2);
                expect(suggestion).toContain('penny');

                suggestion = analyzer.suggest('a penny', 2);
                expect(suggestion).toEqual(['saved', 'earned']);
            });

            it('returns most frequent words for sentence start',function () {
                const analyzer = new Analyzer(frequentWordsSentenceStart);

                let suggestions = analyzer.suggest('', 2);
                expect(suggestions).toContain('a', 'b');
            });

            it('returns consecutive words over frequent words', function () {
                const analyzer = new Analyzer(consecutiveWordsOverFrequentWords)

                let suggestions = analyzer.suggest('b', 2);
                expect(suggestions).toContain('c');

                suggestions = analyzer.suggest('b c', 2);
                expect(suggestions).toContain('d');
            });

            it('returns larger ngram match', function () {
                const analyzer = new Analyzer(largerNgramsFavored);

                let suggestions = analyzer.suggest('a b', 2);
                expect(suggestions.sort()).toEqual(['c', 'd']);
            });
        });
    });
});