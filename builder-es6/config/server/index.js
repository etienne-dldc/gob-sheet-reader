import babel from './babel';
import nodemon from './nodemon';

export default function (paths) {
  return {
    babel,
    nodemon: nodemon(paths)
  };
}
