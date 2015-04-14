'use strict';

var util = require('util');

var spriteConfig = function(target, basePath, suffix) {
  var output = target.replace(/\//g,"-");
  var suffix = (typeof suffix === 'undefined')? '' : '_' + suffix;
  return {
    src: 'src/sprite/' + target + '/*.png',
    destCSS: 'sass/parts/npm/_spr-' + output + '.scss',
    destImage: 'img/sprite/' + output + suffix + '.png',
    algorithm: 'binary-tree',
    padding: 4,
    imgPath: basePath + output + suffix + '.png',
    cssVarMap: function(sprite){
        sprite.name = 'spr-' + output + '-' + sprite.name;
    },
    cssOpts: {
        target: output,
        spritesheet: 'spr-' + output
    },
    cssTemplate: 'lib/spritesmith/spritesmith.template.mustache'
  };
}
// base path for spritesheets
var spriteBasePath = '../img/sprite/';
// var spriteBasePath = 'http://cdn-stf.line-apps.com/project-name/';

module.exports = [
  spriteConfig('foo', spriteBasePath, '112233'),
  spriteConfig('hoge/fuga', spriteBasePath),
];