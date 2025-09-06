#!/bin/bash

# Start the backend server
cd server
pnpm run dev &

# Start the frontend server
cd ../client
npm run dev

echo "Servers have been started. Please wait a few seconds for them to fully start."
echo "Once they are ready, you can access the application at:"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"
