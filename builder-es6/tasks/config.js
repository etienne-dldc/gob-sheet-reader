
export default function configTask (config) {
  return logConfig()
  .then(() => config)

  function logConfig () {
    return new Promise(function(resolve, reject) {
      console.log('=> logConfig');
      console.log(JSON.stringify(config, null, 2));
      resolve();
    });
  }
}
