all:	gitadd

gitadd:
	git add makefile README.txt *.css *.html *.js image/*.* 0/*.* 1/*.*

gitpush:
	git push -u origin master
