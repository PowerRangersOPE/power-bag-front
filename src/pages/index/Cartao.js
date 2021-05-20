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
      baseUrl: "https://power-bag.herokuapp.com",
      token: localStorage.getItem("token"),
      clienteId: localStorage.getItem("clienteId"),
      confirm: false,
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
    this.buscarDados();
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
      const cardArray = this.cardNumber.split(" ")
      const cardSplit = `${cardArray[0]}-${cardArray[3]}`
      pagarme.client.connect({ encryption_key: 'ek_test_8xw1zYHFb3ruE5QXrewbMSKKxjYjzz' })
      .then(client => {
        return client.security.encrypt({
          card_number: this.cardNumber,
          card_holder_name: this.cardName,
          card_expiration_date: this.cardMonth + this.cardYear,
          card_cvv: this.cardCvv,
        })
      })
      .then(card_hash => {
        axios({
          method: "POST",
          url: `${this.baseUrl}/cartao`,
          headers: { Authorization: `${this.token}` },
          data: {
            numero: cardSplit,
            card_hash: card_hash
          }
      });
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
      console.log(response.data)
      const fullCardNumber = response.data.cartao.numero
      this.cardNumber = fullCardNumber.slice(0, 4) + " **** **** " + fullCardNumber.slice(-4)
      this.cardName = "******** *******"
      this.cardCvv = "***"
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
    }
  }
}
