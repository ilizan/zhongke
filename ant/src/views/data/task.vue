<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>列表</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>任务管理</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">任务管理</h1>
    </div>

    <div class="dataList">
      <a-row :gutter="20">
        <a-col :span="8">
            <a-button type="primary" @click="isShow = true">添加任务</a-button>
        </a-col>
      </a-row>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="任务1" key="1">任务1</a-tab-pane>
        <a-tab-pane tab="任务2" key="2" forceRender>任务2</a-tab-pane>
        <a-tab-pane tab="任务3" key="3">任务3</a-tab-pane>
      </a-tabs>
    </div>
    <a-modal
      title="添加任务"
      v-model="isShow"
    >
        <div>
            表单区域
        </div>
    </a-modal>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isShow:false
        }
    },
};
</script>

<style lang="scss" scoped>
</style>