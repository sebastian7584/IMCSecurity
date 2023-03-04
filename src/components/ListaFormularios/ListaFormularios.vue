<template>

    <div>
        <SidebarMenu @adm="funtion"  />

        <div class="col-md-12" v-if="create==true">
           <br/>
            <b-table v-if="items.length>0" striped hover :items="items" :fields="fields">
                <template v-slot:cell(action)="data">
                    <b-button size="sm" variant="danger" @click="selectItem(data)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                    </b-button>   
                </template>
            </b-table>
        </div>
        <div v-if="create==false">
            <button @click="pdf">pdf</button>
            <button @click="create=true">ATRAS</button>

            <div id="contenido" class="p-1">


                <div class="row borde-top borde-left mx-1 fuente">
                    <div class="borde col-1">IMC</div>
                    <div class="borde col-7">CONTROL DE EQUIPO EN OPERACIÓN (Trolleys, Food Box, Hornos, etc)</div>
                    <div class="borde col-4">
                    <div>PA-F-001</div>
                    <div>Versión 8</div>
                    </div>
                </div>

                <!-- METADATA -->

                <div class="row m-3 fuente">
                    <div class="col-4 row"><b class="col-4">BASE:</b>{{item.metaData.base.base}}</div>
                    <div class="col-4 row"><b class="col-6">AEROLÍNEA</b> {{item.metaData.aerolinea.aerolinea}}</div>
                    <div class="col-4"><b>NO.</b> <u>{{ item.metaData.consecutivo }}</u></div>
                </div>

                <div class="row fuente m-1">

                    <div class="col-4">


                        <div class="borde borde-top borde-left row">
                            <div class="col-4">Matricula:</div>
                            <div class="col-8">{{ item.desabordado.matricula }}</div>
                        </div>
                        <div class="borde borde-left row"><b>EQUIPO DESABORDADO</b></div>
                        <div class="borde borde-left row">Fecha: <u>{{ item.desabordado.fecha }}</u></div>
                        <div class="row">
                            <div class="col-4 borde borde-left">No. Vuelo</div>
                            <div class="col-4 borde">Hora Inicio Desabordaje</div>
                            <div class="col-4 borde">Hora Final Desabordaje</div>
                        </div>
                        <div class="row">
                            <div class="col-4 borde borde-left">{{item.desabordado.noVuelo}}</div>
                            <div class="col-4 borde">{{item.desabordado.inicio}}</div>
                            <div class="col-4 borde">{{ item.desabordado.final }}</div>
                        </div>
                        <br/>


                        <div class="row">
                            <div class="col-6 borde borde-left borde-top"><b>No. de Equipo</b></div>
                            <div class="col-6 borde borde-top"><b>No. de Precinto</b></div>
                        </div>

                        <div v-for="i in item.desabordado.detalle" class="row">
                            <div v-if="i.equipo.active" class="col-6 borde borde-left">{{ i.equipo.equipo }}</div>
                            <div v-if="i.equipo.active" class="borde col-6">
                                <div class="col-12">{{ i.precinto1 }}</div>
                                <div class="col-12">{{ i.precinto2 }}</div>
                            </div>
                        </div>




                    </div>


                    <div class="col-4">

                        <div class="espacio"></div>
                        <div class="espacio"></div>
                        <div class="borde borde-top borde-left row"><b>PESAJE DESPUÉS DEL LAVADO</b></div>
                        <div class="borde borde-left row">Fecha: <u>{{ item.lavado.fecha }}</u></div>
                        <div class="row">
                            <div class="col-5 borde borde-left">Hora Pesaje</div>
                            <div class="col-7 borde ">Responsable</div>
                           
                        </div>
                        <div class="row">
                            <div class="col-5 borde borde-left">{{item.lavado.inicio}}</div>
                            <div class="col-7 borde">{{ item.lavado.responsable }}</div>
                        </div>
                        <br/>


                        <div class="row">
                            <div class="col-6 borde  borde-top borde-left"><b>No. de Equipo</b></div>
                            <div class="col-6 borde borde-top"><b>Pesaje</b></div>
                        </div>

                        <div v-for="i in item.lavado.detalle" class="row">
                            <div v-if="i.equipo.active" class="col-6 borde borde-left">{{ i.equipo.equipo }}</div>
                            <div v-if="i.equipo.active" class="borde col-6">{{ i.pesaje }}</div>
                                
                            
                        </div>
                    
                    </div>


                    <div class="col-4">

                        <div class="borde borde-top borde-left row">
                            <div class="col-4">Matricula:</div>
                            <div class="col-8">{{ item.abordaje.matricula }}</div>
                        </div>
                        <div class="borde borde-left row"><b>EQUIPO DESABORDADO</b></div>
                        <div class="borde borde-left row">Fecha: <u>{{ item.abordaje.fecha }}</u></div>
                        <div class="row">
                            <div class="col-3 borde borde-left">No. Vuelo</div>
                            <div class="col-3 borde">Hora de Salida Planta</div>
                            <div class="col-3 borde">Hora Inicio Abordaje</div>
                            <div class="col-3 borde">Hora Final Abordaje</div>
                        </div>
                        <div class="row">
                            <div class="col-3 borde borde-left">{{item.abordaje.noVuelo}}</div>
                            <div class="col-3 borde">{{item.abordaje.salida}}</div>
                            <div class="col-3 borde">{{ item.abordaje.inicio }}</div>
                            <div class="col-3 borde">{{ item.abordaje.final }}</div>
                        </div>
                        <br/>


                        <div class="row">
                            <div class="col-3 borde borde-left borde-top"><b>Pesaje</b></div>
                            <div class="col-5 borde borde-top"><b>No. de Equipo</b></div>
                            <div class="col-4 borde borde-top"><b>No. de Precinto</b></div>
                        </div>

                        <div v-for="i in item.abordaje.detalle" class="row">
                            <div v-if="i.equipo.active" class="borde  borde-left col-3">{{ i.pesaje }}</div>
                            <div v-if="i.equipo.active" class="col-5 borde">{{ i.equipo.equipo }}</div>
                            <div v-if="i.equipo.active" class="borde col-4">
                                <div class="col-12">{{ i.precinto1 }}</div>
                                <div class="col-12">{{ i.precinto2 }}</div>
                            </div>
                        </div>
                  
                    </div>


                </div>

                <div class="row fuente m-1">

                    <div class="col-6">
                        <div class="borde borde-top borde-left row"><b>DESABORDAJE DEL VUELO</b></div>
                        <div class="row">
                            <div class="borde borde-left col-8">Nombre del Conductor</div>
                            <div class="borde col-4">Placa de Vehículo</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-8">{{ item.desabordado.firmas.conductor }}</div>
                            <div class="borde col-4">{{ item.desabordado.firmas.placa }}</div>
                        </div>
                        <div class="row">
                            <div class="col-6 borde borde-left">Responsable</div>
                            <div class="col-6 borde">{{ item.desabordado.firmas.responsable }}</div>
                        </div>
                        <div class="row">
                            <div class="col-6 borde borde-left">No. Sello de Seguridad Vehículo. No. Candado</div>
                            <div class="col-3 borde">{{ item.desabordado.firmas.sello1 }}</div>
                            <div class="col-3 borde">{{ item.desabordado.firmas.sello2 }}</div>
                        </div>
                        <div class="row">
                            <div class="col-6 borde borde-left">Supervisor Plataforma</div>
                            <div class="col-6 borde">{{ item.desabordado.firmas.supervisor }}</div>
                        </div>

                        <br/>
                        
                        <div class="borde borde-top borde-left row"><b>LLEGADA A PLANTA</b></div>
                        <div class="row">
                            <div class="borde borde-left col-4">Hora llegada a Planta</div>
                            <div class="borde col-8">Nombre del Conductor que trae a Planta</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-4">{{ item.desabordado.firmas.llegadaPlanta }}</div>
                            <div class="borde col-8">{{ item.desabordado.firmas.conductorPlanta }}</div>
                        </div>

                        <div class="row">
                            <div class="borde borde-left col-4">Hora Desabordaje</div>
                            <div class="borde col-8">Vigilante que Revisa</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-4">{{ item.desabordado.firmas.desabordajePlanta }}</div>
                            <div class="borde col-8">{{ item.desabordado.firmas.vigilantePlanta }}</div>
                        </div>

                        <div class="row">
                            <div class="borde borde-left col-4">Hora Desconche</div>
                            <div class="borde col-8">Responsable de Desconche</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-4">{{ item.desabordado.firmas.desconchePlanta }}</div>
                            <div class="borde col-8">{{ item.desabordado.firmas.responsableDesconche }}</div>
                        </div>


                        <div class="row">
                            <div class="borde borde-left col-4">Hora de Lavado</div>
                            <div class="borde col-8">Responsable de Lavado</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-4">{{ item.desabordado.firmas.lavadoPlanta }}</div>
                            <div class="borde col-8">{{ item.desabordado.firmas.responsableLavado }}</div>
                        </div>



                    </div>


                    <div class="col-6">
                        <div class="borde borde-top borde-left row"><b>ARMADO DE EQUIPOS</b></div>
                        <div class="row">
                            <div class="borde borde-left col-6">Hora Pesaje Prearmado</div>
                            <div class="borde col-6">Responsable</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-6">{{ item.abordaje.firmas.horaPesajePrearmado }}</div>
                            <div class="borde col-6">{{ item.abordaje.firmas.responsablePrearmado }}</div>
                        </div>

                        <div class="row">
                            <div class="borde borde-left col-6">Hora Armado Licores</div>
                            <div class="borde col-6">Responsable</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-6">{{ item.abordaje.firmas.horaArmadoLicores }}</div>
                            <div class="borde col-6">{{ item.abordaje.firmas.responsableLicores }}</div>
                        </div>

                        <div class="row">
                            <div class="borde borde-left col-6">Hora Armado Equipos</div>
                            <div class="borde col-6">Responsable</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-6">{{ item.abordaje.firmas.horaArmadoEquipos}}</div>
                            <div class="borde col-6">{{ item.abordaje.firmas.responsableEquipos }}</div>
                        </div>


                        <div class="row">
                            <div class="borde borde-left col-6">Hora Ins. Seguridad</div>
                            <div class="borde col-6">Responsable</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-6">{{ item.abordaje.firmas.horaInsSeguridad }}</div>
                            <div class="borde col-6">{{ item.abordaje.firmas.responsableSeguridad }}</div>
                        </div>

                        <br/>

                        <div class="borde borde-top borde-left row"><b>ABORDAJE DEL VUELO</b></div>
                        <div class="row">
                            <div class="borde borde-left col-8">Nombre del Conductor</div>
                            <div class="borde col-4">Placa de Vehículo</div>
                        </div>
                        <div class="row">
                            <div class="borde borde-left col-8">{{ item.abordaje.firmas.nombreConductor }}</div>
                            <div class="borde col-4">{{ item.abordaje.firmas.placaVehiculo }}</div>
                        </div>

                        <div class="row">
                            <div class="col-6 borde borde-left">Responsable</div>
                            <div class="col-6 borde">{{ item.abordaje.firmas.responsable }}</div>
                        </div>
                        <div class="row">
                            <div class="col-6 borde borde-left">No. Sello de Seguridad Vehículo. No. Candado</div>
                            <div class="col-3 borde">{{ item.abordaje.firmas.sello1 }}</div>
                            <div class="col-3 borde">{{ item.abordaje.firmas.sello2 }}</div>
                        </div>
                        <div class="row">
                            <div class="col-6 borde borde-left">Supervisor Plataforma</div>
                            <div class="col-6 borde">{{ item.abordaje.firmas.supervisor }}</div>
                        </div>

                    </div>

                    
                </div>
                
                <div class="row fuente m-1">
                    <div class="col-4 borde borde-top borde-left">Ruta de Salida:</div>
                    <div class="col-8 borde borde-top">{{ item.abordaje.extraData.ruta }}</div>

                    <div class="col-4 borde borde-left">Bolsas de Seguridad:</div>
                    <div class="col-8 borde ">{{ item.abordaje.extraData.bolsas }}</div>

                    <div class="col-4 borde borde-left">Precintos de Reserva:</div>
                    <div class="col-8 borde ">{{ item.abordaje.extraData.precinto }}</div>
                </div>

                <br/>

                <div class="borde borde-top borde-left row fuente mx-1"><b>OBSERVACIONES</b></div>
                <div v-for="i in item.observaciones" class="row fuente mx-1">
                    <div class="col-4 borde borde-left">{{i.autor}}</div>
                    <div class="col-8 borde rellenable">{{ i.observacion }}</div>
                </div>
                


            </div>
        </div>
    </div>
</template>
  
<script>
import html2pdf from 'html2pdf.js'
import axios from 'axios'
  import router from '../../router'
  import SidebarMenu from '../SidebarMenu/SidebarMenu.vue'
  import backendRouter from  '../BackendRouter/BackendRouter'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        data () {
            return {
                mesagge:false,
        create: true,
        isLoading:true,
        adm : false,
        items:[],
        item:"",
        fields:[
            {key:'serial', label:'Consecutivo'},
            {key:'aerolinea', label:'Aerolinea'},
            {key:'base', label:'Base'},
            {key:'estado', label:'Estado'},
            {key:'action', label:''},
        ],
        form:{
            serial:'',
            date:'',
            equipo:'',
            state:'',
            active:'',
        },
        options: [
            { value: 'nuevo', label: 'nuevo' },
            { value: 'desabordado', label: 'desabordado' },
            { value: 'pesado', label: 'pesado' },
            { value: 'abordaje', label: 'abordaje' }
        ]

            }
    
        },
        methods:{
           pdf(){
            var element = document.getElementById('contenido')
            var opt = {
                margin:0.5,
                filename:'exportForm.pdf',
                image:{ type: 'jpeg', quality: 0.98 },
                html2canvas:{ scale: 3 },
                jsPDF:{ unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save();
            
            
            

           },
           getData(){
        this.isLoading = true
        const path = backendRouter.data+'formularios/admin'
        axios.get(path).then((response)=>{
            this.isLoading = false
            this.items = response.data
            
            
        })

      },


      selectItem(data){
        this.isLoading = true
        this.form.serial = data.item.serial
        const path = backendRouter.data+'formularios/open'
        axios.post(path,{"consecutivo":this.form.serial}).then((response)=>{
            this.item = response.data
            this.isLoading = false
            this.create=false
        }).catch((error)=>{
            this.$swal('Error intente de nuevo')
        })

        

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
            
        },
        comments:{

        },
        components: {
            SidebarMenu,
        },


    }
</script>
<style>
  .brand_logo{
    align-items: center;
    width: 80px;
    height: 80px;
    
  }
  
  .borde {
    border-bottom: black 2px solid;
    border-right: black 2px solid;
    
  }

  .fuente {
    font-size: 11px;
  }
  
  .borde-top {
    border-top: black 2px solid;
  }
  
  .borde-left {
    border-left: black 2px solid;
  }

  .espacio{
    height: 19px;
  }
</style>

  