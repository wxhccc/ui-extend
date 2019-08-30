<template>
  <div>
    <p>
      选择类型: 
      <el-radio-group v-model="type">
        <el-radio label="checkbox">多选</el-radio><el-radio label="radio">单选</el-radio>
      </el-radio-group>
    </p>
    <p v-if="isCheckbox">
      是否分页多选: <el-switch v-model="isCheckboxReserve" active-text="是" inactive-text="否"></el-switch>
    </p>
    <p v-if="!isCheckbox">
      是否分页单选: <el-switch v-model="isRadioGroup" active-text="是" inactive-text="否"></el-switch>
    </p>
    <p>
      <el-input style="width: 300px;" v-model="selectionsString" :placeholder="type === 'checkbox' ? '输入ids，用英文,分隔' : '输入id'"></el-input>
      <el-button @click="changeSelections">修改selections</el-button>
    </p>
    selectionValue: {{selectionValue}}
    <ue-data-table
      row-key="id"
      :columns="columns"
      :data="pageData[curPage - 1]"
      :selectionValue.sync="selectionValue"
      :key="type + isRadioGroup + isCheckboxReserve"
    >
    </ue-data-table>
    <br/>
    <el-pagination background :current-page.sync="curPage" layout="pager" :page-size="4" :total="8"></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'checkbox',
      isRadioGroup: false,
      isCheckboxReserve: false,
      selectionsString: '',
      selectionValues: [],
      pageSelectionValues: {
        1: 1,
        2: 13
      },
      curPage: 1,
      pageData: [
        [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 4,
          date: '2016-05-13',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        [{
          id: 13,
          date: '2016-06-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 28,
          date: '2016-06-04',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 47,
          date: '2016-06-01',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 14,
          date: '2016-06-13',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      ]
    }
  },
  computed: {
    columns () {
      return [
        { selection: this.type, reserveSelection: this.isCheckboxReserve },
        { prop: 'date', label: '日期', width: '180' },
        { prop: 'name', label: '姓名', width: '180' },
        { prop: 'address', label: '地址' }
      ]
    },
    workPage () {
      return this.isRadioGroup ? this.curPage : 1
    },
    isCheckbox () {
      return this.type === 'checkbox';
    },
    selectionValue: {
      get () { return this.isCheckbox ? this.selectionValues : this.pageSelectionValues[this.workPage] },
      set (val) { this.isCheckbox ? (this.selectionValues = val) : (this.pageSelectionValues[this.workPage] = val) }
    }
  },
  watch: {
    selectionValue () {
      this.selectionsString = this.isCheckbox ? this.selectionValue.join(',') : this.selectionValue
    }
  },
  methods: {
    changeSelections () {
      this.selectionValue = this.selectionsString && (this.isCheckbox ? this.selectionsString.split(',').map(item => parseInt(item)) : parseInt(this.selectionsString))
    }
  }
}
</script>