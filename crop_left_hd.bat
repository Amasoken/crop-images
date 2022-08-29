@echo off

@REM node app_folder/index.js [preset] [image replace mode] [dropped files]
node "%~dp0index.js" CROP_HD_LEFT safe %*

pause
