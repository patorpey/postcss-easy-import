const test = require('ava');
const path = require('path');
const addPrefix = require('../lib/add-prefix.js');
const hasPrefix = require('../lib/has-prefix.js');
const hasExtensions = require('../lib/has-extensions.js');

test('add-prefix', t => {
    t.is(
        addPrefix('basename', '_'),
        '_basename'
    );
    t.is(
        addPrefix('basename.ext', '_'),
        '_basename.ext'
    );
    t.is(
        addPrefix('dirname/basename', '_'),
        path.normalize('dirname/_basename')
    );
    t.is(
        addPrefix('dirname/basename.ext', '_'),
        path.normalize('dirname/_basename.ext')
    );
});

test('has-prefix', t => {
    t.is(hasPrefix('_basename', '_'), true);
    t.is(hasPrefix('basename', '_'), false);
    t.is(hasPrefix('_basename.ext', '_'), true);
    t.is(hasPrefix('basename.ext', '_'), false);
    t.is(hasPrefix('dirname/_basename', '_'), true);
    t.is(hasPrefix('dirname/basename', '_'), false);
    t.is(hasPrefix('dirname/_basename.ext', '_'), true);
    t.is(hasPrefix('dirname/basename.ext', '_'), false);
});

test('has-extensions', t => {
    t.is(hasExtensions('filename', ['.css']), false);
    t.is(hasExtensions('filename', ['.css', '.scss']), false);
    t.is(hasExtensions('filename.css', ['.css']), true);
    t.is(hasExtensions('filename.scss', ['.css', '.scss']), true);
    t.is(hasExtensions('filename.rss', ['.css']), false);
    t.is(hasExtensions('filename.rcss', ['.css', '.scss']), false);
});
