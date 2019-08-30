import MultiAlert from './main';

MultiAlert.install = function (Vue) {
  Vue.component(MultiAlert.name, MultiAlert);
};

export default MultiAlert;