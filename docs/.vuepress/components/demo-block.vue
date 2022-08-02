
<script setup lang="ts">
import { ref, watch, computed, useSlots, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'
import codeStrParse from '../utils/strip-code'

const el = ref<HTMLDivElement>()
const meta = ref<HTMLDivElement>()
const control = ref<HTMLDivElement>()
const route = useRoute()
const slots = useSlots()
const codepen= ref({
  script: '',
  html: '',
  style: ''
})
const hovering = ref(false)
const isExpanded = ref(false)
const fixedControl = ref(false)
const scrollParent = ref<Window | null>(null)
const controlBarStyle = ref({ width: '858px' })

const lang = computed(() => 'zh-CN')
const langConfig = computed(() => ({
  'hide-text': '显示代码',
  'show-text': '隐藏代码',
  'tooltip-text': '前往codepen.io运行示例',
  'button-text': '在线运行'
}))

const compNameClass = computed(() => route.path.split('/').pop()?.split('.')[0])
const blockClass = computed(() => `demo-${ lang.value } demo-${ compNameClass.value }`)

const controlText = computed(() => langConfig.value[isExpanded.value ? 'hide-text' : 'show-text'])


const codeAreaHeight = computed(() => {
  const description = el.value?.getElementsByClassName('description')
  const highlight = el.value?.getElementsByClassName('highlight')
  const highlightHeight = highlight ? highlight[0].clientHeight : 0
  if (description && description.length > 0) {
    return description[0].clientHeight +
      highlightHeight + 20
  }
  return highlightHeight
})
const getCodeStrs = () => {
  const { highlight } = slots
  const [element] = highlight ? highlight() : []
  if (element) {
    const content = (element as any).textContent;
    codepen.value = codeStrParse(content)
  }
}
const goCodepen = () => {
  const { script, html, style } = codepen.value
  const { $elVersion = '2.2.10', $ueVersion = '1.0.0' } = {}
  const tag = 'script'
  const resourcesTpl = [
    `<${tag} src="//unpkg.com/vue/dist/vue.js"></${tag}>`,
    `<${tag} src="//unpkg.com/element-ui@${ $elVersion }/lib/index.js"></${tag}>`,
    `<${tag} src="//unpkg.com/@wxhccc/ui-extend@${ $ueVersion }/lib/index.js"></${tag}>`
  ].join('\n');
  let jsTpl = (script || '').replace(/export default/, 'var Main =').trim();
  let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
  let cssTpl = `@import url("//unpkg.com/element-ui@${ $elVersion }/lib/theme-chalk/index.css");\n${(style || '').trim()}\n`;
  jsTpl = jsTpl
    ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
    : 'new Vue().$mount(\'#app\')';
  const data = {
    js: jsTpl,
    css: cssTpl,
    html: htmlTpl
  };
  const form = (document.getElementById('fiddle-form') || document.createElement('form')) as HTMLFormElement
  while (form.firstChild) {
    form.removeChild(form.firstChild);
  }
  form.method = 'POST';
  form.action = 'https://codepen.io/pen/define/';
  form.target = '_blank';
  form.style.display = 'none';

  const input = document.createElement('input');
  input.setAttribute('name', 'data');
  input.setAttribute('type', 'hidden');
  input.setAttribute('value', JSON.stringify(data));

  form.appendChild(input);
  document.body.appendChild(form);

  form.submit()
}

const scrollHandler = () => {
  const { top = 0, bottom = 0, left = 0 } = meta.value?.getBoundingClientRect() || {}
  const docHeight = document.documentElement.clientHeight
  fixedControl.value = bottom > docHeight && (top + 44) <= docHeight
  const controlEl = control.value
  if (controlEl) {
    controlEl.style.left = fixedControl.value ? `${ left }px` : '0'
  }
}

const removeScrollHandler = () => {
  scrollParent.value?.removeEventListener('scroll', scrollHandler);
}

watch(isExpanded, (val) => {

  meta.value && (meta.value.style.height = val ? `${ codeAreaHeight.value + 1 }px` : '0')
  if (!val) {
    fixedControl.value = false;
    control.value && (control.value.style.left = '0')
    removeScrollHandler()
    return;
  }
  window.setTimeout(() => {
    scrollParent.value = window;
    scrollParent.value.addEventListener('scroll', scrollHandler);
    scrollHandler()
  }, 200);
})

onMounted(() => {
  getCodeStrs()
  nextTick(() => {
    if (!el.value) {
      return
    }
    const highlight = (el.value.getElementsByClassName('highlight')[0] as HTMLDivElement)
    if (el.value?.getElementsByClassName('description').length === 0 && highlight) {
      highlight.style.width = '100%';
      highlight.style.borderRight = 'none';
    }
    controlBarStyle.value = { width: el.value.offsetWidth + 'px' }
  })
})

onBeforeUnmount(removeScrollHandler)

</script>
<script lang="ts">
export default { name: 'DemoBlock' }
</script>
<template>
  <div
    ref="el"
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      ref="control"
      :class="{ 'is-fixed': fixedControl }"
      :style="fixedControl ? controlBarStyle : {}"
      @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <el-icon :class="{ 'hovering': hovering }">
          <caret-top v-if="isExpanded"></caret-top>
          <caret-bottom v-else></caret-bottom>
        </el-icon>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <el-tooltip effect="dark" :content="langConfig['tooltip-text']" placement="right">
        <transition name="text-slide">
          <el-button
            v-show="hovering || isExpanded"
            size="small"
            link
            class="control-button"
            @click.stop="goCodepen">
            {{ langConfig['button-text'] }}
          </el-button>
        </transition>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: .2s;
  table {
    margin: 0;
  }
  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height .2s;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
  
    &.is-fixed {
      position: fixed;
      bottom: 0;
      z-index: 100;
    }

    i {
      font-size: 16px;
      line-height: 44px;
      transition: .3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: .3s;
      display: inline-block;
    }

    &:hover {
      color: #409EFF;
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }
    
    .control-button {
      line-height: 26px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      padding-left: 5px;
      padding-right: 25px;
    }
  }
}
</style>
