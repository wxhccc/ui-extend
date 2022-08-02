import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

export default [
  {
    name: "v-15814726",
    path: "/wiki/",
    component: Vuepress,
    meta: { title: "" },
  },
  {
    path: "/wiki/index.html",
    redirect: "/wiki/",
  },
  {
    path: "/wiki/README.md",
    redirect: "/wiki/",
  },
]
