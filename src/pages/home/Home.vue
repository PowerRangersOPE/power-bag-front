<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-ma-md">
      <div class="text-center text-h4">
        O Melhor da moda infantil na sua casa
      </div>
      <div class="row items-center q-mt-md">
        <div class="col-12 col-sm shadow-1 q-mr-md">
          <q-img
            src="https://cdn.pixabay.com/photo/2015/11/10/00/55/african-1036184_960_720.jpg"
            :ratio="4/3"
            style="border-radius: 10px"
          />
        </div>
        <div class="col-12 col-sm shadow-1 q-mt-md q-mb-md q-mr-md" style="border-radius: 10px">
          <div class="row">  
            <div class="col-12 text-center q-mt-md" style="height: 10%; width: 10%">
              <q-img id="centro-bolsa" class="" src="assets/bolsa.png" alt="Power BAG + SLOGAN"/> 
            </div> 
            <div class="col-12 text-center text-dark text-h7">
              <p class="text-bold">Compre sem sair de casa</p>
            </div>
          </div>
          <div class="row q-mt-md q-mb-md">
            <q-img id="centro" src="assets/Modelo de negócio.png" alt="Modelo de negócio" style="height: 50%; max-width: 50%"/>
          </div>
        </div>
        <div class="col-12 col-sm shadow-1">
          <q-img
            src="https://cdn.pixabay.com/photo/2016/07/02/23/07/kid-1493932_960_720.jpg"
            :ratio="4/3"
            style="border-radius: 10px"
          />
        </div>
      </div>
    </div>
    <div style="background-color:black; width=200;">
      <div class="row">
        <div class="col text-center text-white text-h4 q-mb-sm q-mt-xl">
          Como funcionamos?
        </div>
      </div>
      <div class="row">
        <div class="col text-center text-white text-h6 q-mb-xl">
          entregamos para todo Brasil
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 text-center text-white text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="format_list_bulleted" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-6" align="left">
              <div class="text-h7">Preencha algumas perguntas em nosso sistema para conhecermos suas necessidades</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 text-center text-white text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="quiz" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-7" align="left">
              <div class="text-h7">Após o preenchimento das perguntas entramos em contato para confirmar as peças/estilo que gostou e agendarmos a entrega da sua Bag</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 text-center text-white text-h7 q-mb-xl">
          <div class="row">
            <div class="col-2">
              <q-icon name="local_mall" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-6" align="left">
              <div class="text-h7">Prontinho! Sua bag personalizada será entregue em até 24 horas úteis após a aprovação do seu pedido</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<style scoped>
#centro {
  position:relative;
  top:0%;
  left:27%;
  margin-top:0%;
  margin-left:0px;
}
#centro-bolsa {
  position:relative;
  top:0%;
  left:450%;
  margin-top:0%;
  margin-left:0px;
}
</style>

<script src="./Home.js">
