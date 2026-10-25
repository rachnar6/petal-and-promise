@echo off
title Petal & Promise - Launcher
echo ========================================================
echo   PETAL & PROMISE - FULL STACK FLORAL CELEBRATION APP
echo ========================================================
echo.
echo Launching Backend Server in a new window...
start "Petal & Promise Server" cmd /k "cd /d ""%~dp0server"" && node src/server.js"

echo Launching Frontend Client in a new window...
start "Petal & Promise Client" cmd /k "cd /d ""%~dp0client"" && node ./node_modules/vite/bin/vite.js"

echo.
echo Both servers have been launched!
echo - Public Website & Client Portal: http://localhost:5173
echo - Backend API & Pabbly Engine:    http://localhost:5000
echo.
pause
