<template>
  <div>
    gchars
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      datas: {
        nodes: [
          {
            color: "#ccc",
            size: '50',
            id: "node1",
            x: 100,
            y: 200,
            label:{
                text:'文字1',
                fill:'white'
            },
            shape: 'rect'
          },
          {
            id: "node2",
            x: 310,
            y: 210
          }
        ],
        edges: [
          {
            id: "edge1",
            target: "node2",
            source: "node1"
          }
        ]
      }
    };
  },
  methods: {
    int() {
      const graph = new G6.Graph({
        container: "mountNode",
        width: 500,
        height: 500
      });
      graph.read(this.datas);
    }
  },
  mounted() {
    this.int();
  }
};
</script>

<style lang="scss" scoped>
</style>