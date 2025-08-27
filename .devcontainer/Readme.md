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
