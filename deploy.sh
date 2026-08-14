set -e

npm run build
rm -Rf /tmp/_site
mkdir /tmp/_site
cp -R .git /tmp/_site/
pushd /tmp/_site/

set +e
git branch -D gh-pages &>/dev/null
set -e

git checkout --orphan gh-pages
git reset

popd
[ -f ".gh-pages" ] && cp .gh-pages /tmp/_site/CNAME
pushd _site
cp -R * /tmp/_site/

pushd /tmp/_site/
git add -A
git commit -m 'Deploy site'
git push --force --no-verify --set-upstream origin gh-pages
popd
popd
rm -Rf /tmp/_site
