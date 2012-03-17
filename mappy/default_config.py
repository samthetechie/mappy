import os

DEBUG = True

SECRET_KEY = 'development key'

PORT = int(os.environ.get('PORT', 5000))
HOST = os.environ.get('HOST', '0.0.0.0')

MONGODB_HOST = os.environ.get('MONGODB_HOST', 'localhost')
MONGODB_PORT = os.environ.get('MONGODB_PORT', 27017)
MONGODB_DBNAME = os.environ.get('MONGODB_DBNAME')
MONGODB_USERNAME = os.environ.get('MONGODB_USERNAME')
MONGODB_PASSWORD = os.environ.get('MONGODB_PASSWORD')

PUBNUB_PUB_KEY = ''
PUBNUB_SUB_KEY = ''

TILES_URL = '' # eg. 'http://{s}.tile.cloudmade.com/YOUR-API-KEY/997/256/{z}/{x}/{y}.png'