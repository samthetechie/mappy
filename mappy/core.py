from flask import Flask, request, render_template, jsonify
from flask.ext.pymongo import PyMongo
from beaconpush import BeaconPush

import default_config

app = Flask(__name__, instance_relative_config=True)

app.config.from_object(default_config)
app.config.from_envvar(app.name.upper() + '_SETTINGS', silent=True)
app.config.from_pyfile('local_config.py', silent=False)

mongo = PyMongo(app)

@app.route('/')
def viewmap():
    return render_template('map.html')

@app.route('/add', methods=['POST'])
def add_feature():
    return jsonify(msg='yum, a feature.',
                   latlng=request.form)