from __future__ import absolute_import

import string
import re

from .ngram import Ngram


class Corpus(object):

    def __init__(self, text, max_ngram_size=2, hindsight=2, sentence_start_token='^^'):
        self.text = text
        self.max_ngram_size = max_ngram_size
        self.hindsight = hindsight
        self.sentence_start_token = sentence_start_token

        self.max_reach = 2

        self.wordcount = 0
        self.tree = {}
        self.build()

    def build(self):
        sentences = self.get_sentences()

        for sentence in sentences:
            sentence = [self.sentence_start_token] + sentence

            for ngram_size in range(1, self.max_ngram_size + 1):
                for start in range(1, len(sentence)):
                    end = start + ngram_size

                    if start >= 0 and end < len(sentence) + 1:
                        before, current, after = sentence[:start], sentence[start:end], sentence[end:]

                        if len(current) == 1:
                            self.wordcount += 1

                        ngram = " ".join(current)

                        if ngram in self.tree:
                            self.tree[ngram].count += 1
                        else:
                            self.tree[ngram] = Ngram(ngram)

                        for reach in range(1, self.max_reach + 1):
                            if len(after) >= reach:
                                word = after[reach - 1]
                                self.tree[ngram].add_after(word, reach)

    def get_sentences(self):
        remove_punctuation_map = dict((ord(char), None) for char in string.punctuation.replace('\'', ''))
        sentences = re.split(r'\n|\. |!|\?', self.text)

        return [(
                    sentence.decode('utf-8')
                        .strip('\n')
                        .translate(remove_punctuation_map)
                        .lower()
                        .split()
                ) for sentence in sentences if sentence]
