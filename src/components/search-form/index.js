import SearchForm from './main';

SearchForm.install = function (Vue) {
  Vue.component(SearchForm.name, SearchForm);
};

export default SearchForm;