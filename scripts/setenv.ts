const { writeFile, mkdir } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetDirectory = './src/environments/';
const targetFile = isProduction ? `environment.prod.ts` : `environment.ts`;

if (!process.env['GOOGLE_API_KEY']) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1);
}
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
  production: ${isProduction},
  GOOGLE_API_KEY: "${process.env['GOOGLE_API_KEY']}",
};
`;
// write the content to the respective file

mkdir(targetDirectory, { recursive: true }, (err) => {
  if (err) throw err;
});
writeFile(
  `${targetDirectory}${targetFile}`,
  environmentFileContent,
  function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`Wrote variables to ${targetDirectory + targetFile}`);
  }
);
