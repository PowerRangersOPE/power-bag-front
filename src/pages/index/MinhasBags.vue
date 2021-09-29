<template>
  <div>
    <div>
      <div class="col q-mb-md">
        <q-btn
          color="green"
          label="Solicitar nova Bag"
          @click="confirmarPedido()"
        />
      </div>
    </div>
    <div>
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
                color="grey"
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
                @click="abrirModalAlterarStatus(props.row.id)"
              >
                <q-tooltip anchor="center left" self="center right">
                  Alterar status da minha Bag
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-feedback="props">
          <q-td :props="props">
            <div>
              <q-btn
                v-if="props.row.status === 'Compra total' || props.row.status === 'Finalizado'"
                icon="chat"
                color="info"
                size="sm"
                dense
                @click="abrirModalFeedback(props.row)"
                >
                  <q-tooltip anchor="center left" self="center right">
                    Deixe o seu feedback do atendimento
                  </q-tooltip>
                </q-btn>
              <q-btn
                v-else
                icon="chat"
                color="grey"
                size="sm"
                dense
                disable
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
          <span class="text-h6 q-ml-sm"
            >Deseja continuar com a solicitação da Bag?<span class="text-red" >*</span>
          </span>
        </q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <q-banner rounded class="text-red ">
          <b>*Não esqueça de revisar o seu perfil antes de solicitar uma nova bag !</b>
          </q-banner>
        </div>
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
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">O que vai fazer com a sua bag?</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <li>Na opção <u><b>Compra Total</b></u> você ficará com todos as peças da sua bag (inclusive a bag). O valor cobrado é o mesmo já debitado do seu cartão.</li>
          <br>
          <br>
          <li>Na opção <u><b>Solicitado a Retirada</b></u>, você ja escolheu suas peças e quer devolver as outras. Vamos retirar a bag com os itens restantes e realizar o estorno do valor correspondente. Você também escolhe essa opção se quiser devolver a bag completa.</li>
          <p></p>
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

    <q-dialog v-model="modalFeedback">
      <q-card>
        <q-card-section>
          <div class="text-h6">Deixe um Feedback para o nosso atendimento</div>
        </q-card-section>
        <div class="q-pa-lg">
          <q-input
            v-model="textFeedback"
            filled
            type="textarea"
            color="red-12"
            label="Seu feedback"
          />
        </div>
        <q-card-actions align="right">
          <q-btn flat label="Salvar" color="primary" @click="feedbackBag()" v-close-popup />
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
    baseUrl: "http://powerbag-api-dev.us-east-1.elasticbeanstalk.com",
    confirm: false,
    columns: [
      {
        name: "createdAt",
        label: "Data",
        field: "createdAt",
        sortable: true,
        type: "date",
        align: "center",
        width: "auto",
        headerClasses: "bg-primary text-white text-uppercase",
        format: val => `${val.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1")}`
      },
      {
        name: "status",
        label: "Status",
        field: "status",
        align: "center",
        width: "auto",
        headerClasses: "bg-primary text-white text-uppercase text-bold"
      },
      {
        name: "valor",
        label: "Valor",
        field: "valor",
        align: "center",
        width: "auto",
        headerClasses: "bg-primary text-white text-uppercase text-bold",
        format: val => "R$ " + val.toString().replace(".", ",")
      },
      {
        name: "action",
        label: "Alterar Status da BAG",
        align: "center",
        width: "auto",
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
    model: null,
    options: ["Compra total", "Solicitado a retirada"],
    selected: [],
    modalCartao: false,
    modalAlterarStatus: false,
    modalFeedback: false,
    idBagAtual: null,
    novoStatusBag: null,
    textFeedback: ""
  }),
  computed: {
    buttonColor () {
      return this.$q.screen.lt.md
        ? 'primary'
        : 'secondary'
    }
  },
  mounted() {
    this.buscarBags();
    this.confirmarUsuarioAdmin();
  },
  methods: {
    confirmarPedido() {
      this.confirm = true;
    },
    async solicitarBag() {
      try {
        const cadastroPreenchido = await axios({
          method: "GET",
          url: `${this.baseUrl}/cliente/validate`,
          headers: {
          Authorization: `${this.token}`
        }
      });

      const retornoReason = cadastroPreenchido.data.reason

      if(retornoReason === 'solicitacao em aberto') {
        this.$q.dialog({
          title: "Atenção!",
          message:
            "Para solicitar nova Bag é necessário é necessário aguardar a finalização do último pedido"
        });
        return false;
      }

      if(retornoReason === 'dados cadastrais') {
        this.$q.dialog({
          title: "Atenção!",
          message:
            "Para solicitar a Bag é necessário ter todos os cadastros preenchidos"
        });
        return false;
      }

      const response = await axios({
        method: "POST",
        url: `${this.baseUrl}/bag`,
        headers: {
          Authorization: `${this.token}`
        }
      })

      localStorage.setItem("bag", JSON.stringify(response.data));

      setTimeout(() => {
        this.$q.dialog({
          title: "Parabéns!!!",
          message: "Sua bag foi solicitada com sucesso!"
        });
        this.buscarBags();
      }, 500);
      } catch(error) {
        this.$q.dialog({
          title: "Error!!!",
          message: " Erro na solicitação da sua bag ! "
        });
      }
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
    },
    abrirModalFeedback(props) {
      this.modalFeedback = true
      this.idBagAtual = props.id
      this.textFeedback = props.observacoes
    },
    feedbackBag() {
      axios({
        method: "PUT",
        url: `${this.baseUrl}/bag`,
        headers: {
          Authorization: `${this.token}`
        },
        data: {
          observacoes: this.textFeedback,
          id_bag: this.idBagAtual
        }
      })
      setTimeout(() => {
        this.$q.dialog({
          title: "Atenção!",
          message: "O seu feedback foi inserido com sucesso!"
        });
        this.buscarBags();
      }, 500);
    },
    confirmarUsuarioAdmin() {
      let usuarioLogado = localStorage.getItem("admin")
      if (usuarioLogado === "true") {
        localStorage.clear();
        this.$router.push({ name: "home" })
      }
    }
  }
};
</script>
