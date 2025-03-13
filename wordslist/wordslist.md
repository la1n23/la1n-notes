# Language codes
```bash
npm init && npm i locale-codes

cat << DONE > index.js
const locale = require('locale-codes')

for (let lang of locale.all.map(({tag}) => tag.replace('-', '_'))) {
  console.log(lang);
}
DONE

node index.js > langs.txt
```