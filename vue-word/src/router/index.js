import Vue from 'vue'
import Router from 'vue-router'
import Word from '@/components/Word'
import Answer from '@/components/Answer'
import Translate from '@/components/Translate'
import User from '@/components/User'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Word',
      component: Word
    },
    {
      path: '/Word',
      name: 'Word',
      component: Word
    },
    {
      path: '/Answer',
      name: 'Answer',
      component: Answer
    },
    {
      path: '/Translate',
      name: 'Translate',
      component: Translate
    },
    {
      path: '/Translate/:en',//点击单词表的在线翻译跳转地址
      name: 'Translate',
      component: Translate
    },
    {
      path: '/User',
      name: 'User',
      component: User
    }
  ]
})
