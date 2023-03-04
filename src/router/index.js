import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login/Login'
import Home from '@/components/Home/Home'
import Equipos from '@/components/Equipos/Equipos'
import Bases from '@/components/Bases/Bases'
import Aerolineas from '@/components/Aerolineas/Aerolineas'
import Formulario from '@/components/Formulario/Formulario'
import Usuarios from '@/components/Usuarios/Usuarios'
import Clave from '@/components/Clave/Clave'
import ListaFormularios from '@/components/ListaFormularios/ListaFormularios'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/equipos',
      name: 'Equipos',
      component: Equipos
    },
    {
      path: '/bases',
      name: 'Bases',
      component: Bases
    },
    {
      path: '/aerolineas',
      name: 'Aerolineas',
      component: Aerolineas
    },
    {
      path: '/formulario',
      name: 'Formulario',
      component: Formulario
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuarios
    },
    {
      path: '/clave',
      name: 'clave',
      component: Clave
    },
    {
      path: '/lista-formularios',
      name: 'ListaFormularios',
      component: ListaFormularios
    },
  ],
  mode: 'history'
})

