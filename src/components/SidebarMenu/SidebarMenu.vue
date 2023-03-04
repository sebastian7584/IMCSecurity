<template>
    <div>
      <div class="vld-parent">
        <loading :active.syn="isLoading" :can-cancel="true"  :is-full-page="fullPage"></loading>
      </div>
      <b-button v-b-toggle.sidebar-no-header class="menuButton" variant="danger"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg></b-button>
      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
        <template #default="{ hide }">
          <div class="p-3">
            <div class="row">
              <div class="col-9"></div>
              <b-button class="col-2 letra-boton" @click="cerrarSecion">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
              </svg>
              </b-button>
            </div>
            <br>
            <h4 id="sidebar-no-header-title" >MENU</h4>
            <nav class="mb-3">
              <b-nav vertical>
                <ul class="menu">
                    <br><br>
                    <li ><a href="formulario">Crear Formulario</a></li>
                    <li v-if="info.adm" ><a href="usuarios">Administrar Usuarios</a></li>
                    <li v-if="info.adm" ><a href="equipos">Administrar Equipos</a></li>
                    <li v-if="info.adm" ><a href="bases">Administrar Bases</a></li>
                    <li v-if="info.adm" ><a href="aerolineas">Administrar Aerolineas</a></li>
                    <li v-if="info.adm" ><a href="lista-formularios">Administrar Formularios</a></li>
                    

                    
                </ul>
              </b-nav>
            </nav>
            <b-button variant="danger" class="closeMenu" block @click="hide">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </b-button>
          </div>
        </template>
      </b-sidebar>
    </div>
  </template>


<script>
import axios from 'axios'
import router from '../../router'
import backendRouter from  '../BackendRouter/BackendRouter'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


export default {
    
  name: 'SidebarMenu',
  data(){
    return{
        isLoading: true,
        fullPage: true,
        info: {
            adm: false,
            cedula:"",
            nombre:"",
            apellido:"",
        }
    }
  },
  methods:{
    cerrarSecion(){
      this.$cookies.remove('jwt')
      router.push('/login')
    },
    validate(){
        const path = backendRouter.data+'users/check'
        axios.post(path, {'jwt':this.$cookies.get('jwt')}).then((response)=>{
          this.info.adm = response.data.jwt.adm
          this.info.cedula = response.data.jwt.cedula
          this.info.nombre = response.data.jwt.nombre
          this.info.apellido = response.data.jwt.apellido
          this.$emit('adm', this.info)
          
          this.isLoading = false
        })
        .catch((error)=>{
          router.push('/login')
          this.isLoading = false
          this.$swal(error.response.data.detail)
          this.$emit('adm', this.info)

          
        })
        
      }
    
  },
  created(){
    this.validate()
  } ,
  comments:{

  },
  components: {
      Loading
    },

}
</script>

<style>
.btn-danger {
  background-color: #db8023;
  border-color: #db8023;
}

.menuButton{
    position: absolute;
    top: 20px;
    left: 20px;
}

.menu{
    list-style: none;
}

.submenu{
  list-style: none;
}

.menu a{
    font-size: 20px;
    color: black;
    text-decoration: none;
}

.closeMenu{
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.letra-boton{
  font-size: 10px;
}

/* a{
    text-decoration: none;
    color: inherit;
} */



</style>