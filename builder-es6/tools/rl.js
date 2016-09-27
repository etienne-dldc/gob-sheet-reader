import readline from 'readline';

const exitTasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('close', () => {
  const exitPromises = exitTasks.map(task => task());
  Promise.all(exitPromises)
  .then(() => {
    console.log('All exit are done !');
  })
  .then(() => { process.exit() });
});

export function addExitPromise (newProm) {
  exitTasks.push(newProm);
}
