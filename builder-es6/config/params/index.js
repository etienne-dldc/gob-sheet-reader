import buildEnvMapper from './buildEnvMapper';
import presets from './presets';

export default function (buildEnv) {
  const presetFileName = buildEnvMapper(buildEnv);
  return {
    presetFileName,
    preset: presets(presetFileName)
  };
};
