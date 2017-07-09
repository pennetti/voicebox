class Analyzer {
    constructor(corpus = {}, reach = 2) {
        this.corpus = corpus;
        this.reach = reach;

        this.frequency = this._getFrequency();
    }

    suggest(preceding = '', numberOfSuggestions = 9) {
        let suggestions = JSON.parse(JSON.stringify(this.frequency));

        const ngrams = this._getNgrams(preceding.split(' '));

        for (let reach = 0; reach < this.reach; reach++) {
            for (let j = 0; j < ngrams.length; j++) {
                const ngram = ngrams[j];
                const ngramLength = ngram.split(' ').length;
                const weight = Math.pow(10, ngramLength) / Math.pow(100, reach + 1);

                if (ngram in this.corpus) {
                    for (let word in this.corpus[ngram].after[reach]) {
                        const count = this.corpus[ngram].after[reach][word];
                        suggestions[word] += weight * count;
                    }
                }
            }
        }

        return Object.keys(suggestions)
            .sort((a, b) => suggestions[a] > suggestions[b] ? 1 : suggestions[a] < suggestions[b] ? -1 : 0)
            .reverse()
            .slice(0, numberOfSuggestions);
    }

    _getFrequency() {
        const wordCount = this._getWordCount();

        return Object.keys(this.corpus)
            .filter(ngram => ngram.split(' ').length === 1)
            .reduce((baseline, ngram) => {
                baseline[ngram] = this.corpus[ngram].count / wordCount;
                return baseline;
            }, {});
    }

    _getWordCount() {
        return Object.keys(this.corpus)
            .filter(ngram => ngram.split(' ').length === 1)
            .map(ngram => this.corpus[ngram].count)
            .reduce((a, b) => a + b, 0);
    }

    _getNgrams(sentence) {
        let ngrams = [];

        for (let i = 1; i <= Math.min(this.reach, sentence.length); i++) {
            ngrams.push(
                sentence.slice(sentence.length - i, sentence.length).join(' ')
            );
        }

        return ngrams;
    }
}

export default Analyzer;