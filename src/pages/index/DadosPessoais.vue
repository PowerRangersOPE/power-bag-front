<template>
  <div>
    <q-item-label class="text-h5">
      Dados Pessoais
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.nome"
          disable
          class="q-mr-lg"
          label="Nome completo"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          v-model="cadastroPerfil.cpf"
          disable
          label="CPF"
          mask="###.###.###-##"
        />
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          type="email"
          ref="email"
          v-model="cadastroPerfil.email"
          class="q-mr-lg"
          label="E-mail"
          :rules="[this.required, this.short, this.isEmail]"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          type="text"
          ref="dat_nasc"
          v-model="cadastroPerfil.dat_nasc"
          class=""
          label="Data de nascimento"
          mask="##/##/####"
          :rules="[this.required, this.isDateNasc]"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-12 col-sm">
        <q-input
          type="tel"
          ref="tel_cel1"
          v-model="cadastroPerfil.tel_cel1"
          class="q-mr-lg"
          label="Celular principal"
          mask="(##) ##### - ####"
          :rules="[this.required, this.isCellPhone]"
        />
      </div>
      <div class="col-12 col-sm">
        <q-input
          ref="tel_cel2"
          v-model="cadastroPerfil.tel_cel2"
          label="Celular secundário"
          mask="(##) ##### - ####"
          :rules="[this.required, this.isCellPhone]"
        />
      </div>
    </div>

    <div class="col q-mt-xl">
      <q-btn color="green-5" label="Salvar" @click="confirmaSalvar()" />
      <q-btn class="q-ml-md" color="black" label="próximo" to="endereco" />
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="announcement" color="primary" text-color="white" />
          <span class="q-ml-sm">Deseja salvar os dados?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Sim"
            color="primary"
            @click="salvarDadosPessoais()"
            v-close-popup
          />
          <q-btn flat label="Não" color="primary" v-close-popup />
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
  tel_cel1: "",
  tel_cel2: "",
  dat_nasc: "",
  status: "ativo",
  pontuacao: "5"
};

export default {
  name: "ComponentDadosPessoais",
  data() {
    return {
      baseUrl: "http://powerbag-api-dev.us-east-1.elasticbeanstalk.com",
      cadastroPerfil: DADOS_PERFIL,
      mostrarDadosPessoais: true,
      confirm: false,
      identificacao: ["Sra", "Sr"],
      token: localStorage.getItem("token"),
      clienteId: localStorage.getItem("clienteId")
    };
  },
  mounted() {
    this.buscardados();
  },
  methods: {
    required(val) {
      return (val && val.length > 0) || "O campo deve ser preenchido";
    },
    short(val) {
      return (val && val.length > 3) || "Mínimo 4 caracters";
    },
    isEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Por favor digite e-mail válido";
    },
    isCellPhone(val) {
      const cellPattern = /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
      var er = /[^a-z0-9]/gi;
      return cellPattern.test(val.replace(er, "")) || "Por favor digite celular válido"
    },
    isDateNasc(val) {
      const datePattern = /^(?:(?:31(\/)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
      return datePattern.test(val) || "Por favor digite data válida"
    },
    confirmaSalvar() {
      this.confirm = true;
    },
    salvarDadosPessoais() {
      this.$q.loading.show()
      this.$refs.email.validate()
      this.$refs.dat_nasc.validate()
      this.$refs.tel_cel1.validate()
      this.$refs.tel_cel2.validate()

      if(
        this.$refs.email.hasError ||
        this.$refs.tel_cel1.hasError ||
        this.$refs.tel_cel2.hasError ||
        this.$refs.dat_nasc.hasError
      ) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Dados preenchidos incorretamente.'
        })
        this.$q.loading.hide()
        return
      }
      try {
        axios({
          method: "PUT",
          url: `${this.baseUrl}/cliente/${this.clienteId}`,
          data: {
            email: this.cadastroPerfil.email,
            tel_cel1: this.cadastroPerfil.tel_cel1,
            tel_cel2: this.cadastroPerfil.tel_cel2,
            dat_nasc: this.cadastroPerfil.dat_nasc
          }
        });
        setTimeout(() => {
          this.$q.dialog({
            title: "Parabéns!",
            message: "Dados salvo com sucesso!"
          });
          this.$q.loading.hide()
          this.buscardados();
        }, 500);
      } catch (error) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Erro ao tentar salvar.'
        })
        this.$q.loading.hide()
      }
    },
    async buscardados() {
      this.cadastroPerfil.nome = localStorage.getItem("nome");
      this.cadastroPerfil.cpf = localStorage.getItem("cpf");
      const response = await axios({
        method: "GET",
        url: `${this.baseUrl}/cliente/${this.clienteId}`,
        headers: {
          Authorization: `Basic ${this.token}`
        }
      });
      const busca = Object.assign(this.cadastroPerfil, response.data);
      this.cadastroPerfil.email = busca.email;
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
