const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('locales', function() {
    const locales = path.resolve(__dirname, '../src/_locales');
    const keys = [
        'extName', 'extDescription', 'title', 'security', 'reload', 'failure'
    ];

    fs.readdirSync(locales).forEach(locale => {
        it(locale, function() {
            const file = fs.readFileSync(path.resolve(locales, locale, 'messages.json'));
            const json = JSON.parse(file);
            keys.forEach(key => {
                assert(typeof json[key].message === 'string');
            });
        });
    });
});
