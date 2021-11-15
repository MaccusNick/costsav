<template>
  <Layout class-prefix="layout">
    <tags />
    <notes />
    <types :xxx="123" />
    <number-pad />
  </Layout>
</template>

<script>
import NumberPad from "@/components/NumberPad.vue";
import Tags from "@/components/Tags.vue";
import Types from "@/components/Types.vue";
import Notes from "@/components/Notes.vue";
export default {
  components: { NumberPad, Tags, Types, Notes },
  name: "Money",
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
<style lang="scss" scoped></style>
