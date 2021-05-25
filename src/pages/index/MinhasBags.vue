<template>
  <div>
    <div>
      <div class="col q-mb-sm">
        <q-btn
          color="green"
          label="Solicitar nova Bag"
          @click="confirmarPedido()"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        dense
        :data="bag"
        :columns="columns"
        row-key="id"
        class="col"
        :rows-per-page-options="[10]"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div>
              <q-btn
                v-if="props.row.status !== 'Recebido'"
                icon="published_with_changes"
                color="info"
                size="sm"
                dense
                @click="abrirModalAlterarStatus(props.row.id)"
                disable
              />
              <q-btn
                v-else
                icon="published_with_changes"
                color="info"
                size="sm"
                dense
                @click="abrirModalAlterarStatus(props.row.id)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="announcement" color="primary" text-color="white" />
          <span class="q-ml-sm"
            >Deseja continuar com a solicitação da Bag?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Sim"
            color="primary"
            @click="solicitarBag()"
            v-close-popup
          />
          <q-btn flat label="Não" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalAlterarStatus">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alterar Status da Bag</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <li>Compra total: Irá ficar com todos itens da Bag</li>
          <br>
          <li>Solicitado a retirada: Deseja devolver itens da Bag</li>
        </q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="max-width: 500px">
            <q-select clearable filled color="purple-12" v-model="novoStatusBag" :options="options" label="Escolha status" />
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="Salvar" color="primary" @click="alterarStatusBag()" v-close-popup />
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "minhasBags",
  data: () => ({
    token: localStorage.getItem("token"),
    baseUrl: "https://power-bag-back.herokuapp.com",
    confirm: false,
    modalCartao: false,
    columns: [
      {
        name: "createdAt",
        label: "Data",
        field: "createdAt",
        sortable: true,
        type: "date",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase",
        format: val => `${val.replace(/(\d*)-(\d*)-(\d*).*/, "$3-$2-$1")}`
      },
      {
        name: "status",
        label: "Status",
        field: "status",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold"
      },
      {
        name: "valor",
        label: "Valor",
        field: "valor",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold"
      },
      {
        name: "action",
        label: "Alterar Status da BAG",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      }
    ],
    bag: [],
    model: null,
    options: ["Compra total", "Solicitado a retirada"],
    selected: [],
    modalAlterarStatus: false,
    idBagAtual: null,
    novoStatusBag: null
  }),
  mounted() {
    this.buscarBags();
  },
  methods: {
    confirmarPedido() {
      this.confirm = true;
    },
    async solicitarBag() {
      const cadastroPreenchido = await axios({
        method: "GET",
        url: `${this.baseUrl}/cliente/validate`,
        headers: {
          Authorization: `${this.token}`
        }
      });

      if (!cadastroPreenchido.data.available) {
        this.$q.dialog({
          title: "Atenção!",
          message:
            "Para solicitar a Bag é necessário ter todos os cadastros preenchidos."
        });
        return false;
      }

      axios({
        method: "POST",
        url: `${this.baseUrl}/bag`,
        headers: {
          Authorization: `${this.token}`
        }
      }).then(response => {
        localStorage.setItem("bag", JSON.stringify(response.data));
      });

      setTimeout(() => {
        this.$q.dialog({
          title: "Parabéns!!!",
          message: "Sua bag foi solicitada com sucesso!"
        });
        this.buscarBags();
      }, 500);
    },
    async buscarBags() {
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/bag/detail`,
        headers: {
          Authorization: `${this.token}`
        }
      });
      this.bag = Object.assign(response.data);
    },
    abrirModalAlterarStatus(idPost) {
      this.modalAlterarStatus = true
      this.idBagAtual = idPost
    },
    alterarStatusBag() {
      axios({
        method: "PUT",
        url: `${this.baseUrl}/bag`,
        headers: {
          Authorization: `${this.token}`
        },
        data: {
          status: this.novoStatusBag,
          id_bag: this.idBagAtual
        }
      })
      setTimeout(() => {
        this.$q.dialog({
          title: "Atenção!",
          message: "O status da bag foi alterado com sucesso!"
        });
        this.buscarBags();
      }, 500);
    }
  }
};
</script>
