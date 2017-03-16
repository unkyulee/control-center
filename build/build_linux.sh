# build control-center for linux
# build result will be placed at ../dist/linux/

pushd ../src

# install node.js dependencies
npm install

# compile bundle.js
npm run build

# package the distribution binaries
./node_modules/.bin/electron-packager . "control-center" --out=../dist

popd # ../src
