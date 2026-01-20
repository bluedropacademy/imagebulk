#!/bin/bash

echo "🚀 Starting ImageBulk Server..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "📦 Building project first..."
    npm run build
fi

# Start the Python server
python3 start-server.py
