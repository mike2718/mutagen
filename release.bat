@echo off
cd /d "%~dp0"
del /q ../mutagen_v1.24.zip 2>nul
git archive -v --format=zip --prefix=mutagen_v1.24/ --output=../mutagen_v1.24.zip HEAD