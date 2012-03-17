import datetime

from flask import Flask, request, render_template, jsonify, make_response, abort
from mongokit import ValidationError, RequireFieldError

from .utils import gzip, broadcast_message, features_to_geojson
from . import app, db

@app.route('/')
@gzip
def viewmap():
    return render_template('map.html')

@app.route('/features', methods=['GET', 'POST'])
def features():
    if request.method == 'GET':
        features_geojson = features_to_geojson(db.Feature.find())

        if features_geojson:
            response = make_response(features_geojson)
            response.headers['content-type'] = 'application/json'
            return response
        else:
            return make_response(None, 204)

    elif request.method == 'POST':
        feature = db.Feature()

        feature['title'] = request.form.get('title')
        feature['body'] = request.form.get('body')
        feature['pos'] = float(request.form.get('lon')), float(request.form.get('lat'))

        try:
            feature.save()
        except (ValidationError, RequireFieldError), e:
            return jsonify(error=e)
        else:
            r = broadcast_message(app.config['PUBNUB_PUB_KEY'],
                                  app.config['PUBNUB_SUB_KEY'],
                                  'features',
                                  features_to_geojson([feature]))
            return make_response(None, 204)
