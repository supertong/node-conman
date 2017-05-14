import * as Rx from "rxjs";

const ArgumentObservable = Rx.Observable.create((observer: Rx.Observer<string>) => {
  observer.next(process.argv[1] || "");
});

export default ArgumentObservable;
