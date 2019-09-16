import RemoteCascader from './main';

RemoteCascader.install = function (Vue) {
  Vue.component(RemoteCascader.name, RemoteCascader);
};

export default RemoteCascader;