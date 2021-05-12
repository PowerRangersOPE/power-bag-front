<template>
  <q-layout view="hHh Lpr fFf">
    <div class="grid">
        <header class="header">
          <div class="header-content">
           <p class="marca">Elegant kids</p>
           <p>Como funcionamos</p>
           <p>Vantangens</p>
           <p>Perguntas Frequentes</p>
           <button>Cadastro</button>
           <a href="#">Login</a>
          </div>
        </header>
    </div>

    <div class="title">
        <section class="main">
          <h3>O Melhor da moda infantil na sua casa</h3>
          <div class="logo">
            <div>
              <p class="logo-1">Receba</p>
            </div>
            <div>
               <p class="logo-2">Prove</p>
            </div>
            <div>
              <p class="logo-3">Pague</p>
            </div>
          </div>
        </section>
        <section class="aside">
          <h3>Como funcionamos?</h3>
          <p class="region">entregamos para todo o Brasil</p>
          <div class="grid-content">
            <div class="icol">
              <div class="content">
                <p>1. Preencha algumas perguntas para conhecermos suas necessidades.</p>
              </div>
            </div>
            <div class="icol">
              <div class="content">
                <p>2. Após o preenchimento das perguntas entramos em contato via WhatsApp, para confirmar as peças/estilo que gostou e agendamos a entrega da sua Bag.</p>
              </div>
            </div>
            <div class="icol">
              <div class="content">
                <p>3. Prontinho! Sua bag personalizada será entregue em até 24horas (após a aprovação do seu pedido).</p>
              </div>
            </div>
          </div>

          <button>Eu quero uma bag</button>
          <div class="icol"></div>
      </section>
    </div>

    <div class="row">
      <q-footer>
        <q-toolbar class="">
          <q-toolbar-title class="">PowerBag</q-toolbar-title>
          <p class="text-caption absolute-center">
            Todos Direitos Reservados, Bags PowerBag
          </p>
        </q-toolbar>
      </q-footer>
    </div>
  </q-layout>
</template>

<style scoped>

* {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  text-decoration: none;
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif;
}

.grid {
  display: grid
}
.header {
  background-color: #507CFF;
}

.header-content{
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 25px;
}

.header-content p, a{
  margin: 20px;
  color: #F7F4F3;
  cursor: pointer;
}

.header-content button {
  background-color: #111111;
  color: #F7F4F3;
  border: 5px;
  padding: 10px;
  cursor: pointer;
}

.main h3, p {
  color: #000000;
}

.aside {
  background: #111111;
}

.aside h3 {
  color: #F7F4F3;
}

.aside p, div {
  color: #F7F4F3;
}
</style>


<script>
export default {
  name: "TelaInicial",
  data() {
    return {};
  }
};
</script>
