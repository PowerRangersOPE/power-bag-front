import ComponentFooter from 'src/components/ComponentFooter.vue';
import StyleMOCK from  'src/mock/StyleMOCK.json';
import axios from "axios";

export default {
  name: 'Index',

  components: { ComponentFooter },
  props: ['shop'],
  data () {
    console.log(`TESTE THIS SHOP ${this.shop}`)

  //   for (let i in homeStyleMOCK.home.head){
  //     for(let j in homeStyleMOCK.home.head[i]){
  //       console.log(j + " " + homeStyleMOCK.home.head[i][j]);
  //       sessionStorage.setItem(j, homeStyleMOCK.home.head[i][j]);
  //   }
  // }
    if (this.shop === 'error') this.$router.push({ name: "error" })
    const {head, body:{footer}} = JSON.parse(sessionStorage.getItem("home"))
    console.log(head)
    console.log(footer)
    return {
      baseUrl: "http://powerbag-api-dev.us-east-1.elasticbeanstalk.com",
      padding: true,
      vertical: false,
      arrows: true,
      navigation: true,

      navPos: 'bottom',
      navigationPositions: [
        { value: 'top', label: 'top' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom (default)' },
        { value: 'left', label: 'left' }
      ],

      slide: 'style',
      texto01: 'Preencha algumas perguntas para conhecermos suas necessidades',
      texto02: 'Entraremos em contato para confirmar as peças e estilo que gostou',
      texto03: 'Prontinho! Sua bag personalizada será entregue em até 24 horas após a aprovação do pedido',

      homeHeadSloganTextTitle: head.slogan.homeHeadSloganTextTitle,
      homeHeadSloganTextColor: head.slogan.homeHeadSloganTextColor,
      homeHeadSloganTextSize: head.slogan.homeHeadSloganTextSize,
      homeHeadSloganTextFont: head.slogan.homeHeadSloganTextFont,

      homeBtnRegistrationColor: head.btn.homeBtnRegistrationColor,
      homeBtnLoginColor: head.btn.homeBtnLoginColor,

      footerRightReservedText: footer.footerRightReservedText,
      footerBgColor: footer.footerBgColor,
      footerFontText:footer.footerFontText,
      footerInstagramLink:footer.footerInstagramLink,
      footerRedirectEmail:footer.footerRedirectEmail,
    }
  },
  mounted() {
    this.loadingCustomPage();
  },
  watch: {
    vertical (val) {
      this.navPos = val === true
        ? 'right'
        : 'bottom'
    }
  },
  methods: {
    async loadingCustomPage () {
      const shopCliente = "elegantkids"
      const {data: { shopStyles: { home, profile } }} =  await axios({
        method: "GET",
        url: `${this.baseUrl}/shop/${shopCliente}`,
      });
      sessionStorage.setItem('home', JSON.stringify(home));
      sessionStorage.setItem('profile', JSON.stringify(profile));
    }
  }
}



