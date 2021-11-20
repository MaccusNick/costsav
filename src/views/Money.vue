<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <tags :dataSource.sync="tags" @update:selected="onUpdateTags" />
    <notes @update:value="onUpdateNotes" />
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

window.localStorage.setItem('version', '0.0.1')

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;//数据类型 object|string
  createdAt?: Date //类/构造函数
};

@Component({ components: { NumberPad, Tags, Types, Notes } })
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tags: [],
    notes: "",
    type: "",
    amount: 0,
  };
  recordList: Record[] = JSON.parse(
    window.localStorage.getItem("recordList") || "[]"
  );

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2:Record = JSON.parse(JSON.stringify(this.record)); //record2 为record 的深拷贝
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }
  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
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
