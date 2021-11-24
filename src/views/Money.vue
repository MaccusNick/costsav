<template>
  <Layout class-prefix="layout">
    <tags :dataSource.sync="tags" @update:selected="onUpdateTags" />
    <notes
      fieldName="备注"
      placeholder="在这里输入备注"
      @update:value="onUpdateNotes"
    />
    <types :type.sync="record.type" />
    <number-pad :value.sync="record.amount" @update:submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/NumberPad.vue";
import Tags from "@/components/Tags.vue";
import Types from "@/components/Types.vue";
import Notes from "@/components/Notes.vue";
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const recordList: RecordItem[] = recordListModel.fetch();
const tagList = tagListModel.fetch();

// window.localStorage.setItem("version", "0.0.1");
// const recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')

type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型 object|string
  createdAt?: Date; //类/构造函数
};

@Component({ components: { NumberPad, Tags, Types, Notes } })
export default class Money extends Vue {
  tags = tagList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "",
    amount: 0,
  };
  recordList: RecordItem[] = recordList;

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record); //record2 为record 的深拷贝
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
<style lang="scss" scoped></style>
