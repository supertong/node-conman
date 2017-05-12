import * as EC2 from "aws-sdk/clients/ec2";
import * as AWS from "aws-sdk/global";
import * as Rx from "rxjs";
import * as Vorpal from "vorpal";
import { InstanceObservable } from "./observables/InstanceObservable";

const vorpal = Vorpal();

vorpal.delimiter("conman$").show();

// const defaultConfig = new AWS.Config({
//   credentials: {
//     accessKeyId: "",
//     secretAccessKey: "",
//   },
//   region: "ap-southeast-2",
// });

// InstanceObservable(defaultConfig).subscribe((value) => {
//   console.log(value.InstanceId);
// });
