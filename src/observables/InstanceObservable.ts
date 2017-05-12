import * as EC2 from "aws-sdk/clients/ec2";
import * as AWS from "aws-sdk/global";
import * as Rx from "rxjs";

const createStream = (config: AWS.Config) => {
  const ec2 = new EC2(config);

  /**
   * This chunk will query for MaxResult 10 each time
   */
  const chunk = (nextToken?: string): Rx.Observable<EC2.DescribeInstancesResult> => {
    return Rx.Observable.create((observer: Rx.Observer<EC2.DescribeInstancesResult>) => {
      ec2.describeInstances({
        DryRun: false,
        Filters: [
          {
            Name: "vpc-id",
            Values: ["vpc-8404d2e1"],
          },
        ],
        MaxResults: 10,
        NextToken: nextToken,
      }, (error, data) => {
        if (error) {
          observer.error(error);
        }
        observer.next(data);
      });
    });
  };

  const fetchInstances = (nextToken?: string): Rx.Observable<EC2.Instance> => {
    return Rx.Observable.defer(() => {
      return chunk(nextToken)
        .flatMap((value: EC2.DescribeInstancesResult) => {
          const instanceData = Rx.Observable.from(value.Reservations || [])
            /**
             * We want the Observable to return each EC2.Instance Data instead of the EC2.Reservation
             */
            .flatMap((reservation: EC2.Reservation) => {
              return Rx.Observable.from(reservation.Instances || []);
            });
          const nextChunk = value.NextToken ? fetchInstances(value.NextToken) : Rx.Observable.empty();

          /**
           * The good thing about .concat is that it will subscribe to the observables one at each time.
           * As a result, nextChunk is only exected as needed.
           */
          return Rx.Observable.concat(instanceData, nextChunk);
      });
    });
  };

  return fetchInstances();
};

export {
  createStream as InstanceObservable,
};
