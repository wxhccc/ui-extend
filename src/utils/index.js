export * from './formatter'

/***
** 动态加载远程js脚本
* {string} url 远程js脚本地址
** 返回值: promise 对象
***/
export function loadjs (url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    script.onload = resolve
    script.onerror = reject
  })
}
