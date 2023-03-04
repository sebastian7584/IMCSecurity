<template>
    <div>
      <SidebarMenu @adm="funtion"  />
        <div class="col-md-12" v-if="create==true">
            <b-button type="button" name="button" class="btn btn-danger float-right" @click="mesagge=true">Crear Usuario Nuevo</b-button>
            <b-table v-if="items.length>0" striped hover :items="items" :fields="fields">
                <template v-slot:cell(action)="data">
                    <b-button size="sm" variant="danger" @click="selectItem(data)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </b-button>   
                    <b-button size="sm" variant="danger" @click="resetPassword(data)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key-fill" viewBox="0 0 16 16">
                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                    </b-button>   
                </template>
            </b-table>
        </div>




        <div v-if="mesagge" class="overlay">
            <div class="popup">
                <h1>Crear Usuario Nuevo</h1>
                <div class="row">
                    <label class="col-3">Cedula</label>
                    <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Cedula"  v-model.trim="form.cedula">
                </div>
                <div class="row">
                    <label class="col-3">Nombre</label>
                    <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Nombre"  v-model.trim="form.nombre">
                </div>
                <div class="row">
                    <label class="col-3">Apellido</label>
                    <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Apellido"  v-model.trim="form.apellido">
                </div>
                <div class="row">
                    <label class="col-3">Ubicacion</label>
                    <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Ubicacion"  v-model.trim="form.place">
                </div>
                <div class="row">
                    <label class="col-3">Usuario</label>
                    <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Usuario"  v-model.trim="form.user">
                </div>
                <br/>
                <div class="d-flex justify-content-between">
                    <b-button type="button" name="button" variant="danger" @click="createUsuario">GUARDAR</b-button>
                    <b-button type="button" name="button"  @click="mesagge=false">CANCELAR</b-button>
                
                </div>
                
            </div>
        </div>
      

        
        <div class="user_card col-8 m-5" v-if="create==false">
            <br/>
            <div class="form-group row">
                <label class="col-lg-2 col-5" for="exampleInputEmail1">Cedula</label>
                <input type="text" class="form-control col-6" id="fecha" aria-describedby="emailHelp" placeholder="Codigo equipo" readonly v-model.trim="form.cedula">
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-5" for="exampleInputEmail1">Nombre</label>
                <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Codigo equipo" readonly v-model.trim="form.nombre">
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-5" for="exampleInputEmail1">Apellido</label>
                <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Codigo equipo" readonly v-model.trim="form.apellido">
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-5" for="exampleInputEmail1">Usuario</label>
                <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Codigo equipo" readonly v-model.trim="form.user">
            </div>
            <div class="form-group row">
                <label class="col-lg-2 col-5" for="exampleInputEmail1">Ubicacion</label>
                <input type="text" class="form-control col-6" id="equipo" aria-describedby="emailHelp" placeholder="Codigo equipo" v-model.trim="form.place">
            </div>
            

            <div class="form-check">
                <label><input type="checkbox"  id="ACTIVO" v-model="form.active"> ACTIVO</label>
            </div>
            <div>
                <b-button type="button" name="button" class="col-lg-2 col-6" variant="danger" @click="editUsuario">GUARDAR</b-button>
                <b-button type="button" name="button" class="col-lg-2 col-6" @click="create=true">CANCELAR</b-button>
            </div>
            
        </div>
        
      
   
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
        mesagge:false,
        create: true,
        isLoading:true,
        adm : false,
        items:[],
        fields:[
            {key:'cedula', label:'Cedula'},
            {key:'nombre', label:'Nombre'},
            {key:'apellido', label:'Apellido'},
            {key:'user', label:'Usuario'},
            {key:'place', label:'Ubicacion'},
            {key:'active', label:'Estado'},
            {key:'action', label:''},
        ],
        form:{
            user:'',
            place:'',
            cedula:'',
            nombre:'',
            apellido:'',
        },
        options: [
            { value: 'nuevo', label: 'nuevo' },
            { value: 'desabordado', label: 'desabordado' },
            { value: 'pesado', label: 'pesado' },
            { value: 'abordaje', label: 'abordaje' }
        ]
      }
    },
    components: {
      SidebarMenu,
    },
    methods:{

      getData(){
        this.isLoading = true
        const path = backendRouter.data+'users/admin'
        axios.get(path).then((response)=>{
            this.isLoading = false
            this.items = response.data
            
            
        })

      },

      editUsuario(){
        const path = backendRouter.data+'users/admin'
        axios.put(path, this.form).then((response)=>{
            this.isLoading = false
            this.create= true
            this.$swal('Equipo editado')
            this.getData()
        })
      },

      
      createUsuario(){
          const path = backendRouter.data+'users/admin'
          axios.post(path,this.form).then((response)=>{
              this.mesagge=false
              this.$swal('Item creado')
              this.getData()
              this.form = {
                  serial:'',
                  user:'',
                  place:'',
                  cedula:'',
                  nombre:'',
                  apellido:'',
                  password:'',
                  password2:'',
                }
            })
            .catch((error)=>{
                this.$swal(error.response.data.detail)
                this.form = {
                  serial:'',
                  user:'',
                  place:'',
                  cedula:'',
                  nombre:'',
                  apellido:'',
                  password:'',
                  password2:'',
                }
            })
            
            
            
        },
        
        resetPassword(data){
            this.form.serial = data.item.serial
            this.form.password = data.item.cedula
            this.form.password2 = data.item.cedula
            const path = backendRouter.data+'users/reset'
            axios.post(path,this.form).then((response)=>{
                this.$swal('clave reiniciada a numero de documento')
                this.form = {
                  serial:'',
                  user:'',
                  place:'',
                  cedula:'',
                  nombre:'',
                  apellido:'',
                  password:'',
                  password2:'',
                }
            })



        },

      selectItem(data){
        this.form.serial = data.item.serial
        this.form.cedula = data.item.cedula
        this.form.nombre = data.item.nombre
        this.form.apellido = data.item.apellido
        this.form.user = data.item.user
        this.form.password = data.item.password
        this.form.place = data.item.place
        this.form.active = data.item.active
        this.create=false

      }, 

      funtion(valor){
        this.adm=(valor.adm)
        if (this.adm==false){router.push('/login')}
        else{
            this.getData()
        }
      },
      
      
    },
    created(){
      
      
    }
  
  }
  </script>

<style>
.user_card {
			
			margin-top: auto;
			margin-bottom: auto;
			background: #ffff;
			position: relative;
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 10px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			border-radius: 5px;

		}
        
.create {
  z-index: 9999;
  width: 200px;
  height: 200px;
  background-color: red;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
  z-index: 1000;
}
</style>