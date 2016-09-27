// import does not work with babel-core, WTF babel !?
const babel = require('babel-core');

import path from 'path';
import chokidar from 'chokidar';
import jetpack from 'fs-jetpack';
import rimraf from 'rimraf';
import nodemon from 'nodemon';
import { addExitPromise } from '../tools/rl';

/**
 * Vars
 */
var watcher;

export default function serverTask (config) {

  return clearServerDist()
  .then(() => startWatchServer())
  .then(() => startNodemon());

  function startWatchServer () {
    return new Promise(function(resolve, reject) {
      console.log('=> startWatchServer');
      watcher = chokidar.watch(config.paths.server)
      .on('add', (filePath) => processFile(filePath, resolve))
      .on('change', processFile);
      addExitPromise(stopChokidar);
    });
  }

  function stopChokidar () {
    return new Promise(function(resolve, reject) {
      console.log('=> stopChokidar');
      watcher.close();
      resolve();
    });
  }

  function processFile (filePath, resolveCanStartNodemon) {
    const pathFromServerDir = path.relative(config.paths.server, filePath);
    console.log(`=> processFile : ${pathFromServerDir}`);
    const outputFile = path.resolve(config.paths.serverDist, pathFromServerDir);
    transformFile(filePath, outputFile)
    .then(() => {
      if (filePath === config.paths.serverBoot) {
        resolveCanStartNodemon();
      }
    })
  }

  function transformFile (input, output) {
    return new Promise(function(resolve, reject) {
      const pathFromServerDir = path.relative(config.paths.workdir, input);
      console.log(`=> transformFile : ${ pathFromServerDir }`);
      babel.transformFile(input, config.server.babel, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        } else {
          console.log(`=> Write file : ${ output }`);
          var result = jetpack.write(output, result.code);
          resolve();
        }
      });
    });
  }

  function clearServerDist () {
    return new Promise(function(resolve, reject) {
      console.log('=> clearServerDist');
      rimraf(config.paths.serverDist, {}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }

  function startNodemon () {
    return new Promise(function(resolve, reject) {
      console.log('=> startNodemon');
      nodemon(config.server.nodemon);
      nodemon.on('start', () => {
        console.log('=> Nodemon has started !');
        resolve();
      });
      nodemon.on('restart', (files) => {
        console.log(`=> Nodemon restarted due to: ${ files }`);
      });
      addExitPromise(stopNodemon);
    });
  }

  function stopNodemon () {
    return new Promise(function(resolve, reject) {
      console.log('=> stopNodemon');
      nodemon.on('quit', () => {
        console.log(`=> Nodemon exit`);
        resolve();
      });
      nodemon.emit('quit');
    });
  }

}
