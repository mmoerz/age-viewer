#!/bin/sh
# podman-rootless -- Call through to podman and add PODMAN_RUN_ARGS if cmd=run

# Usage:
# 1. Include podman-rootless on $PATH:
#    sudo cp ./podman-rootless /usr/local/bin/
#    ln -s ./podman-rootless ~/.local/bin/
#
# 2. In vscode settings.json:
#    "dev.containers.dockerPath": "/home/user/.local/bin/podman-rootless"

if [ -n "${DEBUG_PODMAN_ROOTLESS}" ]; then
    echo "${@}" >> ~/podman-rootless.log
fi

export PODMAN_RUN_ARGS=${PODMAN_RUN_ARGS:-"--userns=keep-id --security-opt=label=disable"}

cmd=$1
if [ "${cmd}" == "run" ] && [ ! -n "${SKIP_PODMAN_ROOTLESS}" ]; then
    shift
    podman run ${PODMAN_RUN_ARGS} "${@}"
else
    podman "${@}"
fi