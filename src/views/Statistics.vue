<template>
  <Layout>
    <Tabs class-prefix="type" :dataSource="typeList" :value.sync="type" />
    <div>
      <ol>
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">
            {{ beautify(group.title) }}
            <span>${{ group.total }}</span>
          </h3>
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
  background: #c4c4c4;
  &.selected {
    background: white;
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
import clone from "@/lib/clone";
import dayjs from "dayjs";
import Vue from "vue";
import { Component } from "vue-property-decorator";
console.log(dayjs());
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join(",");
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const recordList = this.recordList;
    // eslint-disable-next-line no-undef
    if (recordList.length === 0) {
      return [];
    }
    // type HashTableValue = { title: string; items: RecordItem[] };
    // const hashTable: { title: string; items: RecordItem[] }[];

    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    // eslint-disable-next-line no-undef
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
      result.map((group) => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });//计算消费总额
    }

    console.log(result);
    return result;

    // console.log(result);//数组中存放最新创建的账单的时间，和所有信息，两个key的对象
    // console.log(last);//拿走数组中的对象
    // console.log(recordList);//未排序的recordList
    // console.log(newList);//从小到大，按照时间排序后的recordList
    // return newList;
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
