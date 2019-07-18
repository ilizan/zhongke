<template>
  <div class="pages bgMain">
    <div class="topTool">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>列表</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>表单</a-breadcrumb-item>
      </a-breadcrumb>
      <h1 class="title">xxx模块</h1>
    </div>

    <div class="dataList">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="信息1"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            placeholder="请输入"
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入' }]}
          ]"
            name="name"
          />
        </a-form-item>
        <a-form-item
          label="信息2"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input placeholder="请输入" />
        </a-form-item>
        <a-form-item
          label="信息3"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-range-picker style="width:100%;" />
        </a-form-item>
        <a-form-item
          label="描述"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-textarea :rows="3" />
        </a-form-item>
        <a-form-item
          label="比例"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input-number :min="1" :max="100" :defaultValue="5" />%
        </a-form-item>
        <a-form-item
          label="性别"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-radio-group name="radioGroup" :defaultValue="1">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }" style="text-align: center;">
          <a-button htmlType="submit" type="primary">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "forms",
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout: { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log("Received values of form: ", values);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>