@echo off
cd /d "%~dp0"
del /q ../mutagen.zip 2>nul
git archive -v --format=zip --prefix=mutagen/ --output=../mutagen.zip HEAD
git archive -v --format=tar.zst --prefix=mutagen/ --output=../mutagen.tar.zst HEAD
pause
