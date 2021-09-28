<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-ma-md">
      <div class="text-center text-h4 text-bold">
        O Melhor da moda infantil na sua casa
      </div>
      <div class="row items-center q-mt-md">
        <div class="col-12 col-sm shadow-1 q-mr-md">
          <q-img
            src="https://source.unsplash.com/collection/535863/960x720"
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
            src="https://source.unsplash.com/collection/8724612/960x720"
            :ratio="4/3"
            style="border-radius: 10px"
          />
        </div>
      </div>
    </div>
    <div style="background-color:black; width=200;">
      <div class="row">
        <div class="col text-center text-white text-h4 text-bold q-mb-sm q-mt-xl">
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
    <div>
      <div class="row q-mb-xl">
        <div class="col text-center text-h4 text-bold q-mb-sm q-mt-xl q-mb-xl">
          Vantagens em receber sua Bag
        </div>
      </div>
      <div class="row q-mb-xl">
        <div class="col-12 col-md-4 text-center text-dark text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="fas fa-tshirt" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-6" align="left">
              <div class="text-h6 text-bold">Moda</div>
              <div class="text-h7">Selecionamos para você looks que definem o estilo da criança ou para aquele momento especial, te vestindo para inúmeras ocasiões</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 text-center text-dark text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="fas fa-crosshairs" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-7" align="left">
              <div class="text-h6 text-bold">Nunca mais erre na compra</div>
              <div class="text-h7">Experimente os itens em seu tempo no conforto do seu lar, podendo também verificar os itens que já possui em seu guarda-roupas. Assim você não corre o risco de ser enganado pela foto do produto ou de errar na escolha do tamanho</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 text-center text-dark text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="fas fa-truck-moving" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-7" align="left">
              <div class="text-h6 text-bold">Comodidade e Segurança</div>
              <div class="text-h7">Você recebe em casa seus looks todos vaporizados e higienizados com todos os cuidados necessários para sua experiência ser a melhor possível. Você experimenta suas escolhas, sem compromisso de compra e devolve o que não quiser ficar sem custo</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row q-mb-xl">
        <div class="col-12 col-md-4 text-center text-dark text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="fas fa-comments" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-6" align="left">
              <div class="text-h6 text-bold">Atendimento Personalizado</div>
              <div class="text-h7">Fale com nossa equipe de maneira simples e direta. Aproveite esse atendimento para nos contar sobre o seu estilo e tirar suas dúvidas</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 text-center text-dark text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="fas fa-cart-plus" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-7" align="left">
              <div class="text-h6 text-bold">Vários itens por Bag</div>
              <div class="text-h7">Ampla seleção de produtos e categorias para você escolher somente o que mais gosta</div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 text-center text-dark text-h7 q-mb-md">
          <div class="row">
            <div class="col-2">
              <q-icon name="fas fa-clock" class="text-primary" style="font-size: 2em;"></q-icon>
            </div>
            <div class="col-7" align="left">
              <div class="text-h6 text-bold">Tempo</div>
              <div class="text-h7">Você solicita a bag e em até 24h ela chega pra você com toda a segurança e cuidados necessários. A criança experimenta e escolhe suas peças com tranquilidade no conforto da sua casa e realiza a devolução</div>
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
