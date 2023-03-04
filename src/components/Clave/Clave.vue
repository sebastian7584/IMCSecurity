
<template>
    <div>
        <div class="vld-parent">
            <loading :active.syn="isLoading" :can-cancel="true"  :is-full-page="fullPage"></loading>
        </div>
        <div v-if="true"  class="overlay">
            <div class="popup">
                <h1>Establecer Contraseña</h1>
                <br/>
                <div class="row p-3">
                    <div class="col-3">Contraseña: </div>
                    <div class="col-1"></div>
                    <input class="col-6" type="password" v-model="info.password">
                </div>
                <div class="row p-3">
                    <div class="col-3">Confirmar: </div>
                    <div class="col-1"></div>
                    <input class="col-6" type="password" v-model="info.password2">
                </div>
                <br/>
                <div class="d-flex justify-content-between">
                        <b-button type="button" name="button" variant="danger" @click="confirmar">CONFIRMAR</b-button>
                </div>  
            </div>
        </div>
    </div>
      
    
</template>

<script>

import axios from 'axios'
import router from '../../router'
import backendRouter from  '../BackendRouter/BackendRouter'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


export default {
    
  data(){
    return{
        isLoading: true,
        fullPage: true,
        info: {
            password:"",
            password2:"",
            serial:"",
        }
    }
  },
  methods:{

    confirmar(){
        console.log('confirmado')
        const path = backendRouter.data+'users/changePassword'
        axios.post(path,this.info).then((response)=>{
            this.$swal('Contraseña actualizada')
            
            router.push('/login')

        })
        .catch((error)=>{
            this.$swal(error.response.data.detail)
        })
    },

    validate(){
        const path = backendRouter.data+'users/check'
        axios.post(path, {'jwt':this.$cookies.get('jwt')}).then((response)=>{
          this.info.serial = response.data.jwt.id
          this.$cookies.remove('jwt')
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