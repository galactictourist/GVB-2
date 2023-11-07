import _ from 'lodash';
import { useState } from "react";

interface SortData {
  sortProperty: string
  orderBy: string
}

export const useSort = (callback: Function) => {
  const [sort, setSort] = useState<SortData>({
    sortProperty: "Name",
    orderBy: "ASC"
  });

  const handler = (target: any, data: any) => {
    let sortProperty = !_.isUndefined(target.name) ? target.name : target.parentNode.name;
    sortProperty = _.isUndefined(sortProperty) ? target.parentNode.parentNode.name : sortProperty;

    let sortData = { ...sort };
    if (sortData.sortProperty !== sortProperty) {
      sortData.sortProperty = sortProperty;
    } else {
      sortData.orderBy = sortData.orderBy === "ASC" ? "DESC" : "ASC";
    }

    const newData = _sort(sortData, data);
    callback(newData);
    setSort(sortData);
  }

  const _sort = (sortData: SortData, data: any) => {
    let newData = [...data];

    newData = newData.sort((a: any, b: any) => {
      if (a[sortData.sortProperty] === "" && b[sortData.sortProperty] !== "") {
        return 1;
      } else if (a[sortData.sortProperty] !== "" && b[sortData.sortProperty] === "") {
        return -1;
      }
      return a[sortData.sortProperty] < b[sortData.sortProperty] ? -1 : 1;
    })

    if (sortData.orderBy === "DESC") {
      newData = newData.reverse();
    }

    return newData;
  }

  return {
    sort,
    handler
  }
}
