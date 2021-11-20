<template>
  <div>
    <label class="notes">
      {{ value }}
      <span class="name">备注</span>
      <input
        class="value"
        type="text"
        placeholder="在这里输入备注"
        v-model="value"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
  @Watch("value")
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}


</script>

<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  display: block;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    color: cadetblue;
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
