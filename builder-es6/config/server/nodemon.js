export default function (paths) {
  return {
    script: paths.serverDistBoot,
    watch: [paths.serverDist],
    ext: 'js json'
  }
}
