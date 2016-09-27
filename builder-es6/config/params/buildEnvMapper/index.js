
import _ from 'lodash';
import defaultBuildEnvMap from './buildEnvMap';

/**
 * Take the buildEnv and return a preset name
 */
export default function (buildEnv) {
  var buildEnvMap = defaultBuildEnvMap;
  const localMap = require('./buildEnvMap.local.js');
  if (localMap && localMap.default) {
    buildEnvMap = _.merge(defaultBuildEnvMap, localMap.default);
  }

  if (_.isString(buildEnvMap[buildEnv])) {
    if (buildEnv.match(/.*\.local$/)) {
      console.error(`Warning, the presetFileName contain ".local" which mean it will not overide the non-local preset if it exist.`);
    }
    return buildEnvMap[buildEnv];
  } else {
    console.error(JSON.stringify(buildEnvMap, null, 2));
    throw new Error(`The buildEnvMap above does not contain a key for the buildEnv ${buildEnv}.`);
  }
}
