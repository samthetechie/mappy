from flaskext.script import Manager

from mappy import app, db

manager = Manager(app)

@manager.command
def clear():
    """Clear the database."""
    print "%i documents in collection" % db['features'].count()
    db['features'].remove()
    print 'database cleared.'
    print "%i documents in collection" % db['features'].count()

if __name__ == "__main__":
    manager.run()