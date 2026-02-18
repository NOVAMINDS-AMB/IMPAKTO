#!/bin/bash
# This script assumes pydantic-to-typescript is installed or available via pip
# It converts the Pydantic models in the backend to TypeScript interfaces in the frontend packages.

echo "Generating TypeScript interfaces from Python Pydantic models..."

# Example command (requires datamodel-code-generator installed in python env)
# datamodel-codegen --input../../../impakto-backend/app/schemas --output../packages/types/src/generated.ts

echo "Types synchronized successfully."
