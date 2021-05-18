import ComponentFooter from "src/components/ComponentFooter.vue";
import axios from "axios";

export default {
  name: "Login",
  components: { ComponentFooter },
  data() {
    return {
      email: "",
      password: "",
      baseUrl: "https://power-bag.herokuapp.com",
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
    async login() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if(this.$refs.email.hasError || this.$refs.password.hasError) {
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
          url: "https://power-bag.herokuapp.com/login",
          data: {
            email: this.email,
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
          localStorage.setItem("email", responseCliente.data.email);
          
        setTimeout(() => {
          this.$router.push({ name: "minhas-bags" });
        }, 500);  
        
      } catch (error) {
        if(error.response.data.error === "Senha didnt match") {
          console.log(error.response.data.error);
          this.$q.dialog({
            title: 'Atenção',
            message: 'Login ou Senha incorreta. Tente novamente.'
          })
          this.email = ''
          this.password = ''
        }
        if(error.response.data.error === "Cliente not found") {
          console.log(error.response.data.error);
          this.$q.dialog({
            title: 'Atenção',
            message: 'Login não localizado. Faça seu cadastro!'
          })
          this.email = ''
          this.password = ''
        }
      }
    }
  }
};
