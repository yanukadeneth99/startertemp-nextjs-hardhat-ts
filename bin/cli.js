#!/usr/bin/env node

// Dependacy
const { execSync } = require("child_process");

// Get Folder name
const repoName = process.argv[2] || "my-app";

// Run command and pass true to return with error
const runCommand = (command, error=true) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    if(error) {
      console.error('\x1b[31m%s\x1b[0m',`Failed to execute ${command} : ${e}`);
    }
    return false;
  }
  return true;
};

// Git Clone Link
const gitCheckoutCommand = `git clone --dept 1 https://github.com/yanukadeneth99/startertemp-nextjs-hardhat-ts ${repoName}`;

//* INSTALLATION PROCEDURE
// Cloning Project
console.log("\x1b[34m%s\x1b[0m",`----- Downloading project template to ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(1);


// Installation of Package : PNPM
console.log("\x1b[34m%s\x1b[0m",`----- Checking if pnpm exits`);
const pnpmExist = runCommand(`pnpm -v`, false);
if(!pnpmExist) {
  console.log("\x1b[31m%s\x1b[0m",`----- Pnpm does not exist. Installing pnpm`);
  const installPnpm = runCommand(`npm i -g pnpm`);
  if (!installPnpm) process.exit(1);
}else {
  console.log("\x1b[32m%s\x1b[0m",`----- Pnpm exists. Moving on.`);
}


// Installing the Front-end dependacies
console.log("\x1b[34m%s\x1b[0m",`----- Installing Frontend dependancies`);
const installFDeps = runCommand(`cd ${repoName}/frontend && pnpm install`);
if (!installFDeps) process.exit(1);

// Installing backend dependancies
console.log("\x1b[34m%s\x1b[0m",`----- Installing Backend dependancies`);
const installBDeps = runCommand(`cd ${repoName}/backend && pnpm install`);
if (!installBDeps) process.exit(1);

// Clearing out installation files
console.log("\x1b[34m%s\x1b[0m",`----- Clearing out Installation Directories`);
const clearBin = runCommand(`cd ${repoName} && rm -rf bin`);
const clearPackage = runCommand(`cd ${repoName} && rm -fv package.json`);
if (!clearBin || !clearPackage) process.exit(1);

// Successfully Installed
console.log('\x1b[32m%s\x1b[0m',`------ Successfully Installed All!`);

// Guide on how to proceed
console.log(`cd frontend && pnpm dev`);
