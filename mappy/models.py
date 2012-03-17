import datetime

from mongokit import Document

class Feature(Document):
    __collection__ = 'features'

    structure = {
            'title': unicode,
            'body': unicode,
            'pos': (float, float),
            'date_creation': datetime.datetime,
    }

    default_values = {
            'date_creation': datetime.datetime.utcnow
    }

    required_fields = ['pos', 'date_creation']

models = [Feature]