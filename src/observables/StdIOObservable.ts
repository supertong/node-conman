import * as readline from "readline";
import * as Rx from "rxjs";

const createStream = (output: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

};
