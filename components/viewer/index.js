import Viewer from './main';

Viewer.install = function (Vue) {
  Vue.component(Viewer.name, Viewer);
};

export default Viewer;