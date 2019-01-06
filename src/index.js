import components from './components'
import plugs from './plugs'

const list = {
  ...components,
  ...plugs
}

function install (Vue, opts = {}) {
  Object.keys(list).forEach(key => {
    const component = list[key]
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components,
  ...plugs
}
