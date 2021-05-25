import ComponentFooter from "src/components/ComponentFooter.vue";
import axios from "axios";

export default {
  name: "Login",
  components: { ComponentFooter },
  data() {
    return {
      cpf: "",
      password: "",
      admin: "",
      baseUrl: "https://power-bag-back.herokuapp.com",
    };
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
    isCpf (cpf) {
      if (typeof cpf !== "string") return 'CPF digitado é inválido'
      cpf = cpf.replace(/[\s.-]*/igm, '')
        if (
          !cpf ||
          cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999" 
        ) {
            return 'CPF digitado é inválido'
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(9, 10)) ) return 'CPF digitado é inválido'
        soma = 0
        for (var i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11))  resto = 0
        if (resto != parseInt(cpf.substring(10, 11) ) ) return 'CPF digitado é inválido'
    },
    async login() {
      this.$refs.cpf.validate()
      this.$refs.password.validate()
      if(this.$refs.cpf.hasError || this.$refs.password.hasError) {
        this.formHasError = true
        this.$q.dialog({
          title: 'Atenção',
          message: 'Login ou Senha preenchido incorretamente.'
        })
        return
      }
      try {
        const responseLogin = await axios({
          method: "POST",
          url: "https://power-bag-back.herokuapp.com/login",
          data: {
            cpf: this.cpf,
            senha: this.password
          }
        })

        localStorage.setItem("token", responseLogin.data.token);
        localStorage.setItem("clienteId", responseLogin.data.clienteId);

        let clienteId = localStorage.getItem("clienteId")
        let token = localStorage.getItem("token")

        const responseCliente = await axios
          .get(`${this.baseUrl}/cliente/${clienteId}`, {
            headers: { Authorization: `${token}` }
          })

          localStorage.setItem("nome", responseCliente.data.nome);
          localStorage.setItem("email", responseCliente.data.cpf);
          localStorage.setItem("admin", responseCliente.data.adm);

          const admin = responseCliente.data.adm

          if(admin === true) {
            setTimeout(() => {
              this.$router.push({ name: "lista-pedidos" });
            }, 500);
          } else {
            setTimeout(() => {
              this.$router.push({ name: "minhas-bags" });
            }, 500);
          }
      } catch (error) {
        if(error.response.data.error === "Senha didnt match") {
          console.log(error.response.data.error);
          this.$q.dialog({
            title: 'Atenção',
            message: 'Login ou Senha incorreta. Tente novamente.'
          })
          this.cpf = ''
          this.password = ''
        }
        if(error.response.data.error === "Cliente not found") {
          console.log(error.response.data.error);
          this.$q.dialog({
            title: 'Atenção',
            message: 'Login não localizado. Faça seu cadastro!'
          })
          this.cpf = ''
          this.password = ''
        }
      }
    }
  }
};
