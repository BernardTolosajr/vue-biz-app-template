'use strict';

var path = require('path');
var ROOT_PATH = process.cwd();
var TEMP_PATH = path.join(ROOT_PATH, '_temp');
var config = require(path.join(TEMP_PATH, 'build/config'));

/**
 * Run before pack, doing the stuff synchronized
 * @param utils { fse, globby }
 * fse: fs-extra https://github.com/jprichardson/node-fs-extra
 * globby: https://github.com/sindresorhus/globby
 */
exports.beforePack = function (utils) {
  var fse = utils.fse;
  var walletPath = path.join(TEMP_PATH, '/dist');

  if (walletPath === path.join(config.build.assetsRoot)) {
    return;
  }

  try {
    fse.emptyDirSync(walletPath);
  } catch (err) {
    console.log('failed to empty resoure files');
  }

  try {
    fse.copySync(path.join(config.build.assetsRoot), walletPath);
    fse.copySync(config.build.index, path.join(walletPath, '/index.html'));
  } catch (err) {
    console.log('failed to copy resoure files');
  }
};

/**
 * Run after pack, doing the stuff synchronized
 * @param utils { fse, globby }
 * fse: fs-extra https://github.com/jprichardson/node-fs-extra
 * globby: https://github.com/sindresorhus/globby
 */
exports.afterPack = function (utils) {
  ['public', 'view', '_temp'].forEach(function (p) {
    return utils.fse.removeSync(path.join(ROOT_PATH, p));
  });
};