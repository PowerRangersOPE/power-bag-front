<template>
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
            <q-toolbar-title class="text-h4 text-center text-italic ">
              Elegant Kids
            </q-toolbar-title>
            <q-btn-group
              rounded-borders
              flat
            >
              <q-btn
                to="/cadastro"
                size="lg"
                label="cadastro"
                color="accent"
                class="border q-mr-sm"
                style="border-radius: 20px"
              />
              <q-btn
                to="/login"
                size="lg"
                label="login"
                color="primary"
                icon-right="login"
              />
            </q-btn-group>
          </q-toolbar>
        </q-header>
      </div>
      <div class="row-10">
        <div>
          <div class="text-center text-h4">
            O Melhor da moda infantil na sua casa
          </div>
          <div class="q-pa-md">
            <q-carousel
              v-model="slide"
              transition-prev="scale"
              transition-next="scale"
              swipeable
              animated
              control-color="white"
              navigation
              padding
              arrows
              height="300px"
              class="bg-purple-7 text-yellow-12 shadow-1 rounded-borders q-mt-xl"
            >
              <template #navigation-icon="{ active, btnProps, onClick }">
                <q-btn
                  v-if="active"
                  size="lg"
                  icon="home"
                  color="yellow"
                  flat
                  round
                  dense
                  @click="onClick"
                />
                <q-btn
                  v-else
                  size="sm"
                  :icon="btnProps.icon"
                  color="white"
                  flat
                  round
                  dense
                  @click="onClick"
                />
              </template>

              <q-carousel-slide
                name="style"
                class="column no-wrap flex-center"
              >
                <q-icon
                  name="question_answer"
                  size="56px"
                />
                <div class="q-mt-md text-center grey-10 text-h6">
                  {{ texto01 }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="tv"
                class="column no-wrap flex-center"
              >
                <q-icon
                  name="question_answer"
                  size="56px"
                />
                <div class="q-mt-md text-center text-h6">
                  {{ texto02 }}
                </div>
              </q-carousel-slide>
              <q-carousel-slide
                name="layers"
                class="column no-wrap flex-center"
              >
                <q-icon
                  name="layers"
                  size="56px"
                />
                <div class="q-mt-md text-center text-h6">
                  {{ texto03 }}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
      <div class="row">
        <component-footer />
      </div>
    </div>
  </q-layout>
</template>

<script src="./Home.js">
