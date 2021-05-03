<template lang="html">
  <q-layout view="lHh Lpr lFf">
    <div class="col">
      <div
        class="row"
        style="height: 150px"
      >
        <q-header elevated>
          <q-toolbar class="q-pa-md">
            <q-btn-group flat>
              <q-btn
                to="/"
                size="lg"
                label="powerbag"
                color="primary"
              />
            </q-btn-group>
          </q-toolbar>
        </q-header>
      </div>
      <div class="row-10">
        <div class="text-center text-h4">
          O Melhor da moda infantil na sua casa
        </div>
        <div>
          <q-page-container>
            <q-page
              class="row justify-center items-center q-mt-xl"
              style="min-height: 300px;"
            >
              <div class="column">
                <div class="row">
                  <q-card
                    square
                    class="shadow-5"
                    style="width:350px;height:450px;"
                  >
                    <q-card-section class="bg-deep-purple-7">
                      <h4 class="text-h5 text-white q-my-md">
                        Acesse a sua conta
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
                        label="Login"
                        @click="login"
                      />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </q-page>
          </q-page-container>
        </div>
      </div>
      <div class="row">
        <component-footer />
      </div>
    </div>
  </q-layout>
</template>

<script src="./Login.js">
