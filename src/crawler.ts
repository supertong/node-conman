import * as EC2 from "aws-sdk/clients/ec2";
import * as AWS from "aws-sdk/global";
import * as Rx from "rxjs";
import ArgumentObservable from "./observables/ArgumentObservable";
import { InstanceObservable } from "./observables/InstanceObservable";


const defaultConfig = new AWS.Config({
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: "",
  },
  region: "ap-southeast-2",
});

const InstanceStateObservable = InstanceObservable(defaultConfig)
  .defaultIfEmpty()
  .scan((acc, curr) => {
    // Return an empty array if the upstream observable is empty
    return curr ? [...acc, curr] : [];
  }, []);

// ArgumentObservable.subscribe((value: string) => {
//   console.log(value);
// });

Rx.Observable.combineLatest(InstanceStateObservable, ArgumentObservable)
  .subscribe((latestValues) => {
    console.log(latestValues);
  });

