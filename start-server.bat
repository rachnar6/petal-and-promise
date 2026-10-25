@echo off
title Petal & Promise - API Server
echo Starting Petal & Promise Backend Server on http://localhost:5000...
cd /d "%~dp0server"
node src/server.js
pause
