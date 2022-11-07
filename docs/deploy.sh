set -e

pnpm run build

cd .vuepress
cp index.html dist/index.html

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:wxhccc/ui-extend.git master:gh-pages

cd -