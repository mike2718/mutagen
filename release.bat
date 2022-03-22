@echo off
cd /d "%~dp0"
del /q ../mutagen_v1.23.zip 2>nul
git archive -v --format=zip --prefix=mutagen_v1.23/ --output=../mutagen_v1.23.zip HEAD