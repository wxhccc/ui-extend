set -e

VERSION=`npx select-version-cli`

if [[ $VERSION =~ ^[0-9]+(.[0-9]+){0,2}$ ]]
then
read -p "Relaseing $VERSION - are you sure? (y/n)" -n 1 -r
else
echo "invalid version"
fi

if [[ $REPLY =~ ^[Yy]$ ]]
then
  git checkout master
  git merge dev

  echo "Relaseing $VERSION ..."

  git add -A
  git commit -m "[build] $VERSION"

  echo "npm run build"
  npm version $VERSION --message "[release] $VERSION"
  npm run build
  echo "Publish to npm ..."
  npm publish

  echo "Deploy to ui-extend.wxhice.com ..."

  cd version-docs/

  rm -rf dist/**

  # build version document
  
  cross-env PUB_VERSION=$VERSION npm run docs:build

  echo "Uploading to OSS ..."

  node oss-upload.js $VERSION

  echo "Deploy to github.io ..."
  npm run docs:publish

  ## commit
  git add -A
  git commit -m "[release] $VERSION"
  git push origin master

  ## publish
  git tag -a v$VERSION -m "$VERSION"
  git push origin v$VERSION



  ## rebase dev

  git checkout dev
  git rebase master
  git push origin dev

  cd -
fi
