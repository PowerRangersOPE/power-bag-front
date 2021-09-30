<template>
  <div class="">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title>
          PowerBag
        </q-toolbar-title>
        <q-btn-group flat>
          <q-btn
            to="/"
            label="Sair"
            color="primary"
            icon-right="logout"
            @click="limparLocalStorage()"
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <div>
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        content-class="bg-blue-1"
        class="q-mt-xl"
      >
        <q-list v-if="this.admin !== 'true'">
          <div clickable tag="a" rel="" class="q-ma-md">
            <q-btn
              flat
              class="q-mt-xl q-mb-md"
              color="primary"
              icon="account_circle"
            >
              {{ nome }}
            </q-btn>
          </div>
          <q-item
            clickable
            tag="a"
            rel=""
            to="/index/minhas-bags"
            class="q-mb-sm"
          >
            <q-item-section avatar>
              <q-icon name="work" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Minhas Bags</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            tag="a"
            rel=""
            to="/index/dados-pessoais"
            class="q-mb-sm"
          >
            <q-item-section avatar>
              <q-icon name="person" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dados Pessoais</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" rel="" to="/index/endereco" class="q-mb-sm">
            <q-item-section avatar>
              <q-icon name="home" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Endereço</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" rel="" to="/index/personalizar-bag" class="q-mb-sm">
              <q-item-section avatar>
                  <q-icon name="checkroom" color="primary" size="lg" />
              </q-item-section>
              <q-item-section>
                  <q-item-label>Personalizar Bag</q-item-label>
              </q-item-section>
          </q-item>
          <q-item clickable tag="a" rel="" to="/index/cartao" class="q-mb-sm">
            <q-item-section avatar>
              <q-icon name="credit_card" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cartão</q-item-label>
            </q-item-section>
          </q-item>


        <!-- btn to exclude client -->

          <q-item class="q-mt-xl q-ml-lg">
            <q-btn class="" color="red" outline style="color:red" icon="far fa-frown" label="Excluir Conta" no-caps @click="confirmarExcluir()"/>
          </q-item>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-banner rounded class="bg-primary text-white">
              <template v-slot:avatar>
                <q-avatar icon="far fa-sad-cry" size="120px" color="white" text-color="primary"></q-avatar>
              </template>

              <p class="text-body1" align="justify">Esse é um processo irreversivel. Todos seus dados serão excluidos da nossa plataforma e para acessar novamente você precisará criar uma nova conta.
              Tem certeza que deseja excluir sua conta?</p>
              </q-banner>

            <q-card-actions align="right">
              <q-btn
                flat
                label="Sim"
                color="negative"
                @click="excluirConta()"
                v-close-popup
              />
              <q-btn flat label="Não" color="positive" v-close-popup />
            </q-card-actions>
          </q-card>
          </q-dialog>
          <!-- btn to exclude client -->
        </q-list>

        <q-list v-else>
          <div clickable tag="a" rel="" class="q-ma-md">
            <q-btn
              flat
              class="q-mt-xl q-mb-md"
              color="primary"
              icon="admin_panel_settings"
            >
              {{ nome }}
            </q-btn>
          </div>
          <q-item
            clickable
            to="/index/lista-pedidos"
            class="q-mb-sm"
          >
            <q-item-section avatar>
              <q-icon name="list_alt" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Lista de Pedidos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            to="/index/clientes"
            class="q-mb-sm"
          >
            <q-item-section avatar>
              <q-icon name="person_outline" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Clientes</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

    </div>
  </div>
</template>

<script>

  import axios from "axios";

  export default {
    name: "ComponentNav",
    data() {
      return {
        token: localStorage.getItem("token"),
        leftDrawerOpen: false,
        teste: false,
        nome: localStorage.getItem("nome"),
        clienteId: localStorage.getItem("clienteId"),
        admin: null,
        confirm: false,
        baseUrl: "http://powerbag-api-dev.us-east-1.elasticbeanstalk.com"
      };
    },
    mounted() {
    this.admin = localStorage.getItem("admin")
    },
    methods: {
      limparLocalStorage() {
        localStorage.clear()
      }
      ,
      confirmarExcluir() {
        this.confirm = true
      },

      excluirConta() {
      try {
        axios({
          method: "DELETE",
          url: `${this.baseUrl}/cliente/${this.clienteId}`,
          headers: {
          Authorization: `${this.token}`
        }
        });
        setTimeout(() => {
          this.$q.dialog({
            title: "Sua conta foi excluida!",
            message: "Esperamos vê-lo novamente em breve. :("
          });
          this.$q.loading.hide();
          this.limparLocalStorage();
          this.$router.push({ name: "home" })
        }, 500);
      } catch (error) {
        if(error.response){
          this.$q.dialog({
            title: 'Não conseguimos excluir sua conta!',
            message: error.response.data
          })
            this.$q.loading.hide()
        }else if(error.request){
          this.$q.dialog({
            title: 'Não conseguimos excluir sua conta!',
            message: error.request.data
          })
            this.$q.loading.hide()
        }else{
        this.$q.dialog({
          title: 'Não conseguimos excluir sua conta!',
          message: error.message
        })
          this.$q.loading.hide()
        }
      }
      }
    }
  }
</script>
