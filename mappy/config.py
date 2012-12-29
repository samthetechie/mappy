import os

DEBUG = True

MOBILE = True

SECRET_KEY = 'development key'

PORT = int(os.environ.get('PORT', 5000))
HOST = os.environ.get('HOST', '0.0.0.0')

MONGODB_HOST = os.environ.get('MONGODB_HOST', 'localhost')
MONGODB_PORT = os.environ.get('MONGODB_PORT', 27017)
MONGODB_DBNAME = os.environ.get('MONGODB_DBNAME','foo')
MONGODB_USERNAME = os.environ.get('MONGODB_USERNAME','foo')
MONGODB_PASSWORD = os.environ.get('MONGODB_PASSWORD','foo')

PUBNUB_PUB_KEY = 'foo'
PUBNUB_SUB_KEY = 'foo'
PUBNUB_CHANNELS = {'features': 'foo'}

TILES_URL = 'http://maps.congress.ccc.de/tiles/{z}/{x}/{y}.jpg'

JSCONSOLE_KEY = ''
