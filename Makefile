all:
	@echo "Doing all"

deploy:
	@echo "Pushing to production"
	@git push live master

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@whoami
	@pwd