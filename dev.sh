#!/usr/bin/env bash
set -e

trap 'kill 0' EXIT

cd "$(dirname "$0")"

echo "[backend] starting..."
(cd backend && npm run dev) &

echo "[frontend] starting..."
(cd frontend && npm run dev) &

wait
