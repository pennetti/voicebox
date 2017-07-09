from flask import Flask

app = Flask(__name__)
from views import index, voicebox_controller
