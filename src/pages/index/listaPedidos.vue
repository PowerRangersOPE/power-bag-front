<template>
  <div>
    <div class="q-pa-md">
      <q-table
        dense
        :data="bag"
        :columns="columns"
        row-key="id"
        class="col"
        :rows-per-page-options="[20]"
      >
        <template v-slot:body-cell-editarPedido="props">
          <q-td :props="props">
            <div>
              <q-btn
                v-if="props.row.status === 'Cancelado' || props.row.status === 'Finalizado' || props.row.status === 'Compra total'"
                icon="published_with_changes"
                color="negative"
                size="sm"
                dense
                disable
              />
              <q-btn
                v-else
                icon="published_with_changes"
                color="info"
                size="sm"
                dense
                @click="abrirModalAlterarStatus(props.row)"
              />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-info="props">
          <q-td :props="props">
            <div>
              <q-btn
                icon="person"
                color="info"
                size="sm"
                dense
                @click="abrirModalInfoCliente(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="modalAlterarStatus">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Alterar Status ou Valor da Bag</div>
        </q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 300px">
            <q-select color="purple-12" v-model="novoStatusBag" :options="options" label="Escolha status" />
          </div>
          <div class="q-gutter-y-md q-mt-sm" style="max-width: 300px">
            <q-input color="purple-12" v-model="novoValorBag" label="Valor Bag" />
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="Salvar" color="primary" @click="alterarBag()" v-close-popup />
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalInfoCliente">
      <q-card style="width: 600px; max-width: 80vw;">
        <div class="q-pa-md">
          <q-item-label class="text-h5">
              Informações do cliente
          </q-item-label>
          <div class="row q-mt-lg">
              <div class="col">
                  <q-input v-model="cadastroPerfil.nome" filled class="q-mr-lg" label="Nome completo" />
              </div>
              <div class="col">
                  <q-input v-model="cadastroPerfil.email" filled disable label="E-mail" />
              </div>
          </div>
          <div class="row q-mt-lg">
              <div class="col">
                  <q-input v-model="cadastroPerfil.cpf" filled class="q-mr-lg" label="CPF" mask="###.###.###-##" />
              </div>
              <div class="col">
                  <q-input v-model="cadastroPerfil.dat_nasc" filled class="" label="Data de nascimento" mask="##/##/####" />
              </div>
          </div>

          <div class="row q-mt-lg">
              <div class="col">
                  <q-input v-model="cadastroPerfil.tel_cel1" filled class="q-mr-lg" label="Celular principal" mask="(##) ##### - ####" />
              </div>
              <div class="col">
                  <q-input v-model="cadastroPerfil.tel_cel2" filled label="Celular secundário" mask="(##) ##### - ####" />
              </div>
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

const DADOS_PERFIL = {
    nome: "",
    email: "",
    cpf: "",
    identificacao: "null",
    tel_cel1: "",
    tel_cel2: "",
    dat_nasc: "",
    status: "ativo",
    pontuacao: "5"
};

export default {
  name: "minhasBags",
  data: () => ({
    token: localStorage.getItem("token"),
    baseUrl: "https://power-bag.herokuapp.com",
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
        name: "info",
        label: "Info cliente",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      },
      {
        name: "editarPedido",
        label: "Editar pedido",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      }
    ],
    bag: [],
    cadastroPerfil: DADOS_PERFIL,
    model: null,
    options: ["Em separação", "Enviado", "Recebido", "Verificando peças", "Finalizado", "Compra total", "Cancelado"],
    selected: [],
    modalAlterarStatus: false,
    modalInfoCliente: false,
    idBagAtual: null,
    novoStatusBag: null,
    novoValorBag: null,
    clienteId: null
  }),
  mounted() {
    this.buscarBags();
  },
  methods: {
    confirmarPedido() {
      this.confirm = true;
    },
    async buscarBags() {
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/bag/all`,
        headers: {
          Authorization: `${this.token}`
        }
      });
      
      this.bag = Object.assign(response.data);
    },
    abrirModalAlterarStatus(props) {
      this.modalAlterarStatus = true
      this.idBagAtual = props.id
      this.novoStatusBag = props.status
      this.novoValorBag = props.valor
    },
    async abrirModalInfoCliente(props) {
      console.log(props)
      this.modalInfoCliente = true
      this.clienteId = props.cliente_id
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/cliente/${this.clienteId}`,
        headers: {
          Authorization: `${this.token}`
        }
      });
      
      this.cadastroPerfil = Object.assign(response.data);
      console.log(this.cadastroPerfil)

    },
    alterarBag() {
      axios({
        method: "PUT",
        url: `${this.baseUrl}/bag`,
        headers: {
          Authorization: `${this.token}`
        },
        data: {
          valor: this.novoValorBag,
          status: this.novoStatusBag,
          id_bag: this.idBagAtual
        }
      })
      setTimeout(() => {
        this.$q.dialog({
          title: "Atenção!",
          message: "O status da bag foi alterado com sucesso!"
        });
        this.idBagAtual = ""
        this.novoStatusBag = ""
        this.novoValorBag = ""
        this.buscarBags();
      }, 500);
    }
  }
};
</script>