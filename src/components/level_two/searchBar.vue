<template lang="html">
  <div id="searchBar">
    <el-row>
      <el-col :span="20">
        <el-row>
          <div v-for="(item, index) in form" :key="index">
            <el-col :span="3" style="padding-top:1%;">{{ item.name }}</el-col>
            <el-col :span="5" style="margin-bottom:1%;"><el-input v-model="item.value"></el-input></el-col>
          </div>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row>
          <el-col :span="24">
            <el-button v-if="form.length > 0" type="primary" @click="toSearch()">查询</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  components: {},
  props: {
    prop: { defalut: () => [] },
  },
  data() {
    return {
      form: [],
    };
  },
  computed: {},
  created() {
    this.$set(this, `form`, this.prop);
  },
  methods: {
    toSearch() {
      //传回去的List<object>是{name:'字段名',value:'值'}
      this.$emit('toSearch', this.form);
    },
  },
};
</script>

<style lang="css" scoped></style>
