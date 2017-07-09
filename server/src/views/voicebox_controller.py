from .. import app
from json import dumps
from flask import request, abort
from ..voicebox import Voicebox


@app.route('/voicebox', methods=['POST'])
def create_voicebox():
    if not request.json or ('text' not in request.json):
        abort(400)

    text = [text.encode('utf-8').strip() for text in request.json['text']]
    voicebox = Voicebox().build(text)

    print voicebox

    return dumps(
        voicebox,
        default=lambda obj: obj.__dict__,
        sort_keys=True
    ), 201
