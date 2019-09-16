import CommonField from './main';

CommonField.install = function (Vue) {
  Vue.component(CommonField.name, CommonField);
};

export default CommonField;