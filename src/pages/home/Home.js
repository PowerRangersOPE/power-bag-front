import ComponentFooter from 'src/components/ComponentFooter.vue'

export default {
  name: 'Index',
  components: { ComponentFooter },
  data () {
    return {
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
      texto03: 'Prontinho! Sua bag personalizada será entregue em até 24 horas após a aprovação do pedido'
    }
  },

  watch: {
    vertical (val) {
      this.navPos = val === true
        ? 'right'
        : 'bottom'
    }
  }
}
