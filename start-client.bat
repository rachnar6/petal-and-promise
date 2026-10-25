@echo off
title Petal & Promise - Frontend Client
echo Starting Petal & Promise Frontend on http://localhost:5173...
cd /d "%~dp0client"
node ./node_modules/vite/bin/vite.js
pause
