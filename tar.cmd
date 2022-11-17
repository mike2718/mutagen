@echo off
cd /d "%~dp0"
del /q ../mutagen.zip 2>nul
git archive -v --format=zip --prefix=mutagen/ --output=../mutagen.zip HEAD

