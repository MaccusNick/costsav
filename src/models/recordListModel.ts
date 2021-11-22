const localStorageKeyName = "recordList";
const recordList = {
  clone(data:RecordItem[] | RecordItem){
    return JSON.parse(JSON.stringify(data))
  },

  fetch() {
    return JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
};

export default recordList ;
