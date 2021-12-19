<template>
  <div class="nav-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  props: ["classPrefix"],
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
  overflow: auto;
} /*固定内容面*/
</style>
