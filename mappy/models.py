import datetime

from mongokit import Document

class Feature(Document):
    __collection__ = 'features'

    structure = {
            'title': unicode,
            'info': unicode,
            'urgency': int,
            'pos': (float, float),
            'date_creation': datetime.datetime,
    }

    default_values = {
            'urgency': 1,
            'title': u'no title',
            'info': u'no info',
            'date_creation': datetime.datetime.utcnow
    }

    required_fields = ['pos', 'date_creation']

models = [Feature]