import gzip as gzip2
from cStringIO import StringIO
from decorator import decorator
from datetime import datetime

from flask import Response, make_response, json
from pymongo.objectid import ObjectId
import requests
import geojson

class MongoEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, isoformat):
            return obj.isoformat()
        elif isinstance(obj, ObjectId):
            return str(obj)
        else:
            return json.JSONEncoder.default(self, obj)

def features_to_geojson(fs):
    features = []
    for f in fs:
        _id = f['_id']
        geom = geojson.Point(f['pos'])
        for k in ['_id', 'pos']: del f[k]
        f['date_creation'] = str(f['date_creation'])
        f = geojson.Feature(id=str(_id),
                            geometry=geom,
                            properties=f)
        features.append(f)

    if len(features) > 1:
        feature_collection = geojson.FeatureCollection(features)
        return geojson.dumps(feature_collection)
    elif features:
        return geojson.dumps(features[0])
    else:
        return None

def broadcast_message(pub_key, sub_key, channel, msg):
    url = "https://pubsub.pubnub.com/%s/%s/%s/%s/%s/%s/%s" % (
                                                'publish',
                                                pub_key,
                                                sub_key,
                                                0,
                                                channel,
                                                0,
                                                msg)

    resp = requests.get(url)
    return resp.ok

@decorator
def gzip(f, *args, **kwargs):
    """GZip Flask Response Decorator."""

    resp = f(*args, **kwargs)

    if not isinstance(resp, Response):
        resp = make_response(resp)

    content = resp.data

    gzip_buffer = StringIO()
    gzip_file = gzip2.GzipFile(
        mode='wb',
        compresslevel=4,
        fileobj=gzip_buffer
    )
    gzip_file.write(content)
    gzip_file.close()

    gzip_data = gzip_buffer.getvalue()

    resp.data = gzip_data
    resp.headers['Content-Encoding'] = 'gzip'
    resp.headers['Content-Length'] = str(len(resp.data))

    return resp