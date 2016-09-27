import path from 'path';

const paths = {};
paths.workdir = path.resolve(__dirname, '../../');
paths.builder = path.resolve(paths.workdir, 'builder');
paths.server = path.resolve(paths.workdir, 'server');
paths.dist = path.resolve(paths.workdir, 'dist');
paths.serverDist = path.resolve(paths.dist, 'server');
paths.serverBoot = path.resolve(paths.server, 'index.js');
paths.serverDistBoot = path.resolve(paths.serverDist, 'index.js');

export default paths;
