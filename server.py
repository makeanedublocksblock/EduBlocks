from bottle import *
import os
import threading

app = Bottle()

ui_root = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui')

codeToRun = ''
thread = None

def worker():
    global codeToRun

    print(codeToRun)
    exec(codeToRun)

@app.hook('after_request')
def enable_cors():
    print("after_request hook")
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@post('/runcode')
def runcode():
    global codeToRun, thread

    codeToRun = request.forms.get('code')

    # if thread != None:
    #     thread.stop()

    thread = threading.Thread(target=worker)
    thread.daemon = True  # thread dies when main thread (only non-daemon thread) exits.
    thread.start()
    return codeToRun

@route('/<filepath:path>')
def mainPage(filepath):
    print(filepath)
    return static_file(filepath, root=ui_root)

@route('/')
def mainPage():
    filepath = "index.html"
    return static_file(filepath, root=ui_root)

run(host='0.0.0.0', port=8080, server='cherrypy')



