<template>
  <div>
    打印
    <button @click="set1()">打印测试按钮</button>
  </div>
</template>

<script>
export default {
  methods: {
    set1() {
      var LODOP = getLodop();
      LODOP.SET_LICENSES(
        "",
        "12AC6D772841C6D2DFF9968959673C41",
        "C94CEE276DB2187AE6B65D56B3FC2848",
        ""
      );
      LODOP.PRINT_INIT("打印任务名"); //首先一个初始化语句
      LODOP.SET_PRINT_PAGESIZE(0, 500, 300, ""); //设定纸张大小
      LODOP.ADD_PRINT_TEXT(9, 16, 60, 25, "房间号：");
      LODOP.ADD_PRINT_TEXT(9, 75, 142, 25, "新加文本2");
      LODOP.ADD_PRINT_TEXT(41, 17, 60, 25, "姓名：");
      LODOP.ADD_PRINT_TEXT(42, 76, 141, 25, "新加文本4");
      LODOP.PRINT_DESIGN(); //最后一个打印(或预览、维护、设计)语句
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>