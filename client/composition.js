class Composition {
    /*
     * @param {string} text - Initial composition text
     */
    constructor(text = '') {
        this.text = text;
    }

    /*
     * @return {string}
     */
    getText() {
        return this.text;
    }

    /*
     * @returns {string}
     */
    getCurrentSentenceText() {
        if (this.text.lastIndexOf('.') === this.text.length - 1) return '';

        return this.text.split('. ').pop();
    }

    /*
     * @returns {boolean}
     */
    isEmpty() {
        return this.text === '';
    }

    /*
     * @param {string} text - Text to append to the composition
     * @returns {this}
     */
    addText(text) {
        if (this.text.length > 0) this.text += ' ';

        this.text += text;

        return this;
    }

    /*
     * @returns {this}
     */
    endCurrentSentence() {
        this.text += '.';

        return this;
    }

    /*
     * @returns {this}
     */
    removeText() {
        this.text = this.text.substring(0, Math.max(
            this.text.lastIndexOf('.'),
            this.text.lastIndexOf(' '))
        );

        return this;
    }
}

export default Composition;