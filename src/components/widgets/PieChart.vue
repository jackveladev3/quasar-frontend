<script>
import { Pie } from 'vue-chartjs'
 
export default {
  extends: Pie,
  props: {
    chart_data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chart_data, this.options)
  }
}
 </script>