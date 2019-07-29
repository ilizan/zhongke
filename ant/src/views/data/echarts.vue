<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>列表</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>echarts</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">echarts</h1>
    </div>
    <div class="dataList">
      <div>
        <div id="myChart" :style="{width: '1200px', height: '300px'}"></div>
      </div>
      <h2>动态(随机数)</h2>
      <div>
        <div id="a1" :style="{width: '1100px', height: '300px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    line() {
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let title = [
        "06月30日",
        "07月01日",
        "07月02日",
        "07月03日",
        "07月04日",
        "07月05日",
        "07月06日",
        "07月07日",
        "07月08日",
        "07月09日",
        "07月10日",
        "07月11日",
        "07月12日",
        "07月13日",
        "07月14日",
        "07月15日",
        "07月16日",
        "07月17日",
        "07月18日",
        "07月19日",
        "07月20日",
        "07月21日",
        "07月22日",
        "07月23日",
        "07月24日",
        "07月25日",
        "07月26日",
        "07月27日",
        "07月28日",
        "07月29日"
      ];
      let data1 = [
        "0",
        "2",
        "2",
        "5",
        "0",
        "4",
        "0",
        "0",
        "1",
        "3",
        "2",
        "3",
        "5",
        "0",
        "0",
        "0",
        "1",
        "2",
        "4",
        "5",
        "0",
        "0",
        "6",
        "6",
        "2",
        "5",
        "0",
        "0",
        "0",
        "14"
      ];
      let data2 = [
        "0",
        "210000",
        "150000",
        "450000",
        "0",
        "440000",
        "0",
        "0",
        "200000",
        "606000",
        "268000",
        "360000",
        "488200",
        "0",
        "0",
        "0",
        "200000",
        "400000",
        "293001",
        "970000",
        "0",
        "0",
        "300000",
        "144000",
        "280000",
        "307600",
        "0",
        "0",
        "0",
        "325640"
      ];
      //绘制
      myChart.setOption({
        title: {
          text: "title",
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["订单数量", "销售金额"],
          x: "left"
        },
        xAxis: {
          //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]

          type: "category",
          data: title,
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: [
          {
            type: "value",
            name: "数量",
            min: 0,
            //interval: 50,
            axisLabel: {
              formatter: "{value} 个"
            }
          },
          {
            type: "value",
            name: "金额",
            min: 0,
            //interval: 5,
            axisLabel: {
              formatter: "{value} 元"
            }
          }
        ],
        series: [
          {
            name: "订单数量",
            type: "bar",
            data: data1
          },
          {
            name: "销售金额",
            type: "line",
            yAxisIndex: 1,
            data: data2
          }
        ],
        dataZoom: [
          {
            type: "inside" //滚动缩放
          }
        ],
        grid: {
          left: "5",
          right: "5",
          bottom: "5",
          containLabel: true
        }
      });
    },
    line2() {
      let myChart = this.$echarts.init(document.getElementById("a1"));
      let title = ["06月30日", "07月01日", "07月02日", "07月03日", "07月04日"];
      let data1 = ["0", "2", "2", "5", "0"];
      let data2 = ["0", "667", "444", "222", "0"];
      //绘制
      let option = {
        title: {
          text: "title",
          x: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["订单数量", "销售金额"],
          x: "left"
        },
        xAxis: {
          //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]

          type: "category",
          data: title,
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: [
          {
            type: "value",
            name: "数量",
            min: 0,
            //interval: 50,
            axisLabel: {
              formatter: "{value} 个"
            }
          },
          {
            type: "value",
            name: "金额",
            min: 0,
            //interval: 5,
            axisLabel: {
              formatter: "{value} 元"
            }
          }
        ],
        series: [
          {
            name: "订单数量",
            type: "bar",
            data: data1
          },
          {
            name: "销售金额",
            type: "line",
            yAxisIndex: 1,
            data: data2
          }
        ],
        dataZoom: [
          {
            type: "inside" //滚动缩放
          }
        ],
        grid: {
          left: "5",
          right: "5",
          bottom: "5",
          containLabel: true
        }
      };
      let count = 5;
      var axisData = "";
      setInterval(function() {
        axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        // data0.shift();
        // data0.push(Math.round(Math.random() * 100));
        // data0.push(10);
        // data1.shift();
        // data1.push(Math.round(Math.random() * 100));
        // data1.push(15);

        option.xAxis.data.shift();
        option.xAxis.data.push(axisData);

        option.series[0].data.shift();
        option.series[0].data.push(Math.round(Math.random() * 100));
        option.series[1].data.shift();
        option.series[1].data.push(Math.round(Math.random() * 100));

        myChart.setOption(option);
      }, 2000);
    }
  },
  mounted() {
    this.line();
    this.line2();
  }
};
</script>

<style lang="scss" scoped>

</style>