from playhouse.migrate import PostgresqlMigrator, migrate

from redash.models import db
from redash import models

if __name__ == '__main__':
    db.connect_db()
    migrator = PostgresqlMigrator(db.database)

    with db.database.transaction():

        column = models.DataSource.geo_value
        column.null = True

        migrate(migrator.add_column('data_sources', 'geo_value', models.DataSource.geo_value))

        # for group in models.Group.select():
        #     group.save()
        migrate(migrator.drop_not_null('data_sources', 'geo_value'))

    db.close_db(None)
