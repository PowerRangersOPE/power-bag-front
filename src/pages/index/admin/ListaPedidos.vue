<template>
  <div>
    <div class="q-pa-md">
      <q-table
        dense
        :data="bag"
        :columns="columns"
        row-key="id"
        class="col"
        :rows-per-page-options="[50]"
      >
        <template v-slot:body-cell-editarPedido="props">
          <q-td :props="props">
            <div>
              <q-btn
                v-if="
                  props.row.status === 'Cancelado' ||
                    props.row.status === 'Finalizado' ||
                    props.row.status === 'Compra total'
                "
                icon="published_with_changes"
                color="grey"
                size="sm"
                dense
              >
                <q-tooltip anchor="center left" self="center right">
                  Não é possível a edição
                </q-tooltip>
              </q-btn>
              <q-btn
                v-else
                icon="published_with_changes"
                color="info"
                size="sm"
                dense
                @click="abrirModalAlterarStatus(props.row)"
              >
                <q-tooltip anchor="center left" self="center right">
                  Editar pedido do cliente
                </q-tooltip>
              </q-btn>
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
              >
                <q-tooltip anchor="center left" self="center right">
                  Informações do cliente
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-feedback="props">
          <q-td :props="props">
            <div>
              <q-btn
                v-if="
                  props.row.observacoes !== '' && 
                  props.row.status === 'Compra total' || props.row.status === 'Finalizado'
                "
                icon="chat"
                color="secondary"
                size="sm"
                dense
                @click="abrirModalFeedback(props.row.id)"
              > 
                <q-tooltip anchor="center left" self="center right">
                  Possui Feedback do cliente
                </q-tooltip>
              </q-btn>
              <q-btn
                v-else
                icon="chat"
                color="grey"
                size="sm"
                dense
              > 
                <q-tooltip anchor="center left" self="center right">
                  Sem Feedback
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-itensBag="props">
          <q-td :props="props">
            <div>
              <q-btn
                icon="work"
                color="white"
                size="sm"
                dense
                class="text-red"
                @click="itensBag(props.row)"
              > 
                <q-tooltip anchor="center left" self="center right">
                  Itens da Bag do cliente
                </q-tooltip>
              </q-btn>
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
        <div class="q-pa-lg">
          <div class="q-gutter-y-md" style="max-width: 300px">
            <q-select
              color="purple-12"
              v-model="statusBag"
              :options="options"
              label="Escolha status"
            />
          </div>
          <div class="q-gutter-y-md q-mt-sm" style="max-width: 300px">
            <q-input
              color="purple-12"
              v-model="valorBag"
              label="Valor Bag"
            />
          </div>
        </div>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Salvar"
            color="primary"
            @click="alterarBag()"
            v-close-popup
          />
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalInfoCliente">
      <q-card style="width: 600px; max-width: 80vw;">
        <div class="q-pa-md">
          <q-item-label class="text-h5 text-center">
            Informações do cliente
          </q-item-label>
          <div class="q-mt-lg">
          <q-item-label class="text-h6">
            Dados Pessoais
          </q-item-label>
          <div class="row">
            <div class="col">
              <q-input
                v-model="cadastroPerfil.nome"
                readonly
                class="q-mr-lg"
                label="Nome completo"
              />
            </div>
            <div class="col">
              <q-input v-model="cadastroPerfil.email" readonly label="E-mail" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model="cadastroPerfil.cpf"
                readonly
                class="q-mr-lg"
                label="CPF"
                mask="###.###.###-##"
              />
            </div>
            <div class="col">
              <q-input
                v-model="cadastroPerfil.dat_nasc"
                readonly
                class=""
                label="Data de nascimento"
                mask="##/##/####"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-input
                v-model="cadastroPerfil.tel_cel1"
                readonly
                class="q-mr-lg"
                label="Celular principal"
                mask="(##) ##### - ####"
              />
            </div>
            <div class="col">
              <q-input
                v-model="cadastroPerfil.tel_cel2"
                readonly
                label="Celular secundário"
                mask="(##) ##### - ####"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="q-pa-md">
        <q-item-label class="text-h6">
          Endereco
        </q-item-label>
        <div class="row">
          <div class="col">
            <q-input
              v-model="cadastroEndereco.cep"
              readonly
              class="q-mr-lg"
              label="CEP"
              mask="#####-###"
              pattern="[a-zA-Z0-9]+"
            />
          </div>
          <div class="col">
            <q-input v-model="cadastroEndereco.uf" readonly label="UF" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="cadastroEndereco.cidade"
              readonly
              class="q-mr-lg"
              label="Cidade"
            />
          </div>
          <div class="col">
            <q-input
              v-model="cadastroEndereco.bairro"
              readonly
              label="Bairro"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="cadastroEndereco.rua"
              readonly
              class="q-mr-lg"
              label="Rua"
            />
          </div>
          <div class="col">
            <q-input
              v-model="cadastroEndereco.numero"
              readonly
              label="Número"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input
              v-model="cadastroEndereco.complemento"
              readonly
              class="q-mr-lg"
              label="Complemento"
            />
          </div>
          <div class="col">
            <q-input
              v-model="cadastroEndereco.observacoes"
              readonly
              label="Observações"
            />
          </div>
        </div>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" v-close-popup />
      </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalFeedback">
      <q-card>
        <q-card-section>
          <div class="text-h6">Feedback do cliente</div>
        </q-card-section>
        <div class="q-pa-md" style="width: 480px">
          <q-input
            v-model="textFeedback"
            filled
            clearable
            type="textarea"
            color="red-12"
            readonly
          />
        </div>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
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
const ENDERECO = {
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  cep: "",
  complemento: "",
  observacoes: ""
};

export default {
  name: "minhasBags",
  data: () => ({
    token: localStorage.getItem("token"),
    baseUrl: "https://power-bag-back.herokuapp.com",
    confirm: false,
    modalCartao: false,
    columns: [
      {
        name: "nome",
        label: "Nome do cliente",
        field: "nomeCliente",
        sortable: true,
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      },
      {
        name: "createdAt",
        label: "Data",
        field: "createdAt",
        sortable: true,
        type: "date",
        align: "center",
        width: "auto",
        headerClasses: "bg-primary text-white text-uppercase",
        format: val => val.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1")
      },
      {
        name: "status",
        label: "Status",
        field: "status",
        sortable: true,
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold"
      },
      {
        name: "valor",
        label: "Valor",
        field: "valor",
        align: "center",
        width: "auto",
        headerClasses: "bg-primary text-white text-uppercase text-bold",
        format: val => "R$ " +  (val.toFixed(2)).replace(".", ",")
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
      },
      {
        name: "itensBag",
        label: "Itens Bag",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      },
      {
        name: "feedback",
        label: "Feedback",
        align: "center",
        width: "auto",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      }
    ],
    bag: [],
    nomeCliente: "",
    cadastroPerfil: DADOS_PERFIL,
    cadastroEndereco: ENDERECO,
    model: null,
    options: [
      "Em separação",
      "Enviado",
      "Recebido",
      "Verificando peças",
      "Finalizado",
      "Compra total",
      "Cancelado"
    ],
    selected: [],
    modalAlterarStatus: false,
    modalInfoCliente: false,
    modalFeedback: false,
    idBagAtual: null,
    statusBag: "",
    salvarStatusBag: null,
    valorBag: null,
    salvarValorBag: null,
    clienteId: null,
    nome: null,
    textFeedback: "",
    usuarioLogado: null
  }),
  mounted() {
    this.buscarBags();
    this.confirmarUsuarioAdmin();
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

      this.bag = response.data.map( bag => Object.assign(bag, {nomeCliente: bag.cliente.nome, emailCliente: bag.cliente.email}) )
    },
    abrirModalAlterarStatus(props) {
      this.modalAlterarStatus = true;

      this.idBagAtual = props.id;
      this.statusBag = props.status;
      this.valorBag = props.valor;

      this.salvarStatusBag = props.status
      this.salvarValorBag = props.valor
    },
    async abrirModalInfoCliente(props) {
      this.modalInfoCliente = true;
      this.clienteId = props.cliente_id;
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/cliente/${this.clienteId}`,
        headers: {
          Authorization: `${this.token}`
        }
      });
      this.cadastroPerfil = Object.assign(response.data);
      this.cadastroEndereco = Object.assign(response.data.endereco)
    },
    async alterarBag() {
      this.$q.loading.show()

      if (this.valorBag === this.salvarValorBag && this.statusBag === this.salvarStatusBag) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Para salvar é necessário realizar alguma alteração na Bag.'
        })
        this.$q.loading.hide()
        this.abrirModalAlterarStatus()
        return
      }

      if (this.valorBag < 0 || this.salvarValorBag < this.valorBag) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Valor da Bag não permitido.'
        })
        this.$q.loading.hide()
        return
      }

      if(this.valorBag !== this.salvarValorBag && this.statusBag !== "Finalizado") {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Somente com o status "Finalizado" é permitido alterar o valor da Bag.'
        })
        this.$q.loading.hide()
        return
      }

      if(this.valorBag === this.salvarValorBag && this.statusBag === "Finalizado") {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Alterar o Status para "Compra Total".'
        })
        this.$q.loading.hide()
        return
      }

      try {
        await axios({
        method: "PUT",
        url: `${this.baseUrl}/bag`,
        headers: {
          Authorization: `${this.token}`
        },
        data: {
          valor: this.valorBag,
          status: this.statusBag,
          id_bag: this.idBagAtual
        }
      })
      setTimeout(() => {
        this.$q.dialog({
          title: "Atenção!",
          message: "O status da bag foi alterado com sucesso!"
        });
        this.$q.loading.hide()
        this.idBagAtual = "";
        this.novoStatusBag = "";
        this.novoValorBag = "";
        this.valorBagAtual = ""
        this.buscarBags();
      }, 500);
      } catch (error) {
        this.$q.dialog({
          title: 'Erro!',
          message: `Erro ao tentar está ação.`
        })
        this.$q.loading.hide()
      }
    },
    async abrirModalFeedback(props) {
      this.$q.loading.show()
      this.modalFeedback = true
      this.clienteId = props.cliente_id;
      this.idBagAtual = props
      try { 
        const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/bag/all`,
        headers: {
          Authorization: `${this.token}`
        }
      });
      const responseBag = Object.assign(response.data);
      const filterBag = responseBag.filter(bag => bag.id == props)
      this.textFeedback = filterBag[0].observacoes
      this.$q.loading.hide()
      } catch (error) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Erro ao acessar Feedback.'
        })
        this.$q.loading.hide()
      }

      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/bag/all`,
        headers: {
          Authorization: `${this.token}`
        }
      });
      const responseBag = Object.assign(response.data);
      const filterBag = responseBag.filter(bag => bag.id == props)
      this.textFeedback = filterBag[0].observacoes
       
    },
    itensBag(props) {
      this.idBagAtual = props.id
      let router =  `${this.baseUrl}/bag/${this.idBagAtual}/itens` 
      window.open(router, '_blank');
    },
    confirmarUsuarioAdmin() {
      this.usuarioLogado = localStorage.getItem("admin")
      console.log(this.usuarioLogado)
      if (this.usuarioLogado === "false") {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Usuário não possui permissão para pagina!'
        })
        localStorage.clear();
        this.$router.push({ name: "home" })
      } 
    }
  }
};
</script>
