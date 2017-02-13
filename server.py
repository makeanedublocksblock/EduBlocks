import bottle
from bottle import *
import os

app = Bottle()

blockly_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui')

# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors

@post('/runcode')
@enable_cors
def do_login():
    codeToRun = request.forms.get('code')
    print(codeToRun)
    exec(codeToRun)

@route('/<filepath:path>')
def mainPage(filepath):
    print(filepath)
    return static_file(filepath, root=blockly_root)

@route('/')
def mainPage():
    filepath = "index.html"
    return static_file(filepath, root=blockly_root)

run(host='', port=8080)



