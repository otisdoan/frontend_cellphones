#!/bin/bash
# FastAPI Server Starter Script

echo "🚀 Starting CellphoneS AI Service..."
echo "=================================="

# Change to script directory
cd "$(dirname "$0")"

# Activate virtual environment
. venv/bin/activate

# Start FastAPI server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
