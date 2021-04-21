import { defineComponent, PropType } from 'vue'
import { Button, confirm } from 'UE/ui-comps'
import { ButtonItem, RowDataHandle } from './types';

export default defineComponent({
  name: 'UeActionBtns',
  components: {
    UeButton: Button
  },
  props: {
    data: {
      type: null,
      default: undefined
    },
    extraArgs: {
      type: Array,
      default: () => ([])
    },
    loadingFlags: {
      type: Object,
      default: () => ({})
    },
    btns: {
      type: Array as PropType<ButtonItem[]>,
      default: () => ([])
    }
  },
  computed: {
    handleBtns (): ButtonItem[] {
      return this.btns.filter(item => (!this.propHanlde(item.hide, item)));
    }
  },
  methods: {
    /** utils **/
    getLoadingKey (item: ButtonItem, index: number) {
      return item.loadingKey || item.key || `__btn${index}loading`;
    },
    propHanlde <R, D>(itemProp: RowDataHandle<D, R> | R, item: ButtonItem<D>) {
      return typeof itemProp === 'function' ? (itemProp as RowDataHandle<D, R>)(this.data as D, item, ...this.extraArgs) : itemProp;
    },
    /** logic methods **/
    /** event handle **/
    btnsClick (item: ButtonItem) {
      if (typeof item.click !== 'function') return;
      const { data, extraArgs } = this;
      if (item.isConfirm) {
        const config = this.propHanlde(item.confirmConfig, item) || {
          title: '系统提示',
          content: '确定执行此操作?'
        };
        confirm(config).then(() => {
          (item.click as RowDataHandle<typeof data, unknown>)(data, item, ...extraArgs);
        }).catch(() => undefined);
      } else {
        item.click(data, item, ...extraArgs);
      }
    }
  },
  render() {
    return (
    <div class="ue-action-btns">
      {this.handleBtns.map((item, index) => (
      <ue-button
        { ...this.propHanlde(item.props, item) }
        key={item.key || index}
        class="ue-action-btn"
        type={this.propHanlde(item.btype, item)}
        loading={this.loadingFlags[this.getLoadingKey(item, index)]}
        onClick={this.btnsClick(item)}
      >
        { this.propHanlde(this.loadingFlags[this.getLoadingKey(item, index)] && item.loadingText ? item.loadingText : item.text, item)}
      </ue-button>))
      }
    </div>)
  }
})
