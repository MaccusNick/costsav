<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="Money" />
      <div>记账</div>
    </router-link>

    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="Label" />标签
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="Statistics" /> 统计
    </router-link>
  </nav>
</template>

<script lang="ts">
// import x from "@/assets/icons/Label.svg";
// console.log(x);

export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(32, 160, 255);
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    font-size: 15px;

    .icon {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
