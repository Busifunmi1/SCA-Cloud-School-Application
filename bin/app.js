#!/usr/bin/env node
const { exec, spawn } = require("child_process");
const { log } = require("console");
const os = require("os");
const { exit, stdout, stderr, stdin, argv } = require("process");
const yargs = require("yargs");

let options = yargs.usage("Usage: -p <package>").option("p", {
  alias: "package",
  describe: "name of package to be installed",
  type: "string",
  demandOption: true,
}).argv;


function cli(software) {
  //WINDOWS OS
  if (os.platform() === "win32") {
    //checks if the OS is windows. This check should be done for other operating systems
    let script = `where ${software}`; //this command is used for checking if the software has been installed into the windows machine
    exec(script, (err, stout) => {
      //exec creates a child process for running the shell script in the line above
      if (err || "") {
        //uses call back to check if the app does not exist
        let scripb = `choco install ${software}`; //if the app is absent it runs another shell script inside a child process to install it, choco is like `sudo apt-get` but for windows
        let spawning = exec(scripb); //we assign the shell script to a variable to enable further testing
        
        spawning.stdio[0].on("data", (data) => {
          log(data);
        });
        spawning.stderr.on("data", (data) => {
          log(`stderr: ${data}`);
        });
        spawning.on("error", (error) => {
          //return's an error if we have one
          log(error);
        });
        spawning.on("close", (close) => {
          //close the process with a code after installation
          log(`child process exited with code ${close}`);
        });
       
      }
      if (stout) {
        log(`Software already exist`);
      }
    });
  }
  //LINUX OS
  if (os.platform() === "linux") {
    //checks if OS is linux
    let script = `type -p ${software}`; //this shell script checks if the software is installed
    exec(script, (err, stout) => {
      if (err || "") {
        log(`installation required`);
        let scripb = `sudo apt-get install ${software}`; //script for installing software on linux
        let spawning = exec(scripb);
                spawning.stdio[0].on("data", (data) => {
          log(data);
        });
        spawning.stderr.on("data", (data) => {
          log(`stderr: ${data}`);
        });
        spawning.on("error", (error) => {
          log(error);
        });
        spawning.on("close", (close) => {
          log(`child process exited with code ${close}`);
        });
        //----------------------------------------------------------------------------------------------
      }
      if (stout) {
        log(`Software already exist`);
      }
    });
  }
  //MacOS
  if (os.platform() === "darwin") {
    //checks if OS is MacOS
    let script = `type -a ${software}`; //this shell script checks if the software is installed
    exec(script, (err, stout) => {
      if (err || "") {
        log(`installation required`);
        let scripb = `brew install ${software}`; //script for installing software on MacOS
        

        spawning.stdio[0].on("data", (data) => {
          log(data);
        });
        spawning.stderr.on("data", (data) => {
          log(`stderr: ${data}`);
        });
        spawning.on("error", (error) => {
          log(error);
        });
        spawning.on("close", (close) => {
          log(`child process exited with code ${close}`);
        });
        //----------------------------------------------------------------------------------------------------
      }
      if (stout) {
        log(`Software already exist`);
      }
    });
  }
}

cli(options.package);
