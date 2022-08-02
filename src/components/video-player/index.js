import PagedList from './main';

PagedList.install = function (Vue) {
  Vue.component(PagedList.name, PagedList);
};

export default PagedList;