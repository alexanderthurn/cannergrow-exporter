#! /bin/bash

if [ "$1" = "dev" ]; then 
    cp misc/manifestdev.json src/manifest.json
fi

if [ "$1" = "v2" ]; then 
    cp misc/manifestv2.json src/manifest.json
fi

if [ "$1" = "v3" ]; then 
    cp misc/manifestv3.json src/manifest.json
fi
