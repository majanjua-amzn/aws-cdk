import { spawn } from 'child_process';

export const gitDiff = async (): Promise<string> => {
  const spawnProcess = spawn('git', ['diff', process.env.BASE_COMMIT ?? 'main', '--name-only'], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });

  let output = '';
  spawnProcess.on('data', (data) => output += data);

  return new Promise((resolve, reject) => spawnProcess.on('close', (code) => {
    if (code == 0) resolve(output);
    else reject(`git diff process failed with exit code ${code}`);
  }));
};
