<template>
  <Layout class-prefix="layout">
    <tags @update:selected="record.tags = $event" />
    <div class="notes">
      <FormItem
        fieldName="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <tabs :dataSource="recordTypeList" :value.sync="record.type" />
    <number-pad :value.sync="record.amount" @update:submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import FormItem from "@/components/Money/FormItem.vue";
import recordTypeList from "@/constants/recordTypeList";
import { Component } from "vue-property-decorator";

type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; //数据类型 object|string
  createdAt?: Date; //类/构造函数
};

@Component({
  components: { NumberPad, Tags, FormItem, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {
    tags: [],
    notes: "",
    type: "",
    amount: 0,
  };

  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record); //负责传入变更数据
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
