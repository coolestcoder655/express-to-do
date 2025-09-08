#!/bin/bash

## BACKEND
echo 'Backend installation...'

cd server
pnpm install

cd ..

## FRONTEND
echo 'Frontend installation...'

cd client
pnpm install

echo "Node modules have been downloaded! Please run the start.sh script to start the application."
