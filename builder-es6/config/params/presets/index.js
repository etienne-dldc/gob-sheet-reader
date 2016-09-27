import requireDir from 'require-dir';
import _ from 'lodash';

var presets = requireDir();
presets = _.mapValues(presets, preset => preset.default);
// remove exemples
presets = _.omitBy(presets, (val, key) => key.match(/.*\.local\.example$/));

const defaultParams = presets['default'];

export default function (presetFileName) {

  console.log(presets);

  if (_.isNil(presets[presetFileName]) && _.isNil(presets[presetFileName + '.local'])) {
    throw new Error(`Can't find preset named "${presetFileName}" or "${presetFileName + '.local'}" in presets.`);
  }
  if (!_.isNil(presets[presetFileName + '.local'])) {
    console.log('found local !');
    var presetToOveride = presets[presetFileName] || {};
    // default <- preset <- preset.local
    return _.merge(defaultParams, presetToOveride, presets[presetFileName + '.local']);
  } else {
    return _.merge(defaultParams, presets[presetFileName]);
  }

}
