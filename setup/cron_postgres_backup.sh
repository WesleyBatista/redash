FILE_NAME="postgres_backup_"`date +"%Y%m%d_%H%M%S"`".sql.gzip"
sudo -u postgres pg_dumpall | gzip > ${FILE_NAME}
gsutil cp ${FILE_NAME} gs://redash/postgres/${FILE_NAME}


# set with `crontab -e`
# ```bash
# * * * * * /opt/redash/current/setup/cron_postgres_backup.sh 1> /opt/redash/logs/cron_job.log 2> /opt/redash/logs/cron_job_errors.log
# @hourly /opt/redash/current/setup/cron_postgres_backup.sh 1> /opt/redash/logs/cron_job.log 2> /opt/redash/logs/cron_job_errors.log
# ```