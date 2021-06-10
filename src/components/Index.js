/* global Node */
let Index = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.config.localConfig
    return {
      invoice: `年月份	110年 03 ~ 04 月
特別獎	59518250
同期統一發票收執聯8位數號碼與特別獎號碼相同者獎金1,000萬元
特獎	81016847
同期統一發票收執聯8位數號碼與特獎號碼相同者獎金200萬元
頭獎	
22884739

80660537

62637675

同期統一發票收執聯8位數號碼與頭獎號碼相同者獎金20萬元
二獎	同期統一發票收執聯末7 位數號碼與頭獎中獎號碼末7 位相同者各得獎金4萬元
三獎	同期統一發票收執聯末6 位數號碼與頭獎中獎號碼末6 位相同者各得獎金1萬元
四獎	同期統一發票收執聯末5 位數號碼與頭獎中獎號碼末5 位相同者各得獎金4千元
五獎	同期統一發票收執聯末4 位數號碼與頭獎中獎號碼末4 位相同者各得獎金1千元
六獎	同期統一發票收執聯末3 位數號碼與 頭獎中獎號碼末3 位相同者各得獎金2百元
增開六獎	187`
    }
  },
  components: {
  },
  computed: {
    outoutList () {
      let output = []
      
      let spp1 = this.getLineNumber(this.invoice, '特別獎	')
      if (spp1 !== null) {
        output.push(spp1)
      }
      
      let spp2 = this.getLineNumber(this.invoice, '特獎	')
      if (spp2 !== null) {
        output.push(spp2)
      }
      
      let numbers = this.getJackpots(this.invoice)
      if (numbers !== null) {
        output = output.concat(numbers)
      }
      
      let spp6 = this.getLineNumber(this.invoice, '增開六獎	')
      if (spp6 !== null) {
        output.push(spp6)
      }
      
      output.sort((a, b) => {
        return (Number(a.slice(0,1)) - Number(b.slice(0,1)))
      })
      
      // 
      
      return output.join('\n')
    }
  },
  watch: {
  },
  methods: {
    getLineNumber (text, needle) {
      let pos = text.indexOf(needle)
      if (pos === -1) {
        return null
      }
      
      let endPos = text.indexOf('\n', pos + needle.length)
      if (endPos === -1) {
        endPos = text.length
      }
      let n = text.slice(pos + needle.length, endPos)
      if (n.length !== 8) {
        return null
      }
      
      return n.slice(-3)
    },
    getJackpots (text) {
      let output = []
      
      text.split('\n').forEach(line => {
        if (line.length === 8 
                && isNaN(line) === false) {
          let footer3number = line.slice(-3)
          output.push(footer3number)
        } 
      })
      
      return output
    }
  }
}

export default Index