# Migrations

## Running a migration

PYTHONPATH=. bin/run python migrations/create_areas_rollback.py

TODO:
    
    Rename migrations added. In step 9 the migration fails.
    The fix is to execute the addition of the new fields to 'countries' and 'groups' tables

## Importing CSV into postgresql
COPY areas(continent_code, continent_name, region_code, region_name, subregion_code, subregion_name, country_code, country_capital, country_name, city_code, city_name, currency_code, telephone_code, timezone) FROM '/opt/redash/current/migrations/data_areas.csv' DELIMITER ',' CSV;
