from flask import Flask, abort, request 
import json
import subprocess

app = Flask(__name__)


@app.route('/', methods=['POST']) 
def foo():
    if not request.json:
        abort(400)
    if request.json["ref"]=="refs/heads/release":
        subprocess.check_output('git pull origin release')
        subprocess.check_output('docker-compose down')
        subprocess.check_output('docker-compose up -d')
    return 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
