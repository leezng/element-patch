import Start from './doc/start.md'
import Changelog from './doc/changelog.md'
import TagSelect from './doc/tag-select.md'
import MenuRenderer from './doc/menu-renderer.md'
import FormRenderer from './doc/form-renderer.md'
import Table from './doc/table.md'
import TreeSelect from './doc/tree-select.md'

const routerConfig = {
  routes: [
    { path: '/', redirect: '/start' },
    { path: '/start', component: Start },
    { path: '/changelog', component: Changelog },
    { path: '/tag-select', component: TagSelect },
    { path: '/menu-renderer', component: MenuRenderer },
    { path: '/form-renderer', component: FormRenderer },
    { path: '/table', component: Table },
    { path: '/tree-select', component: TreeSelect }
  ]
}

export default routerConfig
