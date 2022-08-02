import { defineAsyncComponent } from 'vue'

export const pagesComponent = {
  "/": defineAsyncComponent(() => import(/* webpackChunkName: "v-8daa1a0e" */"/Volumes/data/www/wxhccc/ui-extend/docs/.vuepress/.temp/pages/README.vue")),
  "/test.html": defineAsyncComponent(() => import(/* webpackChunkName: "v-953546a4" */"/Volumes/data/www/wxhccc/ui-extend/docs/.vuepress/.temp/pages/test.vue")),
  "/404.html": defineAsyncComponent(() => import(/* webpackChunkName: "v-3706649a" */"/Volumes/data/www/wxhccc/ui-extend/docs/.vuepress/.temp/pages/404.html.vue")),
}
