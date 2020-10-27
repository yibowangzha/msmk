import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from "@/views/Home"
import Index from "@/components/Index"
import Couser from "@/components/Couser"
import Exercise from "@/components/Exercise"
import Lar from "@/components/Lar"
import My from "@/components/My"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:"/index", //默认显示index页面
    children:[  
        {
          path:"/index",  //首页路由
          name:"Index",
          component:Index
        },
        {
          path:"/couser",  //课程路由
          name:"couser",
          component:Couser
        },
        {
          path:"/lar",  //约课记录路由
          name:"Lar",
          component:Lar
        },
        {
          path:"/exercise",  //练习路由
          name:"exercise",
          component:Exercise
        },
        {
          path:"/my",  //我的路由
          name:"My",
          component:My
        },

    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
