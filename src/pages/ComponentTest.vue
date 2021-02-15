<template>
  <div class="fixed-center text-center">
    <input
      type="string"
      size="1"
      :value="output.ticker"
    />
    <input
      type="string"
      size="1"
      :value="output.start"
    />
    <input
      type="string"
      size="1"
      :value="output.stop"
    />
    <button
      @click="make_candle()"
    >Test</button>
    <CandleStickChart></CandleStickChart>
  </div>
</template>

<script>
import CandleStickChart from "../components/CandleStickChart.vue";

export default {
  name: 'ComponentTest',
  components: {
    CandleStickChart
  },
  data(){
    return{
      output: {
        ticker: "AAPL",
        start: "2019-01-01",
        stop: "2019-12-08"
      }
    }
  },
  methods: {
    make_candle(){
      this.$root.$emit('generate_candle', this.output);
    }
  }
}
</script>
