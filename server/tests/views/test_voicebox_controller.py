from unittest import TestCase
from json import dumps
from mock import patch

from server.src import app
from server.src.voicebox import Voicebox


# TODO: Test for sorting keys
class TestVoiceboxController(TestCase):
    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_create_voicebox_returns_400_when_no_text(self):
        response = self.app.post('/voicebox')

        self.assertEquals(response.status_code, 400)

    @patch.object(Voicebox, 'build')
    def test_create_voicebox(self, mock_voicebox_build):
        data = 'data'
        mock_voicebox_build.return_value = data

        response = self.app.post(
            '/voicebox',
            data=dumps(dict(text=['text'])),
            content_type='application/json'
        )

        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.data, dumps(data))

        mock_voicebox_build.assert_called_once_with([u'text'])
