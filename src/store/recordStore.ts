import clone from "@/lib/clone";


const localStorageKeyName = 'recordList'

let data: RecordItem[] | undefined = undefined



const recordStore = {
   //record store
   fetchRecords() {
    data = JSON.parse(
      window.localStorage.getItem("recordList") || "[]"
    ) as RecordItem[];
    return data
  },
   saveRecords(){
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
   },
    recordList: data,
    createRecord: (record: RecordItem) => {
    const record2: RecordItem = clone(record); //record2 为record 的深拷贝，
    record2.createdAt = new Date();
     data && data.push(record2);//将所有组件数据放入 data 中
     recordStore.saveRecords();
  }
}

recordStore.fetchRecords();

export default recordStore;