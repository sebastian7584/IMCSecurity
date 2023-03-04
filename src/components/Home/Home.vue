<template>
    <div>
      <SidebarMenu @adm="funtion"  />
      <div class="vld-parent">
        <loading :active.syn="isLoading" :can-cancel="true"  :is-full-page="fullPage"></loading>
      </div>

      <h1>Bienvenido {{ nombre }} {{ apellido }}</h1>
   
    </div>
    
  </template>
  
  <script>
  import axios from 'axios'
  import router from '../../router'
  import SidebarMenu from '../SidebarMenu/SidebarMenu.vue'
  import backendRouter from  '../BackendRouter/BackendRouter'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  
  export default {
    name: 'Home',
    data() {
      return {
        isLoading: false,
        fullPage: true,
        adm : false,
        cedula:"",
        nombre:"",
        apellido:"",
        check:false
      }
    },
    components: {
      SidebarMenu,
      Loading
    },
    methods:{
      funtion(valor){
        this.adm = valor.adm
        this.cedula = valor.cedula
        this.nombre = valor.nombre
        this.apellido = valor.apellido
        
      },
      
      
    },
    created(){
      
      
    }
  
  }
  </script>
  