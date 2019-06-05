<template lang="html">
  <div id="levelTwoHeader">
    <el-row>
      <el-col :span="4" style="padding-top:2%;">
        {{ title }}
      </el-col>
      <el-col :span="12">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'levelTwoHeader',
  components: {},
  props: {
    title: { type: String, default: `列表标题` },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    toAdd() {
      this.$emit('toAdd');
    },
  },
};
</script>

<style lang="css" scoped>
.el-row{
  margin-bottom: 10px;
}
</style>
