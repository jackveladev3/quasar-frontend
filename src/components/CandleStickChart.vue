<template>
  <div>
    <!-- {{message}} -->
    <BottomReachingScrollArea>
      <div id="candlestickchart"></div>
    </BottomReachingScrollArea>
    <div id="barchart"></div>
  </div>
</template>

<script>
import axios from "axios";
import ApexCharts from 'apexcharts';
import BottomReachingScrollArea from "../components/BottomReachingScrollArea.vue";

export default {
  name: 'CandleStickChart',
  // components: {

  // },
  data(){
    return {
      chart_data: {
        seriesCandle: [{
          data: []
        }],
        seriesBar: [{
          name: 'volume',
          data: []
        }],
        chartOptionsCandlestick: {
          chart: {
            height: 400,
            width: 800,
            type: 'candlestick',
            id: 'candles',
            toolbar: {
              autoSelected: 'pan',
              show: false
            },
            zoom: {
              enabled: false
            },
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#3C90EB',
                downward: '#DF7D46'
              }
            }
          },
          xaxis: {
            type: 'datetime'
          },
          series: [{
            data: []
          }]
        },
        chartOptionsBar: {
          chart: {
            height: 200,
            width: 800,
            type: 'bar',
            brush: {
              enabled: true,
              target: 'candles'
            },
            selection: {
              enabled: true,
              xaxis: {
                min: new Date('20 Jan 2017').getTime(),
                max: new Date('10 Dec 2017').getTime()
              },
              fill: {
                color: '#ccc',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
              }
            },
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            bar: {
              columnWidth: '80%',
              colors: {
                ranges: [{
                  from: -10000000,
                  to: 0,
                  color: '#F15B46'
                }, {
                  from: 1,
                  to: 100000000,
                  color: '#FEB019'
                }],

              },
            }
          },
          stroke: {
            width: 2
          },
          xaxis: {
            type: 'datetime',
            axisBorder: {
              offsetX: 13
            },
            categories: []
          },
          yaxis: {
            labels: {
              show: false
            }
          },
          series: [{
            name: 'volume',
            data: []
          }]
        }
      }
    }
  },
  created() {
    this.$root.$on('generate_candle', (input) => {
      console.log(input);
      this.get_series_data(input);
    });
  },
  methods: {
    build_candle_chart(){
      let chart = new ApexCharts(
        document.querySelector("#candlestickchart"),
        this.chart_data.chartOptionsCandlestick
      );
      chart.render();
    },
    build_volume_chart(){
      let chart = new ApexCharts(
        document.querySelector("#barchart"),
        this.chart_data.chartOptionsBar
      );
      chart.render();
    },
    get_series_data(input){
      let ticker = input['ticker'];
      let start = input['start'];
      let stop = input['stop'];
      axios({
        method: "get",
        url: "http://optionstrats.com/daily_data/" + ticker + "/stock_price_series/" + start + "/" + stop,
        headers: {
          common: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
      .then((response) => {
        // Set data
        console.log("response " + ticker + " to " + start + " " + stop);
        console.log(response);
        this.chart_data.chartOptionsCandlestick.series = [];
        this.chart_data.chartOptionsCandlestick.series.push({data: []});
        this.chart_data.chartOptionsBar.series = [];
        this.chart_data.chartOptionsBar.series.push({name: "volume", data: []});
        for (let i=0; i < response.data.length; i++){
          this.chart_data.chartOptionsCandlestick.series[0].data.push(
            {
              x: response.data[i].x,
              y: response.data[i].y
            }
          );
          this.chart_data.chartOptionsBar.series[0].data.push(
            response.data[i].volume
          );
          this.chart_data.chartOptionsBar.xaxis.categories.push(
            response.data[i].x
          );
        }
        console.log(this.chart_data.chartOptionsCandlestick.series[0].data);
        console.log(this.chart_data.chartOptionsBar.series[0].data);
        this.build_candle_chart();
        this.build_volume_chart();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>