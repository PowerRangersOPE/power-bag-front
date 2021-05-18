<template>
  <q-layout view="lHh Lpr lFf">
    <div class="col">
      <div
        class="row q-mt-xl"
      >
      </div>
      <div class="row-10">
        <div class="text-center text-h4">
          O Melhor da moda infantil na sua casa
        </div>
        <div>
          <q-page-container>
            <q-page
              class="row justify-center items-center q-mt-md"
              style="min-height: 300px;"
            >
              <div class="column">
                <div class="row">
                  <q-card
                    square
                    class="shadow-5"
                    style="width:350px;height:500px;"
                  >
                    <q-card-section class="bg-deep-purple-7">
                      <h4 class="text-h5 text-white q-my-md">
                        Faça seu cadastro
                      </h4>
                    </q-card-section>
                    <q-card-section>
                      <q-form class="q-px-sm q-pt-xl q-pb-lg">
                        <q-input
                          ref="email"
                          v-model="email"
                          square
                          clearable
                          type="email"
                          label="E-mail"
                          :rules="[this.required,this.isEmail,this.short]"
                        >
                          <template #prepend>
                            <q-icon name="email" />
                          </template>
                        </q-input>
                        <q-input
                          ref="user"
                          v-model="user"
                          square
                          clearable
                          type="user"
                          label="Nome completo"
                          :rules="[this.required,this.short,this.isNomeSobrenome]"
                        >
                          <template #prepend>
                            <q-icon name="lock" />
                          </template>
                        </q-input>
                        <q-input
                          ref="password"
                          v-model="password"
                          square
                          clearable
                          type="password"
                          label="Senha"
                          :rules="[this.required, this.short]"
                        >
                          <template #prepend>
                            <q-icon name="lock" />
                          </template>
                        </q-input>
                      </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-lg">
                      <q-btn
                        unelevated
                        size="lg"
                        color="purple-4"
                        class="full-width text-white"
                        label="Cadastrar"
                        @click="cadastrar"
                      />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </q-page>
          </q-page-container>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script src="./Cadastro.js">
