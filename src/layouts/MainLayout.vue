<template>
  <q-layout view="hHh Lpr fFf" class="grid">
    <nav class="grid">
        <ul class="header">
          <p class="marca"><a href="">Elegant kids</a></p>
          <div class="header-content">
           <li><a href="">Como funcionamos</a></li>
           <li><a href="">Vantangens</a></li>
           <li><a href="">Perguntas Frequentes</a></li>
           <button>Cadastro</button>
           <a href="#">Login</a>
          </div>
        </ul>
          <section class="main">
            <h3>O Melhor da moda infantil na sua casa</h3>
            <div class="facilidade">
              <img src=".././assets/bolsinha.png" />
            </div>
            <div  class="PowerBag">
              <p>Power bag</p>
            </div>
            <div  class="facilidade">
              <p>Compre sem sair de casa</p>
            </div>
            <div clas="steps">
              <p class="logos">Receba</p>
              <p class="logos">Prove</p>
              <p class="logos">Pague</p>
            </div>
            <div class="logo">
                <img src=".././assets/carrinho.png" alt="Carrinho"/>
                <img src=".././assets/roupa-roxa.png" alt="Roupa"/>
                <img src=".././assets/cartao.png" alt="Cartao"/>
            </div>
          </section>

          <section class="aside">
            <h3>Como funcionamos?</h3>
            <p class="regiao">entregamos para todo o Brasil</p>
            <div class="grid-content">
              <div class="grid-icone">
                <p><img src=".././assets/lista.png" alt="Cartao"/>
                1.Preencha algumas perguntas para conhecermos suas necessidades.</p>
              </div>
              <div class="grid-icone">
                <p><img src=".././assets/coment.png" alt="Cartao">
                  2. Após o preenchimento das perguntas entramos em contato via WhatsApp, para confirmar as peças/estilo que gostou e agendamos a entrega da sua Bag.
                </p>
              </div>
              <div class="grid-icone">
                <p><img src=".././assets/user-check.png" alt="Cartao"/>
                  3.Prontinho! Sua bag personalizada será entregue em até 24horas (após a aprovação do seu pedido).</p>
              </div>
            </div>
            <div class="icol">
              <button >Eu quero uma bag</button>
              <img src=".././assets/bag.png" class="icol2" alt="bag"/>
            </div>
          </section>

    </nav>
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
  list-style: none;
}

.grid {
  display: grid
}
.header {
  background-color: #507CFF;
}

.header-content {
  display: flex;
  align-content: center;
  justify-content: center;
}

.marca {
 font-size: 25px;
 color: #F7F4F3;
 margin: 0 10px 0 25px;
 position: relative;
 top: 40px
}

.header-content li, a{
  margin: 10px 10px 30px 10px;
  color: #F7F4F3;
  cursor: pointer;
  padding: 5px;
}


.header-content button {
  background-color: #111111;
  color: #F7F4F3;
  padding: 8px;
  cursor: pointer;
  width: 111px;
  height: 45px;
  border-radius: 8px;
  margin-left: 150px;
}

.main {
  width: 100%;
  margin-bottom: 50px;
  height: 310px;
}

.main h3 {
  color:#000000;
  text-align: center;
  margin: 40px
}

.PowerBag {
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
}

.facilidade {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #000000;
}

.main div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.steps {
  display: block;
}
.logos {
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px;
}

.main p + p::before{
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  left: 625px;
  background: #000000;
  top: 354px
}

.main p + p + p::before{
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  left: 710px;
  background: #000000;
  top: 354px
}

.logo img {
  margin-top: 25px;
  margin-left: 25px;
  margin-right: 25px;
}

.aside {
  background: #111111;
  width: 1348px;
  height: 400px;
}

.aside h3 {
  color: #F7F4F3;
  text-align: center;
  margin: 20px;
}

.regiao {
  color: #F7F4F3;
  text-align: center;
  margin: 20px;
}

.grid-content {
  display: flex;
  margin: 10px;
  align-items: center;
}

.grid-icone {
  margin: 30px;
}

.grid-icone p{
 color: #F7F4F3;
}
.icol {
  align-content: center;
  align-items: center;
  position: relative;
  left: 550px;
}

.icol button {
 color: #000000;
 width: 141px;
 height: 55px;
 padding: 5px;
 border-radius: 8px;
 cursor: pointer;
 margin: 0 10px;
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
