import axios from 'axios'
import ComponentFooter from 'src/components/ComponentFooter.vue'

export default {
  name: 'Cadastro',
  components: { ComponentFooter },
  data () {
    return {
      email: '',
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
    async cadastrar () {
      this.$refs.email.validate()
      this.$refs.user.validate()
      this.$refs.password.validate()
      if(this.$refs.email.hasError || this.$refs.user.hasError || this.$refs.password.hasError) {
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
          url: 'https://power-bag.herokuapp.com/cliente',
          data: {
            email: this.email,
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
        console.log(error.response)
        this.$q.dialog({
          title: 'Atenção!',
          message: 'O E-mail ja possui cadastro, por gentileza utilze outro.'
        })
        this.email = ''
        this.user = ''
        this.password = ''
      }
     
    }  
  }
}
