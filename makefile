all:	gitadd

gitadd:
	git add makefile language.txt README.md *.css *.html *.js image/*.* 0/*.* 1/*.*

gitpush:
	git push -u origin master
