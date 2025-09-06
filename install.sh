#!/bin/bash

## BACKEND
cd server
pnpm install

## FRONTEND
cd client
pnpm install

echo "Node modules have been downloaded! Please run the start.sh script to start the application."
