#! /bin/bash

rm -rf out/
mkdir out/

cp -r src/ out/


#rm ./src/manifest.json
#sh ./misc/switch-manifest.sh $1
#VERSION=$(cat misc/manifestdev.json | jq '.version')
#echo $VERSION
#echo $(jq ".version =${VERSION}" src/manifest.json) > src/manifest.json
#cd src/ && zip -r ../out/.zip ./ && cd ..