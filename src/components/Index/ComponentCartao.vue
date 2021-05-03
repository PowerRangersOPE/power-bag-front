<template>
  <div class="q-ma-md col-7">
    <q-item-label class="text-h5">
      Cartão cadastrado
    </q-item-label>
    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroCartao.numero"
          filled
          mask="#### #### #### ####"
          label="Número do cartão"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          id="inputNome"
          v-model="cadastroCartao.nome"
          :value="cadastroCartao.nome"
          filled
          type="text"
          label="Nome"
        />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col">
        <q-input
          v-model="cadastroCartao.validade"
          filled
          class="q-mr-lg"
          label="Validade"
          mask="##/##"
        />
      </div>
      <div class="col">
        <q-input
          v-model="cadastroCartao.cpf"
          filled
          label="CPF"
          mask="###.###.###-##"
        />
      </div>
    </div>

    <div class="col q-mt-xl">
      <q-btn color="black" label="Salvar" @click="salvar()" />
    </div>
  </div>
</template>

<script>

const CARTAO = {
  numero: "",
  nome: "",
  cpf: "",
  validade: "",
  cliente_id: ""
};

export default {
  name: "ComponentHeader",
  data() {
    return {
      cadastroCartao: CARTAO,
    };
  },
  methods: {
    salvar() {
      let token = localStorage.getItem("token");
      axios({
        method: "post",
        url: "https://power-bag.herokuapp.com/cartao",
        headers: {
          Authorization: `${token}`
        },
        data: {}
      });
      this.$router.push("/index");
    },
  }
};
</script>
