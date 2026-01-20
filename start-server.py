#!/usr/bin/env python3
"""
Simple HTTP server for the ImageBulk application
Run with: python3 start-server.py
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuration
PORT = 8080
DIST_DIR = Path(__file__).parent / "dist"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST_DIR), **kwargs)

    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def main():
    if not DIST_DIR.exists():
        print(f"Error: {DIST_DIR} directory not found!")
        print("Please run 'npm run build' first.")
        sys.exit(1)

    os.chdir(DIST_DIR)

    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 60)
        print(f"🚀 ImageBulk Server is running!")
        print("=" * 60)
        print(f"\n📍 Local:    http://localhost:{PORT}")
        print(f"📍 Network:  http://0.0.0.0:{PORT}")
        print(f"\n📁 Serving:  {DIST_DIR}")
        print("\n🛑 Press Ctrl+C to stop the server")
        print("=" * 60)
        print()

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()
