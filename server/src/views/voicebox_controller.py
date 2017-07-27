from .. import app
from json import dumps
from flask import request, abort
from ..voicebox import Corpus


@app.route('/voicebox', methods=['POST'])
def create_voicebox():
    if not request.json or ('text' not in request.json):
        abort(400)

    text = request.json['text'].encode('utf-8').strip()
    corpus = Corpus(text=text)

    return dumps(
        corpus.tree,
        default=lambda obj: obj.__dict__,
        sort_keys=True
    ), 201
