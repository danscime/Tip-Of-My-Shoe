from flask import Flask, request
from detection.detect import detect_shoes
import json

import sys
sys.path.append('../')

app = Flask(__name__)

@app.route('/detect', methods=['POST'])
def hello_world():
    image = request.files.get('image', '')
    image.save('../images/image.jpg')
    detections = detect_shoes('../images/image.jpg')
    if detections:
        return {'status' : 'success', 'detections' : json.dumps(detections)}
    else:
        return {'status' : 'failed'}