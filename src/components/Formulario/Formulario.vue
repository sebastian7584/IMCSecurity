<template>

    <div class="p-5 fondo">
  
      <!-- TITULOS -->
      <SidebarMenu @adm="funtion"/>
      <div class="vld-parent">
        <loading :active.syn="isLoading" :can-cancel="true"  :is-full-page="fullPage"></loading>
      </div>
      
      <div v-if="mesagge"  class="overlay">
            <div class="popup">
                <h1>Selecciona un Formulario</h1>
                <v-select   v-model="formularioElegido" :options="optionFormularios" label:="label" :filterable="true" placeholder="Elige un Formulario" class="custom-v-select borde borde-top borde-left col-12" />
                <br/>
                <div class="d-flex justify-content-between">
                    <b-button type="button" name="button" variant="danger" @click="openForm">ABRIR</b-button>
                    <b-button type="button" name="button"  @click="mesagge=false">CANCELAR</b-button>
                
                </div>
                
            </div>
        </div>


        <div v-if="observacion"  class="overlay">
            <div class="popup">
                <h1>Agrega Observacion o Comentario</h1>
                
                <br/>
                <input class="col-12" type="text" v-model="tempObservacion">
                <br/>
                <br/>
                <div class="d-flex justify-content-between">
                    <b-button type="button" name="button" variant="danger" @click="agregarObservacion">GUARDAR</b-button>
                    <b-button type="button" name="button"  @click="observacion=false">CANCELAR</b-button>
                
                </div>
                
            </div>
        </div>

      <b-button v-if="botonesMenu" type="button" name="button" class="btn btn-danger" @click="createForm">Formulario Nuevo</b-button>
      <b-button v-if="botonesMenu" type="button" name="button" class="btn btn-danger" @click="findForm">Formulario Existente</b-button>
  
      <div class="row borde-top borde-left">
        <div class="borde col-2"><img src="https://media.licdn.com/dms/image/C4D0BAQGGa3SCSlXvCg/company-logo_200_200/0/1659638029088?e=2147483647&v=beta&t=NU28cFMOVQE59Pw2dNUIc9swfqEh1iEnslPFOwjrwdc" class="brand_logo2" alt="Logo"></div>
        <div class="borde col-6">CONTROL DE EQUIPO EN OPERACIÓN (Trolleys, Food Box, Hornos, etc)</div>
        <div class="borde col-4">
          <div>PA-F-001</div>
          <div>Versión 8</div>
        </div>
      </div>
      <br />
  
      <!-- METADATA -->
  
      <div class="row metadata" :class="{'desactivar':isMetadata}">
        
        <div class="col-4 row"><b class="col-4">BASE:</b> <vSelect class="col-6" v-model="items.metaData.base" :options="optionBase" label:="label" /></div>
        <div class="col-4 row"><b class="col-6">AEROLÍNEA</b> <vSelect class="col-6" v-model="items.metaData.aerolinea" :options="optionAerolinea" label:="label" /></div>
        <div class="col-4"><b>NO.</b> <u>{{ items.metaData.consecutivo }}</u></div>
      </div>
      <br />
      
      <!-- FORMULARIOS -->
  
      <div class="row">
  
        <!-- DESABORDADO -->
  
        <div class="col-lg-4 col-12 tresd desabordado" :class="{'desactivar':isDesabordo}">
  
          <!-- TITULO -->
  
          <br />
          <div class="borde borde-top borde-left row mx-1"> 
            <p class="col-4">Matricula:</p>
            <input type="text" class="custom-input col-8" v-model="items.desabordado.matricula">
          </div>
            <div class="borde borde-left titulo mx-1">EQUIPO DESABORDADO</div>
            <div class="borde borde-left mx-1">Fecha: <u>{{ items.desabordado.fecha }}</u></div>
            <div class="row mx-1">
              <div class="col-4 borde borde-left">NO. Vuelo</div>
              <div class="col-4 borde">
                <div>Hora Inicio</div>
                <div>Desabordaje</div>
              </div>
              <div class="col-4 borde">
                <div>Hora Final</div>
                <div>Desabordaje</div>
              </div>
            </div>
            <div class="row mx-1">
              <div class="col-4 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.noVuelo"></div>
              <div class="col-4 borde">{{ items.desabordado.inicio }}</div>
              <div class="col-4 borde">{{ items.desabordado.final }}</div>
            </div>
            <br />
  
          <!-- DETALLE -->
  
          <div class="row mx-1">
            <div class="col-6 borde borde-top borde-left titulo">No. de equipo</div>
            <div class="col-6 borde borde-top titulo">No. de Precinto</div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 0">
            <v-select   v-model="items.desabordado.detalle[0].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6  borde-left" />
            <div class="col-6 borde ">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[0].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[0].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 1">
            <v-select   v-model="items.desabordado.detalle[1].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[1].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[1].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 2">
            <v-select   v-model="items.desabordado.detalle[2].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[2].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[2].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 3">
            <v-select   v-model="items.desabordado.detalle[3].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[3].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[3].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 4">
            <v-select   v-model="items.desabordado.detalle[4].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[4].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[4].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 5">
            <v-select   v-model="items.desabordado.detalle[5].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[5].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[5].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 6">
            <v-select   v-model="items.desabordado.detalle[6].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[6].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[6].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 7">
            <v-select   v-model="items.desabordado.detalle[7].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[7].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[7].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 8">
            <v-select   v-model="items.desabordado.detalle[8].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[8].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[8].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 9">
            <v-select   v-model="items.desabordado.detalle[10].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[10].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[10].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.desabordado.cantidad > 10">
            <v-select   v-model="items.desabordado.detalle[10].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[10].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.desabordado.detalle[10].precinto2">
            </div>
          </div>
  
       
  
          <br />
          <div>
            <button type="button" class="btn btn-danger" @click="items.desabordado.cantidad++">+</button>
            <button type="button" class="btn btn-secondary" @click="items.desabordado.cantidad--">-</button>
          </div>
          

          <br />

         


  
          
  
        </div>
        <br />
  
        
  
  
  
        <!-- LAVADO -->
  
        <div class="col-lg-4 col-12 tresd lavado" :class="{'desactivar':isLavado}">
  
          <!-- TITULO -->
  
          <br />
          <div class="borde borde-top borde-left titulo mx-1">PESAJE DESPUÉS DEL LAVADO</div>
          <div class="borde borde-left mx-1">Fecha: <u>{{ items.lavado.fecha }}</u></div>
          <div class="row mx-1">
            <div class="col-5 borde borde-left">Hora Pesaje <br /></div>
            <div class="col-7 borde">
              <div>Responsable</div>
              <br />
            </div>
            
          </div>
          <div class="row mx-1 ">
            <div class="col-5 borde borde-left">{{ items.lavado.inicio }}</div>
            <div class="col-7 borde">{{ items.lavado.responsable}}</div>
          </div>
          <br />
  
          <!-- DETALLE -->
  
          <div class="row mx-1">
            <div class="col-6 borde borde-top borde-left titulo">No. de equipo</div>
            <div class="col-6 borde borde-top titulo">Pesaje</div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 0">
            <v-select   v-model="items.lavado.detalle[0].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[0].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 1">
            <v-select   v-model="items.lavado.detalle[1].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[1].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 2">
            <v-select   v-model="items.lavado.detalle[2].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[2].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 3">
            <v-select   v-model="items.lavado.detalle[3].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[3].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 4">
            <v-select   v-model="items.lavado.detalle[4].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[4].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 5">
            <v-select   v-model="items.lavado.detalle[5].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[5].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 6">
            <v-select   v-model="items.lavado.detalle[6].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[6].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 7">
            <v-select   v-model="items.lavado.detalle[7].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[7].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 8">
            <v-select   v-model="items.lavado.detalle[8].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[8].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 9">
            <v-select   v-model="items.lavado.detalle[9].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[9].pesaje">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.lavado.cantidad > 10">
            <v-select   v-model="items.lavado.detalle[10].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-6 borde-left" />
            <div class="col-6 borde">
              <input type="text" class="custom-input col-12" v-model="items.lavado.detalle[10].pesaje">
            </div>
          </div>
          
        
  
          <button type="button" class="btn btn-danger" @click="items.lavado.cantidad++">+</button>
          <button type="button" class="btn btn-secondary" @click="items.lavado.cantidad--">-</button>
  
  
        </div>
        <br />
  
        <!-- ABORDAJE -->
  
        <div class="col-lg-4 col-12 tresd" :class="{'desactivar':isAbordaje}">
  
          <!-- TITULO -->
          <br />
          <div class="borde borde-top borde-left row mx-1"> 
            <p class="col-4">Matricula:</p>
            <input type="text" class="custom-input col-8" v-model="items.abordaje.matricula">
          </div>
          <div class="borde borde-left titulo mx-1">ARMADO DE EQUIPO Y ABORDAJE</div>
          <div class="borde borde-left mx-1">Fecha: <u>{{ items.abordaje.fecha }}</u></div>
          <div class="row mx-1">
            <div class="col-3 borde borde-left" >NO. Vuelo</div>
            <div class="col-3 borde">
              <div>Hora de</div>
              <div>Salida Planta</div>
            </div>
            <div class="col-3 borde">
              <div>Hora Inicio</div>
              <div>Abordaje</div>
            </div>
            <div class="col-3 borde">
                <div>Hora Final</div>
                <div>Abordaje</div>
            </div>
          </div>
          
          <div class="row mx-1">
            <div class="col-3 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.noVuelo"></div>
            <div class="col-3 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.salida"></div>
            <div class="col-3 borde">{{ items.abordaje.inicio }}</div>
            <div class="col-3 borde">{{ items.abordaje.final }}</div>
          </div>
  
          <br />
  
          <!-- DETALLE -->
  
          <div class="row mx-1">
            <div class="col-3 borde borde-top borde-left titulo">Pesaje</div>
            <div class="col-5 borde borde-top titulo">No. de equipo</div>
            <div class="col-4 borde borde-top titulo">No. de Precinto</div>    
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 0">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[0].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[0].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[0].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[0].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 1">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[1].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[1].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[1].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[1].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 2">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[2].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[2].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[2].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[2].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 3">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[3].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[3].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[3].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[3].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 4">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[4].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[4].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[4].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[4].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 5">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[5].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[5].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[5].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[5].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 6">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[6].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[6].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[6].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[6].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 7">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[7].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[7].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[7].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[7].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 8">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[8].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[8].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[8].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[8].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 9">
            <div class="col-3 borde borde-left">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[9].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[9].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[9].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[9].precinto2">
            </div>
          </div>
  
          <div class="row mx-1" v-if="items.abordaje.cantidad > 10">
            <div class="col-3 borde borde-left">
              <input type="text" min="0" step=".01" class="custom-input col-12" v-model="items.abordaje.detalle[10].pesaje">
            </div>
            <v-select   v-model="items.abordaje.detalle[10].equipo" :options="options" label:="label" :filterable="true" placeholder="Elige un Equipo" class="custom-v-select borde col-5" />
            <div class="col-4 borde">
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[10].precinto1">
              <div class="border-top"></div>
              <input type="text" class="custom-input col-12" v-model="items.abordaje.detalle[10].precinto2">
            </div>
          </div>
  
          <button type="button" class="btn btn-danger" @click="items.abordaje.cantidad++">+</button>
          <button type="button" class="btn btn-secondary" @click="items.abordaje.cantidad--">-</button>
          <br />
          
        </div>

        <br />

        
        
        
        
      </div>

      <!-- FIRMAS DESABORDAJE -->

     <div class="row">
       
        <div class="col-lg-6 col-12 tresd desabordado" :class="{'desactivar':isDesabordo}">
          <br />
          <div class="borde borde-left borde-top titulo mx-1">DESABORDAJE DEL VUELO</div>
          <div class="row mx-1">
            <div class="col-8 borde borde-left">Nombre del Conductor</div>
            <div class="col-4 borde">Placa de Vehículo</div>
          </div>
          <div class="row mx-1">
            <div class="col-8 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.conductor"></div>
            <div class="col-4 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.placa"></div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">Responsable</div>
            <div class="col-6 borde rellenable">{{ items.desabordado.firmas.responsable }}</div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">No. Sello de Seguridad Vehículo. No. Candado</div>
            <div class="col-3 borde"><input type="text" class="custom-input col-12" placeholder="1." v-model="items.desabordado.firmas.sello1"></div>
            <div class="col-3 borde"><input type="text" class="custom-input col-12" placeholder="2." v-model="items.desabordado.firmas.sello2"></div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">Supervisor Plataforma</div>
            <div class="col-6 borde"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.supervisor"></div>
          </div>
          <br />

          <div class="borde borde-left borde-top titulo mx-1">LLEGADA A PLANTA</div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left">Hora llegada a Planta</div>
            <div class="col-8 borde">Nombre del Conductor que trae a Planta</div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.llegadaPlanta"></div>
            <div class="col-8 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.conductorPlanta"></div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left">Hora Desabordaje</div>
            <div class="col-8 borde rellenable">Vigilante que Revisa</div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.desabordajePlanta"></div>
            <div class="col-8 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.vigilantePlanta"></div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left">Hora Desconche</div>
            <div class="col-8 borde rellenable">Responsable de Desconche</div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.desconchePlanta"></div>
            <div class="col-8 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.responsableDesconche"></div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left">Hora de Lavado</div>
            <div class="col-8 borde rellenable">Responsable de Lavado</div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.lavadoPlanta"></div>
            <div class="col-8 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.desabordado.firmas.responsableLavado"></div>
          </div>
         
          <br />

        </div>
        
        <br />

        <div class="col-lg-6 col-12 tresd desabordado" :class="{'desactivar':isAbordaje}">
          <br />
          <div class="borde borde-left borde-top titulo mx-1">ARMADO DE EQUIPOS</div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">Hora Pesaje Prearmado</div>
            <div class="col-6 borde">Responsable</div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.horaPesajePrearmado"></div>
            <div class="col-6 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.responsablePrearmado"></div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">Hora Armado Licores</div>
            <div class="col-6 borde">Responsable</div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.horaArmadoLicores"></div>
            <div class="col-6 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.responsableLicores"></div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">Hora Armado Equipos</div>
            <div class="col-6 borde">Responsable</div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.horaArmadoEquipos"></div>
            <div class="col-6 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.responsableEquipos"></div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">Hora Ins. Seguridad</div>
            <div class="col-6 borde">Responsable</div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.horaInsSeguridad"></div>
            <div class="col-6 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.responsableSeguridad"></div>
          </div>
         
          <br />

          <div class="borde borde-left borde-top titulo mx-1">ABORDAJE DEL VUELO</div>
          <div class="row mx-1">
            <div class="col-8 borde borde-left">Nombre del Conductor</div>
            <div class="col-4 borde">Placa de Vehículo</div>
          </div>
          <div class="row mx-1">
            <div class="col-8 borde borde-left rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.nombreConductor"></div>
            <div class="col-4 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.placaVehiculo"></div>
          </div>
          <div class="row mx-1">
            <div class="col-4 borde borde-left">Responsable</div>
            <div class="col-8 borde">{{ items.abordaje.firmas.responsable }}</div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">No. Sello de Seguridad Vehículo. No. Candado</div>
            <div class="col-3 borde rellenable"><input type="text" class="custom-input col-12" placeholder="1." v-model="items.abordaje.firmas.sello1"></div>
            <div class="col-3 borde rellenable"><input type="text" class="custom-input col-12" placeholder="2." v-model="items.abordaje.firmas.sello2"></div>
          </div>
          <div class="row mx-1">
            <div class="col-6 borde borde-left">Supervisor Plataforma</div>
            <div class="col-6 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.firmas.supervisor"></div>
  
          </div>
          
         
          <br />

        </div>

     </div>

     <div class="row">
      <div class="col-12 tresd" :class="{'desactivar':isAbordaje}">
        <br />
        <div class="row mx-1">
            <div class="col-4 borde borde-left borde-top">Ruta de Salida:</div>
            <div class="col-8 borde borde-top rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.extraData.ruta"></div>
        </div>
        <div class="row mx-1">
            <div class="col-4 borde borde-left">Bolsas de Seguridad:</div>
            <div class="col-8 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.extraData.bolsas"></div>
        </div>
        <div class="row mx-1">
            <div class="col-4 borde borde-left">Precintos de Reserva:</div>
            <div class="col-8 borde rellenable"><input type="text" class="custom-input col-12" v-model="items.abordaje.extraData.precinto"></div>
        </div>
        <br />
      </div>

     </div>

     <div class="row">
      <div class="col-12 tresd" :class="{'desactivar':true}">
        <br />
        <div v-for="item in items.observaciones" class="row mx-1">
            <div class="col-4 borde borde-left borde-top">{{item.autor}}</div>
            <div class="col-8 borde borde-top rellenable">{{ item.observacion }}</div>
        </div>
        <br />
      </div>

     </div>
      
      <br />
      <div class="text-center d-flex justify-content-center align-items-center">
          <button v-if="botonesMenu2==false" type="button" class="btn btn-danger" @click="observacion=true">OBSERVACION</button>
          <div> . </div>
          <button v-if="botonesMenu2==false" type="button" class="btn btn-danger" @click="saveForm">GUARDAR</button>
      </div>
  
      
    </div>
    
  </template>
  
  <script>
  import vSelect from "vue-select";
  import "vue-select/dist/vue-select.css";
  import SidebarMenu from '../SidebarMenu/SidebarMenu.vue'
  import axios from 'axios'
  import backendRouter from  '../BackendRouter/BackendRouter'
  import Loading from 'vue-loading-overlay';
  
  
  export default{
  
    data(){
      return{
        tempObservacion:"",
        observacion:false,
        mesagge: false,
        optionFormularios:[],
        formularioElegido:"",
        isLoading: false,
        fullPage: true,
        adm: false,
        cedula: "",
        nombre: "",
        apellido: "",

        botonesMenu:true,
        botonesMenu2:true,
        base:"",
        optionBase:[],

        aerolinea:"",
        optionAerolinea:[],
        fechaHoy: new Date(),
        date:"",
        dia :"",
        mes :"",
        anio :"",
        time:"",
        hora:"",
        min:"",

        options:[],
        isMetadata: true,
        isDesabordo: true,
        isLavado: true,
        isAbordaje: true,

        items:{
            paso:0,
            metaData: {
                base:"",
                aerolinea:"",
                consecutivo:"",
                usuario:"",
            },
            observaciones:[],
            desabordado:{
                matricula:"",
                fecha:"",
                noVuelo:"",
                inicio:"",
                final:"",
                cantidad:1,
                detalle:[
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                ],
                firmas:{
                  conductor:"",
                  placa:"",
                  responsable:"",
                  ccResponsable:"",
                  sello1:"",
                  sello2:"",
                  supervisor:"",
                  llegadaPlanta:"-",
                  conductorPlanta:"",
                  desabordajePlanta:"-",
                  vigilantePlanta:"-",
                  desconchePlanta:"-",
                  responsableDesconche:"-",
                  lavadoPlanta:"-",
                  responsableLavado:"-",
                },
                    
            },
            lavado:{
                fecha:"",
                inicio:"",
                responsable:"-",
                cantidad:1,
                detalle:[
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                ]
                    
            },
            abordaje:{
                matricula:"",
                fecha:"",
                noVuelo:"",
                salida:"",
                inicio:"",
                final:"",
                cantidad:1,
                detalle:[
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                ],
                firmas:{
                  horaPesajePrearmado:"-",
                  responsablePrearmado:"-",
                  horaArmadoLicores:"-",
                  responsableLicores:"-",
                  horaArmadoEquipos:"-",
                  responsableEquipos:"-",
                  horaInsSeguridad:"-",
                  responsableSeguridad:"-",
                  nombreConductor:"-",
                  placaVehiculo: "-",
                  responsable:"",
                  sello1:"",
                  sello2:"",
                  supervisor:"",

                },
                extraData:{
                  ruta:"",
                  bolsas:"",
                  precinto:"",
                },
                

                    
            },
        },
  
      }
    },
  
    components: {
      vSelect,
      SidebarMenu,
      Loading,
    },
    methods:{
    funtion(valor){
      this.adm = valor.adm
      this.cedula = valor.cedula
      this.nombre = valor.nombre
      this.apellido = valor.apellido
      this.items.metaData.usuario = this.nombre+" "+this.apellido
      
    },
    validate(){
        this.dia = this.fechaHoy.getDate()
        this.mes = this.fechaHoy.getMonth() + 1 // Se suma 1 porque los meses empiezan en 0
        this.anio = this.fechaHoy.getFullYear() 
        this.date = `${this.dia}-${this.mes}-${this.anio}`
        this.hora = this.fechaHoy.getHours()
        this.min = this.fechaHoy.getMinutes()
        this.time = `${this.hora}:${this.min}`

        const pathBase = backendRouter.data+'bases/admin'
        axios.get(pathBase).then((response)=>{
            this.optionBase = response.data
            this.optionBase = this.optionBase.filter(elemento => elemento.active)
        })

        const pathAerolinea = backendRouter.data+'aerolineas/admin'
        axios.get(pathAerolinea).then((response)=>{
            this.optionAerolinea = response.data
            this.optionAerolinea = this.optionAerolinea.filter(elemento => elemento.active)
        })

        const pathEquipos = backendRouter.data+'equipos/admin'
        axios.get(pathEquipos).then((response)=>{
            this.options = response.data
            this.options = this.options.filter(elemento => elemento.active)
        })
        
      },

      createForm(){
        if (this.items.paso == 4){
          this.items={
            paso:0,
            metaData: {
                base:"",
                aerolinea:"",
                consecutivo:"",
                usuario:"",
            },
            observaciones:[],
            desabordado:{
                matricula:"",
                fecha:"",
                noVuelo:"",
                inicio:"",
                final:"",
                cantidad:1,
                detalle:[
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                    {equipo:"", precinto1:"", precinto2:""},
                ],
                firmas:{
                  conductor:"",
                  placa:"",
                  responsable:"",
                  ccResponsable:"",
                  sello1:"",
                  sello2:"",
                  supervisor:"",
                  llegadaPlanta:"",
                  conductorPlanta:"",
                  desabordajePlanta:"-",
                  vigilantePlanta:"-",
                  desconchePlanta:"-",
                  responsableDesconche:"-",
                  lavadoPlanta:"-",
                  responsableLavado:"-",
                },
                    
            },
            lavado:{
                fecha:"",
                inicio:"",
                responsable:"-",
                cantidad:1,
                detalle:[
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                    {equipo:"", pesaje:""},
                ]
                    
            },
            abordaje:{
                matricula:"",
                fecha:"",
                noVuelo:"",
                salida:"",
                inicio:"",
                final:"",
                cantidad:1,
                detalle:[
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                    {pesaje:"", equipo:"", precinto1:"", precinto2:""},
                ],
                firmas:{
                  horaPesajePrearmado:"-",
                  responsablePrearmado:"-",
                  horaArmadoLicores:"-",
                  responsableLicores:"-",
                  horaArmadoEquipos:"-",
                  responsableEquipos:"-",
                  horaInsSeguridad:"-",
                  responsableSeguridad:"-",
                  nombreConductor:"-",
                  placaVehiculo: "-",
                  responsable:"",
                  sello1:"",
                  sello2:"",
                  supervisor:"",

                },
                extraData:{
                  ruta:"",
                  bolsas:"",
                  precinto:"",
                },
                

                    
            },
        }
        }

        this.isLoading = true
        const path = backendRouter.data+'formularios/admin'
        const consecutivo = this.items.metaData.consecutivo
        const dataFormulario = {
            consecutivo : this.items.metaData.consecutivo,
            data: this.items
        }
        console.log(dataFormulario)
        axios.post(path,{formulario: dataFormulario}).then((response)=>{
            this.items = response.data
            this.botonesMenu=false
            this.botonesMenu2=false
            this.isMetadata = false
            this.isDesabordo = false
            this.isLoading = false
        })
      },

      findForm(){
        this.mesagge = true
        this.isLoading = true
        const path = backendRouter.data+'formularios/admin'
        axios.get(path).then((response)=>{
          this.optionFormularios = response.data
          this.optionFormularios = this.optionFormularios.filter(elemento => elemento.estado != 'ABORDADO' )
          this.isLoading = false
        })
        .catch((error)=>{
          this.$swal('Error')
        })
      },

      openForm(){
        this.isLoading = true
        const path = backendRouter.data+'formularios/open'
        axios.post(path, {"consecutivo":this.formularioElegido['serial']}).then((response)=>{
          this.items = response.data
          this.isLoading = false
          this.mesagge = false
          this.botonesMenu = false
          this.botonesMenu2 = false
          if (response.data.paso == 0){
                this.isMetadata = false
                this.isDesabordo = false
                this.items.paso++
                this.items.desabordado.fecha = this.date
                this.items.desabordado.inicio = this.time
                this.items.desabordado.firmas.responsable = `${this.nombre} ${this.apellido}`
            }
            else if (response.data.paso == 1){
                this.items.paso++
                this.isLavado = false
                this.items.lavado.fecha = this.date
                this.items.lavado.inicio = this.time
                this.items.lavado.responsable = `${this.nombre} ${this.apellido}`
            }
            else if (response.data.paso == 2){
              this.items.paso++
              this.isAbordaje = false
              this.items.abordaje.fecha = this.date
              this.items.abordaje.inicio = this.time
              this.items.abordaje.firmas.responsable = `${this.nombre} ${this.apellido}`
            }
            else if (response.data.paso ==3){
              this.botonesMenu = true
              this.botonesMenu2 = true
            }
        })
      },

      saveForm(){
        this.isLoading = true
        const path = backendRouter.data+'formularios/admin'
        const consecutivo = this.items.metaData.consecutivo
        const dataFormulario = {
            consecutivo : this.items.metaData.consecutivo,
            data: this.items
        }
        console.log(dataFormulario)
        axios.post(path,{formulario: dataFormulario}).then((response)=>{
            this.items = response.data
            this.isLoading = false
            if (response.data.paso == 2){
                this.isMetadata = true
                this.isDesabordo = true
                this.isLavado = false
                
            }
            if (response.data.paso == 3){
               
                this.isAbordaje = false
                this.isLavado = true
            }
            if (response.data.paso == 4){
              this.isAbordaje = true
              this.botonesMenu2=true
              this.botonesMenu=true
            }

        })
        .catch((error)=>{
            this.$swal(error.response.data.detail)
            this.isLoading = false
        })
      },

      agregarObservacion(){
        if (this.tempObservacion == ""){
          this.$swal('Agregar observacion o cancelar')
        }
        else{
          this.items.observaciones.push({'observacion':this.tempObservacion, 'autor':`${this.nombre} ${this.apellido}`})
          console.log(this.items.observaciones)
          this.observacion = false
          this.tempObservacion = ""

        }
      },
    

      
    
  },
    created(){
        this.validate()
    } ,  
  }
  
  </script>
  
  <style>

  .brand_logo2{
    align-items: center;
    width: 80px;
    height: 80px;
  }
  
  .borde {
    border-bottom: black 2px solid;
    border-right: black 2px solid;
  }
  
  .borde-top {
    border-top: black 2px solid;
  }
  
  .borde-left {
    border-left: black 2px solid;
  }
  
  .custom-input{
    border: none;
    outline: none;
  }
  
  .custom-v-select .vs__dropdown-toggle {
    border: none;
  
  }
  
  .fondo{
    background: #fff !important;
  }
  
  .rellenable{
    background: white;
    
  }
  
  .titulo{
    background: #dd8023;
  }
  
  .tresd{
    
    border: 1px solid #ccc;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
    
  }
  
  html {
              margin: 0;
              padding: 0;
              height: 100%;
              background: #fff !important;
          }
 

 .desactivar {
    pointer-events: none;
    opacity: 0.7;
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
  