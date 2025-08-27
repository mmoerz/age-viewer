# Development setup

# prerequisites

* Docker
* VSCode

# Operationsystem specific setup
on Windows run:
```
setup-windows.ps1
```

on Linux run:
```
setup-linux.sh
```

# Updating the container
Since /src is now on a 'internal' volume, you have to carefull about:
* changes outside the container will not be reflected when simply rebuilding the container.
* you need to commit changes directly from the container or mount it from the outside.
* IF YOU REBUILD SAVE YOUR DATA FIRST, then delete the volume

RANT> do I need to understand the way docker handles volumes? yeah, when it first creates
the container it mounts the internal volume and then executes the commands. After that it
creates the container executes the commands and then mounts the volume?
