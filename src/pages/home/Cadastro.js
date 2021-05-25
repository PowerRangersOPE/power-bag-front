import axios from 'axios'
import ComponentFooter from 'src/components/ComponentFooter.vue'

export default {
  name: 'Cadastro',
  components: { ComponentFooter },
  data () {
    return {
      cpf: '',
      user: '',
      password: ''
    }
  },
  methods: {
    required (val) {
      return (val && val.length > 0) || 'O campo deve ser preenchido'
    },
    short (val) {
      return (val && val.length > 3) || 'Mínimo 4 caracters'
    },
    isEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Por favor digite e-mail válido'
    },
    isNomeSobrenome (val) {
      const nomePattern = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/
      return nomePattern.test(val) || 'Por favor digite o nome e sobrenome'
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
    async cadastrar () {
      this.$refs.cpf.validate()
      this.$refs.user.validate()
      this.$refs.password.validate()
      if(this.$refs.cpf.hasError || this.$refs.user.hasError || this.$refs.password.hasError) {
        this.formHasError = true
        this.$q.dialog({
          title: 'Atenção',
          message: 'Dados preenchidos incorretamente.'
        })
        return
      }
      try {
       await axios({
          method: 'post',
          url: 'https://power-bag-back.herokuapp.com/cliente',
          data: {
            cpf: this.cpf,
            nome: this.user,
            senha: this.password
          }
        });
        this.$q.dialog({
          title: 'Bem Vindo ao PowerBag!',
          message: 'Cadastro realizado com sucesso! Faça seu login!'
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 500);
      } catch (error) {
        this.$q.dialog({
          title: 'Atenção!',
          message: 'O E-mail ja possui cadastro, por gentileza utilze outro.'
        })
        this.cpf = ''
        this.user = ''
        this.password = ''
      }

    }
  }
}
