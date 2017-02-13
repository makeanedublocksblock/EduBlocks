from bottle import *
import os

app = Bottle()

blockly_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui')

@app.hook('after_request')
def enable_cors():
    print("after_request hook")
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@post('/runcode')
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



