import ComponentFooter from "src/components/ComponentFooter.vue";
import axios from "axios";

export default {
  name: "Login",
  components: { ComponentFooter },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
    if (localStorage.age) {
      this.age = localStorage.age;
    }
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
      const data = {
        email: this.email,
        senha: this.password
      };
      const token = Buffer.from(`${this.email}:${this.password}`, "utf8").toString(
        "base64"
      );
      const url = "https://power-bag.herokuapp.com";

      const { data: response } = await axios.post(`${url}/login`, data);

      this.$router.push({ name: 'index', params: { cliente: response } })
    }
  }
};
