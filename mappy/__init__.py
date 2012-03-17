def _init_app():
    from flask import Flask

    from . import default_config

    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object(default_config)
    app.config.from_envvar(app.name.upper() + '_SETTINGS', silent=True)
    app.config.from_pyfile('local_config.py', silent=True)

    return app

def _init_db():
    from mongokit import Connection
    from .models import models

    conn = Connection(app.config['MONGODB_HOST'],
                      app.config['MONGODB_PORT'])

    db = conn[app.config['MONGODB_DBNAME']]

    if all(k in app.config for k in ("MONGODB_USERNAME", "MONGODB_PASSWORD")):
        db.authenticate(app.config['MONGODB_USERNAME'], app.config['MONGODB_PASSWORD'])

    db.connection.register(models)

    return db

app = _init_app()
db = _init_db()

from . import views