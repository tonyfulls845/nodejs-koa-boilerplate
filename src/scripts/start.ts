import spawn from 'cross-spawn';

const spawnWithConsole = (
  name: string,
  command: string,
  transform: (...args: any[]) => string = (...args) => args.join(','),
) => {
  const childProcess = spawn(command);

  const finalTransform = (data: any) => transform(`[${name}]: ${data}`);

  childProcess.stdout.on('data', (data) => {
    console.log(finalTransform(data));
  });

  childProcess.stderr.on('data', (data) => {
    console.error(finalTransform(data));
  });

  childProcess.on('close', (code) => {
    console.log(finalTransform(`child process exited with code ${code}`));
  });
};

spawnWithConsole('Gulp watching interfaces', 'gulp');
spawnWithConsole('Nodemon watching app', 'nodemon --delay 500ms');
