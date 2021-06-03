<template>
  <div>
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
          <q-item clickable tag="a" rel="" to="/index/cartao" class="q-mb-sm">
            <q-item-section avatar>
              <q-icon name="credit_card" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cartão</q-item-label>
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
          <q-item clickable tag="a" rel="" to="/index/tutorial" class="q-mb-sm">
            <q-item-section avatar>
              <q-icon name="help_outline" color="primary" size="lg" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tutorial</q-item-label>
            </q-item-section>
          </q-item>
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
export default {
  name: "ComponentNav",
  data() {
    return {
      leftDrawerOpen: false,
      teste: false,
      nome: localStorage.getItem("nome"),
      clienteId: localStorage.getItem("clienteId"),
      admin: null
    };
  },
  mounted() {
   this.admin = localStorage.getItem("admin")
  },
  methods: {
    limparLocalStorage() {
      localStorage.clear();
    }
  }
};
</script>
