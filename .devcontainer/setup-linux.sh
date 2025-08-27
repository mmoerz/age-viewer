#!/bin/bash

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${OS}"
esac

echo "Detected OS: ${machine}"

# OS-specific logic
if [[ "$machine" == "Linux" ]]; then
    echo "Running Linux-specific setup"
    # Linux-specific commands
elif [[ "$machine" == "MinGw" ]]; then
    echo "Running Windows-specific setup"
    # Windows-specific commands
else
    echo "Unsupported OS"
    exit 1
fi

echo "Cleaning up potentially old symlinks"
rm -f docker-compose.yml \
      apache-age-viewer/Dockerfile \
      apache-age-viewer/devcontainer.json

echo "Creating symlinks for $machine"
ln -s docker-compose-linux.yml docker-compose.yml
ln -s apache-age-viewer/Dockerfile-linux apache-age-viewer/Dockerfile
ln -s apache-age-viewer/devcontainer-linux.json apache-age-viewer/devcontainer.json