import { UEStorage } from 'UE/utils/storage';

export default function () {
  return {
    beforeCreate () {
      this.$storage = UEStorage(this.$options.name);
    },
    methods: {
      $_mixin_storeSession (module, key, value, clearKey) {
        if (typeof module !== 'string') return;
        const data = this.$storage.session(module) || {};
        if (typeof value !== 'undefined' || clearKey) {
          clearKey ? delete data[key] : data[key] = value;
          this.$storage.session(module, data);
        } else {
          return data[key];
        }
      }
    }
  }
} 
