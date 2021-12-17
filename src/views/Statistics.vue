<template>
  <Layout>
    <Tabs class-prefix="type" :dataSource="typeList" :value.sync="type" />
    <Tabs
      class-prefix="interval"
      :dataSource="intervalList"
      :value.sync="interval"
    />
    <div>
      <ol>
        <li v-for="(group, index) in result" :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span> {{ tagString(item.tags) }}</span>
              <span class="note">{{ item.notes }}</span>
              <span>${{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}
%item {
  padding: 8px 16px;
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.note {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join(",");
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const recordList = this.recordList;
    // eslint-disable-next-line no-undef
    type HashTableValue = { title: string; items: RecordItem[] };
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [date, time] = recordList[i].createdAt!.split("T");
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }

    return hashTable;
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  typeList = recordTypeList;
}
</script>
