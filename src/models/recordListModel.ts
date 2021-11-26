const localStorageKeyName = "recordList";
import clone from "@/lib/clone";
const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  create(record:RecordItem){
    const record2: RecordItem = clone(record); //record2 为record 的深拷贝，
    record2.createdAt = new Date();
    this.data.push(record2);//将所有组件数据放入 data 中
  },
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem("recordList") || "[]"
    ) as RecordItem[];
    return this.data
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default recordListModel;
