import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class EventFilterService {

constructor() { }

filterEventTypeArr = [];
filterEventTagArr = [];

updateFilterEventTypeArr(newArray) {
  this.filterEventTypeArr = newArray;
}

updateFilterEventTagArr(newArray) {
  this.filterEventTagArr = newArray;
}

getEventFilterInfo() {
  const filterObj = {
    filterEventTypeArr: this.filterEventTypeArr,
    filterEventTagArr: this.filterEventTagArr
  };

  return filterObj;
}

eventFilterInfo = new Subject();



}
