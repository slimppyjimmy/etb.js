import ListMnt from './ListMnt/index.vue'
import SearchBar from './SearchBar/index.vue'
import TreeMnt from './TreeMnt/index.vue'
import Dialog from './Dialog/index.vue'
import Collapse from './Collapse /index.vue'
const components=[
    ListMnt,
    SearchBar,
    TreeMnt,
    Dialog,
    Collapse
]

const install=(Vue)=>{
    for(let key in components){
        Vue.component(components[key].name,components[key])
    }
}

export default install