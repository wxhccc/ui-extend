import Ticker from './main';

Ticker.install = function (Vue) {
  Vue.component(Ticker.name, Ticker);
};

export default Ticker;