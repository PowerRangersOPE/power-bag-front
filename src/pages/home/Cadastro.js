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
    cadastrar () {
      axios({
        method: 'post',
        url: 'https://power-bag.herokuapp.com/cliente',
        data: {
          email: this.email,
          nome: this.user,
          senha: this.password
        }
      });
      this.$router.push('/')
    }  
  }
}
