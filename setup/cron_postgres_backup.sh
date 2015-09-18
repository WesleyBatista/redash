FILE_NAME="postgres_backup_"`date +"%Y%m%d_%H%M%S"`".sql.gzip"
sudo -u postgres pg_dumpall | gzip > ${FILE_NAME}
gsutil cp ${FILE_NAME} gs://redash/postgres/${FILE_NAME}
