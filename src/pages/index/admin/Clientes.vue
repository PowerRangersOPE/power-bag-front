<template>
  <div>
    <div class="q-pa-md">
      <q-table
        dense
        :data="cliente"
        :columns="columns"
        row-key="id"
        class="col"
        :rows-per-page-options="[50]"
      >
        <template v-slot:body-cell-scoreCliente="props">
          <q-td :props="props">
            <div>
              <q-rating
                v-model="props.row.pontuacao"
                size="2.5em"
                color="yellow-5"
                icon="star_rate"
              >
              </q-rating>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-dadosCliente="props">
          <q-td :props="props">
            <q-btn
              icon="visibility"
              color="info"
              size="sm"
              dense
              @click="abrirModalDadosCLiente(props.row)"
            >
              <q-tooltip anchor="center left" self="center right">
                Acessar dados do cliente
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="modalDadosCLiente">
      <q-card style="width: 800px; max-width: 80vw;">
        <div class="q-pa-lg">
          <q-item-label class="text-h5 text-bold text-center q-mb-xl">
            Informações do cliente
          </q-item-label>

          <div class="q-mb-lg">
            <q-item-label class="text-h6 q-mb-sm">
              Alterar Score do Cliente
            </q-item-label>
            <div>
              <q-rating
                v-model="pontuacao"
                size="2em"
                :max="5"
                color="yellow-5"
              />
            </div>
          </div>

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

          <div class="q-mt-lg">
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

        </div>
        <q-card-actions align="right">
          <q-btn flat label="Salvar" color="primary" @click="alterarScore()" />
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
    baseUrl: "http://powerbag-api-dev.us-east-1.elasticbeanstalk.com",
    confirm: false,
    columns: [
      {
        name: "nome",
        label: "Nome do cliente",
        field: "nome",
        sortable: true,
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      },
      {
        name: "cpf",
        label: "cpf",
        field: "cpf",
        sortable: true,
        align: "center",
        width: "auto",
        headerClasses: "bg-primary text-white text-uppercase",
        format: val => val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      },
      {
        name: "scoreCliente",
        label: "Score Cliente",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      },
      {
        name: "dadosCliente",
        label: "Dados Cliente",
        align: "center",
        headerClasses: "bg-primary text-white text-uppercase text-bold "
      }
    ],
    bag: [],
    cliente: [],
    nomeCliente: "",
    cadastroPerfil: DADOS_PERFIL,
    cadastroEndereco: ENDERECO,
    scoreCliente: null,
    modalDadosCLiente: false,
    clienteId: null,
    pontuacao: null
  }),
  mounted() {
    this.buscarClientes();
    this.confirmarUsuarioAdmin();
  },
  methods: {
    confirmarPedido() {
      this.confirm = true;
    },
    async buscarClientes() {
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/cliente`,
        headers: {
          Authorization: `${this.token}`
        }
      });

      console.log(response.data)

      this.cliente = response.data.filter((cliente) => {
        return cliente.adm === false
      })
      console.log(this.cliente)
    },
    confirmarUsuarioAdmin() {
      this.usuarioLogado = localStorage.getItem("admin")
      if (this.usuarioLogado === "false") {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Usuário não possui permissão para pagina!'
        })
        localStorage.clear();
        this.$router.push({ name: "home" })
      }
    },
    async abrirModalDadosCLiente(props) {
      this.modalDadosCLiente = true;
      this.pontuacao = props.pontuacao
      this.clienteId = props.id;
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
    async alterarScore() {
      this.$q.loading.show()
      try {
        axios({
          method: "PUT",
          url: `${this.baseUrl}/cliente/${this.clienteId}`,
          data: {
            pontuacao: this.pontuacao
          }
        });
        setTimeout(() => {
          this.$q.dialog({
            title: "Parabéns!",
            message: "Score alterado com sucesso!"
          });
          this.$q.loading.hide()
          this.modalDadosCLiente = false;
          this.buscarClientes();
        }, 500);
      } catch (error) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Erro ao tentar salvar.'
        })
        this.$q.loading.hide()
        this.buscarClientes();
      }
    },
  }
};
</script>
