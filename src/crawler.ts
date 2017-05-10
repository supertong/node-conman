import * as EC2 from "aws-sdk/clients/ec2";
import * as AWS from "aws-sdk/global";

const defaultConfig = new AWS.Config({
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
  region: "ap-southeast-2",
});

const ec2 = new EC2(defaultConfig);

ec2.describeInstances({
  DryRun: false,
  MaxResults: 10,
});
