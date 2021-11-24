<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <input
        class="value"
        type="text"
        :placeholder="this.placeholder"
        v-model="value"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = "";
  @Prop({ required: true }) fieldName!: string;
  @Prop({ default: "" }) placeholder?: string;

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
