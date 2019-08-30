<template>
  <ue-tree
    :class="{ 'ue-tree-field': true, 'inline-tree-field': inline }"
    ref="treeField"
    v-bind="treeProps"
    :data="handledData"
    :show-checkbox="!readonly"
    @check="onValueChange"
  >
    <template v-if="$scopedSlots.default" v-slot="scope">
      <slot v-bind="scope"></slot>
    </template>
  </ue-tree>
</template>
<script>
import { Tree } from "UE/ui-comps";
import refFnProxyMixin from 'UE/mixins/ref-fn-proxy';
import { pickBy } from "UE/utils/lodash";

export default {
  name: "UeTreeField",
  components: {
    'UeTree': Tree
  },
  mixins: [refFnProxyMixin('treeField', Object.keys(Tree.methods))],
  props: {
    inline: Boolean,
    nodeKey: {
      type: String,
      default: 'id'
    },
    checkMode: {
      type: String,
      default: 'one-way'
    },
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    readonly: Boolean
  },
  computed: {
    checkStrictly () {
      return ['one-way', 'none'].includes(this.checkMode);
    },
    treeProps () {
      const { $attrs, nodeKey, checkStrictly } = this;
      return Object.assign({ defaultExpandAll: true, expandOnClickNode: false }, $attrs, { nodeKey, checkStrictly });
    },
    handledData () {
      const { readonly, data, value } = this;
      return readonly ? this.filterNode(data, value) : data;
    }
  },
  watch: {
    value (newVal) {
      this.$refs.treeField.setCheckedKeys(newVal)
    }
  },
  methods: {
    /** business **/
    filterNode (originList, values) {
      if (originList.length && values.length) {
        const { props, nodeKey } = this.treeProps;
        const childrenKey = (props && props.children) || "children";
        const getAccessItem = list => {
          let arr = [];
          list.forEach(item => {
            if (values.includes(item[nodeKey])) {
              let newItem = pickBy(item, (value, key) => key !== childrenKey);
              item[childrenKey] &&
                item[childrenKey].length &&
                (newItem[childrenKey] = getAccessItem(item[childrenKey]));
              arr.push(newItem);
            }
          });
          return arr;
        };
        return getAccessItem(originList);
      }
    },
    // 递归处理权限树选中状态
    setChildrenNodeCheck (node, checked) {
      const { treeField } = this.$refs;
      Array.isArray(node.childNodes) &&
        node.childNodes.forEach(cnode => {
          cnode.checked !== checked &&
            treeField.setChecked(cnode.data, checked);
          this.setChildrenNodeCheck(cnode, checked);
        });
    },
    setParentNodeCheck (node) {
      const { treeField } = this.$refs;
      let { parent } = node;
      while (parent) {
        treeField.setChecked(parent.data, true);
        parent = parent.parent;
      }
    },
    /** event **/
    onValueChange (data) {
      const { treeField } = this.$refs;
      if (this.checkMode === 'one-way') {
        const curNode = treeField.getNode(data);
        const { checked } = curNode;
        checked && this.setParentNodeCheck(curNode);
        this.setChildrenNodeCheck(curNode, checked);
      }
      this.$emit("input", treeField.getCheckedKeys());
    }
  }
};
</script>
<style lang="scss">
.ue-tree-field {
  &.inline-tree-field {
    display: flex;
    flex-wrap: wrap;
    background-color: transparent;
    & > .el-tree-node {
      padding-right: 12px;
    }
  }
}
</style>
