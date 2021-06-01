import pagarme from 'pagarme'
import axios from "axios";

export default {
  name: 'ComponentCartao',
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
      baseUrl: "https://power-bag-back.herokuapp.com",
      token: localStorage.getItem("token"),
      clienteId: localStorage.getItem("clienteId"),
      confirm: false,
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
    this.buscarDados();
    this.confirmarUsuarioAdmin()
  },
  computed: {
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";

      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
		generateCardNumberMask () {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    card_hash() {
      const novoCardyear = this.cardYear.toString().slice(2, 4)
      const data = {
        card_number: this.cardNumber.toString(),
        card_holder_name: this.cardName.toString(),
        card_expiration_date: this.cardMonth.toString() + "/" + novoCardyear,
        card_cvv: this.cardCvv.toString(),
      }
      console.log(data)
      pagarme.client.connect({ encryption_key: 'ek_test_8xw1zYHFb3ruE5QXrewbMSKKxjYjzz' })
      .then(client => {
        return client.security.encrypt(data)
      }).then(card_hash => {
        if(this.cardNumber.slice(0,1) === "3") {
          axios({
            method: "POST",
            url: `${this.baseUrl}/cartao`,
            headers: { Authorization: `${this.token}` },
            data: {
              numero: this.cardNumber.slice(0, 4) + "-" + this.cardNumber.slice(14, 17),
              card_hash: card_hash
            }
          });
        } else {
          axios({
            method: "POST",
            url: `${this.baseUrl}/cartao`,
            headers: { Authorization: `${this.token}` },
            data: {
              numero: this.cardNumber.slice(0, 4) + "-" + this.cardNumber.slice(15, 19),
              card_hash: card_hash
            }
          });
        }

      setTimeout(() => {
        this.$q.dialog({
            title: 'Parabéns!',
            message: 'Dados salvo com sucesso!'
        })
        }, 500);
      })
    },
    async buscarDados() {
      const response = await axios({
          method: "GET",
          url: `${this.baseUrl}/cliente/${this.clienteId}`,
          headers: {
            Authorization: `${this.token}`,
          }
      });

      const retornoCartao = response.data.cartao.numero

      if(retornoCartao.slice(0, 1) === "3") {
        const refatoraCartao = retornoCartao.slice(0, 4) + " ****** **" + retornoCartao.slice(5, 8)
        this.cardNumber = refatoraCartao
        this.cardName = "******** *******"
        this.cardCvv = "***"
      } else {
        const refatoraCartao = retornoCartao.slice(0, 4) + " **** **** " + retornoCartao.slice(5, 9)
        this.cardNumber = refatoraCartao
        this.cardName = "******** *******"
        this.cardCvv = "***"
      }

    },
    buscaCartaoAmex() {
      const refatoraCartao = retornoCartao.slice(0, 4) + " " + retornoCartao.slice(4, 10) + " " + retornoCartao.slice(10, 15)
      this.cardNumber = refatoraCartao
    },
    flipCard (status) {
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    },
    confirmarUsuarioAdmin() {
      let usuarioLogado = localStorage.getItem("admin")
      if (usuarioLogado === "true") {
        localStorage.clear();
        this.$router.push({ name: "home" })
      } 
    }
  }
}
