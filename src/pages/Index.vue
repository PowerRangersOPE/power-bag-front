<template lang="html">
  <q-layout view="lHh Lpr lFf">
    <div class="col">
      <div
        class="row"
        style="height:100px"
      >
        <component-header-index />
      </div>
      <div class="row-10">
        <div class="row">
          <!-- Nav perfil -->
          <div class="col-1" />
            <q-slide-item class="q-ma-md col-2">
              <div>
                <a @click="menuPerfil('minhasBags')">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon
                          name="work"
                          color="primary"
                          size="lg"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Minhas Bags</q-item-section>
                  </q-item>
                </a>
                <a @click="menuPerfil('dadosPessoais')">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon
                          name="person"
                          color="primary"
                          size="lg"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Dados Pessoais</q-item-section>
                  </q-item>
                </a>
                <a @click="menuPerfil('endereco')">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon
                          name="home"
                          color="primary"
                          size="lg"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Endereço</q-item-section>
                  </q-item>
                </a>
                <a @click="menuPerfil('cartao')">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon
                          name="credit_card"
                          size="lg"
                          color="primary"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Cartão</q-item-section>
                  </q-item>
                </a>
                <a @click="menuPerfil('perfilProduto')">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <q-icon
                          name="checkroom"
                          size="lg"
                          color="primary"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>Personalizar Bag</q-item-section>
                  </q-item>
                </a>
              </div>
            </q-slide-item>

          <transition
            name="fade-cadastro"
            mode="out-in"
          >
            <div class="col-6">
              <!-- Cadastro Minhas Bags -->
              <div
                  v-if="acaoCadastroPerfil == 'minhasBags'"
                  key="minhasBags"
                  class="minhasBags"
                >
                <component-minhas-bags />
              </div>
              <!-- Cadastro Dados Pessoais -->
              <div
                  v-if="acaoCadastroPerfil == 'dadosPessoais'"
                  key="dadosPessoais"
                  class="dadosPessoais"
                >
                <component-dados-pessoais />
              </div>
              <!-- Cadastro Endereço -->
              <div
                  v-if="acaoCadastroPerfil == 'endereco'"
                  key="endereco"
                  class="endereco"
                >
                <component-endereco />
              </div>
              <!-- Cadastro Cartão -->
              <div
                  v-if="acaoCadastroPerfil == 'cartao'"
                  key="cartao"
                  class="cartao"
                >
                <component-cartao />
              </div>
              <!-- Cadastro Perfil Produto -->
              <div
                  v-if="acaoCadastroPerfil == 'perfilProduto'"
                  key="perfilProduto"
                  class="perfilProduto"
                >
                <component-personalizar-bag />
              </div>
            </div>
          </transition>
          <div class="col-1" />
        </div>
      </div>
      <div class="row">
        <component-footer />
      </div>
    </div>
  </q-layout>
</template>

<script src="./Index.js">
