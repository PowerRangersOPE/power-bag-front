<template lang="html">
  <q-layout view="lHh Lpr lFf">
    <div class="col">
      <div
        class="row"
        style="height: 150px"
      >
      <component-header-index />
      </div>
      <div class="row-10">
        <div class="row">
          <!-- Nav perfil -->
          <div class="col-3" />
            <q-slide-item class="q-ma-md col-2">
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
              <div>
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
            <div class="col-4">
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
          <div class="col-3" />
        </div>
      </div>
      <div class="row">
        <component-footer />
      </div>
    </div>
  </q-layout>
</template>

<script src="./Index.js">
