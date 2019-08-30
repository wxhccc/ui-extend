import DataTable from './src';

DataTable.install = function (Vue) {
  Vue.component(DataTable.name, DataTable);
};

export default DataTable;