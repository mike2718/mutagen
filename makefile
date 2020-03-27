all:	gitstatus

gitadd:
	git add board.css help.js kashin.css makefile language.txt view.css \
	view.js board.js index.html kashin.js README.md view.html \
	0/help.css 0/help.html 0/help_menu.html \
	1/help.css 1/help_other.html 1/mutagen_help.html \
	1/help.html 1/help_port.html 1/mutagen_kashin.html \
	1/help_development.html 1/help_start.html 1/mutagen_language.html \
	1/help_donation.html 1/help_update.html 1/mutagen_open.html \
	1/help_feature.html 1/help2.html 1/pd_board.html \
	1/help_first.html 1/help3.html 1/pd_connection.html \
	1/help_kaicho.html 1/mutagen_board.html 1/pd_gather.html \
	1/help_menu.html 1/mutagen_first.html 1/pd_interface.html

gitstatus:	gitadd
	git status

gitpush:
	git push -u origin master
