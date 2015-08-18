# Migrations

## Running a migration

PYTHONPATH=. bin/run python migrations/add_status_field_to_users.py

TODO:
    
    Rename migrations added. In step 9 the migration fails.
    The fix is to execute the addition of the new fields to 'countries' and 'groups' tables