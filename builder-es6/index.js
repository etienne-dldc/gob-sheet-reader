import config from './config';
import { addExitPromise } from './tools/rl';

// Tasks
import configTask from './tasks/config';
import serverTask from './tasks/server';

addExitPromise(function () {
  return new Promise(function(resolve, reject) {
    console.log('Exit in porgress...');
    resolve();
  });
})

configTask(config)
.then((conf) => (serverTask(conf)))
.catch(e => {
  console.error(e);
})
