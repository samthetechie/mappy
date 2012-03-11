import os

DEBUG = False

PORT = int(os.environ.get('PORT', 5000))
HOST = os.environ.get('HOST', '0.0.0.0')

MONGO_HOST = os.environ.get('MONGO_HOST', 'localhost')
MONGO_PORT = os.environ.get('MONGO_PORT', 27017)
MONGO_DBNAME = os.environ.get('MONGO_DBNAME')

PUBNUB_PUB_KEY = ''
PUBNUB_SUB_KEY = ''

TILES_URL = '' # eg. 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png'