<template>
  <Layout class-prefix="layout">
    <tags :dataSource.sync="tags" @update:selected="onUpdateTags" />
    <div class="notes">
      <FormItem
        fieldName="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <types :type.sync="record.type" />
    <number-pad :value.sync="record.amount" @update:submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "@/models/recordListModel";

const recordList: RecordItem[] = recordListModel.fetch(); //读取当前localStorage中存储的Record数据

// window.localStorage.setItem("version", "0.0.1");
// const recordList: RecordItem[] = JSON.parse(window.localStorage.getItem('recordList') || '[]')

type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型 object|string
  createdAt?: Date; //类/构造函数
};

@Component({ components: { NumberPad, Tags, Types, FormItem } })
export default class Money extends Vue {
  tags = window.tagList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "",
    amount: 0,
  };
  recordList: RecordItem[] = recordList; //用来放置所有record的更新数据，同时负责接收来自recordListModel的数据，起到了中转站的作用。

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    recordListModel.create(this.record); //负责传入变更数据
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(); //在recordList数据变动后，将数据存入localStorage中
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.notes {
  padding: 12px;
}
</style>
