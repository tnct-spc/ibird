from flask import Flask, abort, request 
import subprocess
from datetime import datetime

app = Flask(__name__)

@app.route('/', methods=['POST']) 
def foo():
    if not request.json:
        abort(400)
    if request.json["ref"]=="refs/heads/release":
        print(request.json)
        print('\n'*4)
        print("updated")
        datetime.now().strftime("%Y/%m/%d %H:%M:%S")
        subprocess.run(['git','pull'])
        subprocess.run(['docker-compose','down'])
        subprocess.run(['docker-compose','up','-d'])
    return '200'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
