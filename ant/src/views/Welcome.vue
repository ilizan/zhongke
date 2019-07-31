<template>
  <div class="pages bgMain">
    <div class="topTool">
      <h1 class="title">工作台</h1>
    </div>
    <div class="dataMain">
      <div class>
        <a-row :gutter="16">
          <a-col class :span="6">
            <div class="box_0">col-6</div>
          </a-col>
          <a-col class :span="6">
            <div class="box_0">col-6</div>
          </a-col>
          <a-col class :span="6">
            <div class="box_0">col-6</div>
          </a-col>
          <a-col class :span="6">
            <div class="box_0">col-6</div>
          </a-col>
        </a-row>
      </div>
      <div class="main_1">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-tabs :tab-bar-style="{paddingLeft: '16px',paddingRight: '16px'}">
              <div slot="tabBarExtraContent">
                
              </div>
              <a-tab-pane tab="销量" key="1">
                <a-row :gutter="16">
                  <a-col class :span="18">
                    <div class="box_1">col-18</div>
                  </a-col>
                  <a-col class :span="6">
                    <div class="box_1">col-6</div>
                  </a-col>
                </a-row>
              </a-tab-pane>
              <a-tab-pane tab="销售额" key="2">
                <a-row :gutter="16">
                  <a-col class :span="18">
                    <div class="box_1">col-18</div>
                  </a-col>
                  <a-col class :span="6">
                    <div class="box_1">col-6</div>
                  </a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
          </a-col>
        </a-row>
      </div>
      <div class="main_2">
        <a-row :gutter="16">
          <a-col :span="12">
            <div class="box_2">col-12</div>
          </a-col>
          <a-col :span="12">
            <div class="box_2">col-12</div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box_0 {
  height: 130px;
  background-color: #fff;
  padding: 10px;
}
.main_1{
  margin-top: 20px;
  background-color: #fff;
}
.main_2 {
  margin-top: 20px;
}
.box_1 {
  min-height: 300px;
  padding: 0 20px;
}
.box_2{
  min-height: 300px;
  padding: 10px;
  background-color: #fff;
}
</style>