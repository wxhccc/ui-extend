<template>
  <div v-if="columns && getPagedData" class="ue-common-list-page">
    <div class="ue-search-form" :currentTab="currentTabKey">
      <slot name="export">
        <div class="export-btn" v-if="exportUrl">
          <a :href="exportUrl" target="_blank">
            <el-button v-bind="exportOpts.btnProps" v-on="exportOpts.events">
              {{exportOpts.text}}
            </el-button>
          </a>
        </div>
      </slot>
      <template v-if="searchForms">
        <ue-tabs
          v-if="hasTabs"
          class="ue-search-form-tabs"
          v-bind="tabsProps"
          v-model="curTab"
        >
          <ue-tab-pane v-for="item of searchForms" :label="item.label" :name="item.name" :key="item.name">
            <ue-search-form
              v-if="Array.isArray(item.items)"
              ref="searchForms"
              v-bind="getSearchFormProps(item, item.name)"
              :searching="loading"
              @search="formSearching"
            >
              <template v-if="item.defaultSlot">
                <component :is="item.defaultSlot"></component>
              </template>
              <template v-if="item.buttonSlot" #button>
                <component :is="item.buttonSlot"></component>
              </template>
            </ue-search-form>
          </ue-tab-pane>
        </ue-tabs>
        <ue-search-form
          ref="searchForm"
          v-else-if="Array.isArray(searchForms.items)"
          v-bind="getSearchFormProps(searchForms)"
          :searching="loading"
          @search="formSearching"
        >
          <template v-if="searchForms.defaultSlot">
            <component :is="searchForms.defaultSlot"></component>
          </template>
          <template v-if="searchForms.buttonSlot" #button>
            <component :is="searchForms.buttonSlot"></component>
          </template>
        </ue-search-form>
      </template>
    </div>
    <slot></slot>
    <div class="ue-table-operation">
      <slot name="operation">
        <div class="operation-btns-pane" v-if="handleOperation">
          <template v-if="handleOperation.show">
            <component
              class="operation-item"
              v-for="(item, index) in handleOperation.items"
              :is="item.component || 'UeButton'"
              :loading="handleOperation.lockKeys && handleOperation.lockKeys[item.lockingKey]"
              v-bind="opeBtnProps(item.props)"
              v-on="item.events"
              :key="item.key || index"
            >
              {{item.text}}
            </component>
          </template>
        </div>
      </slot>
    </div>
    <ue-paged-table
      v-if="columns.length"
      ref="UePagedTable"
      v-bind="pagedTableProps"
      v-on="$listeners"
      :extra-form="handleExtraForm"
    >
    </ue-paged-table>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss">
.ue-common-list-page {
  .ue-search-form {
    position: relative;
    margin: 16px 0;
  }
  .ue-search-form-tabs {
    background-color: #fff;
    .el-tabs__nav-wrap {
      padding-left: 40px;
    }
  }
  .export-btn {
    position: absolute;
    right: 0;
    top: -40px;
  }
  .ue-table-operation {
    .operation-item {
      margin: 0 20px 12px 0;
    }
  }
}
</style>
