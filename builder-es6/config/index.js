import paths from './paths';
import server from './server';
import client from './client';
import buildEnv from './buildEnv';
import params from './params';

export default {
  paths,
  params: params(buildEnv),
  server: server(paths),
  client
};
