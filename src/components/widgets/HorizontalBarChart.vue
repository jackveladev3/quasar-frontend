<script>
import { HorizontalBar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;
 
export default {
  extends: HorizontalBar,
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