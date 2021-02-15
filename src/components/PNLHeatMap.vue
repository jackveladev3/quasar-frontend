<template>
  <div>
    <div id="heatmapchart"></div>
  </div>
</template>

<script>
import axios from "axios";
import ApexCharts from 'apexcharts';

let cash_const = "cash";
let percent_const = "percent";
let largest_font_size_allowed = 24;
let smallest_font_size_allowed = 6;

export default {
  name: "PNLHeatMap",
  data() {
    return {
      message: "great success",
      order_list: {
        IBM: {
          current_price: 135,
          implied_volatility: 20,
          output_display: cash_const,
          expiration_orders: {
            "2019-11-15": {
              data: [
                {
                  asset_type: "put",
                  transaction: "buy",
                  order_amount: 1,
                  strike_price: 125,
                  premium: 0.14,
                }
              ],
              chart: null,
              options: {
                chart: {
                  height: 500,
                  type: 'heatmap'
                },
                dataLabels: {
                  enabled: false
                },
                series: [],
                title: {
                  text: 'Heatmap Test'
                },
                grid: {
                  padding: {
                    right: 1
                  }
                },
                xaxis: {
                  type: 'category',
                  categories: []
                },
                plotOptions: {
                  heatmap: {
                    shadeIntensity: 0.5,
                    colorScale: {
                      ranges: [
                        {
                          from: -150,
                          to: -50,
                          name: '-150 - -50',
                          color: '#641e16'
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      },
      dummy_data_cash: {
        data: {
          AllData:[
            {
              Name: 158,
              Data: [-126.11,-126.37,-126.82,-127.54,-128.56,-129.94,-131.79,-134.19,-137.28,-141.20,-146.16,-152.43,-160.34,-170.37,-183.16,-199.70,-221.50,-250.01,-272.85, -273.0]
            },
            {
              Name: 157,
              Data: [-120.58,-120.54,-120.69,-121.05,-121.71,-122.70,-124.12,-126.06,-128.66,-132.05,-136.47,-142.18,-149.54,-159.04,-171.41,-187.77,-210.11,-241.42,-272.57, -273.0]
            },
            {
              Name: 156,
              Data: [-115.05,-114.70,-114.51,-114.53,-114.80,-115.36,-116.33,-117.77,-119.83,-122.65,-126.44,-131.48,-138.16,-146.98,-158.71,-174.59,-196.97,-230.42,-271.79, -273.0]
            },
            {
              Name: 155,
              Data: [-109.56,-108.88,-108.36,-107.99,-107.85,-107.98,-108.44,-109.36,-110.82,-112.99,-116.10,-120.39,-126.26,-134.22,-145.08,-160.15,-182.02,-216.68,-269.78, -273.0]
            },
            {
              Name: 154,
              Data: [-104.10,-103.09,-102.21,-101.46,-100.88,-100.55,-100.51,-100.84,-101.68,-103.16,-105.50,-108.94,-113.88,-120.81,-130.58,-144.46,-165.23,-199.90,-265.19, -273.0]
            },
            {
              Name: 153,
              Data: [-98.67, -97.37, -96.11, -94.96, -93.95, -93.12, -92.53, -92.28, -92.44, -93.18, -94.67, -97.19,-101.08,-106.83,-115.24,-127.62,-146.66,-179.91,-255.87, -273.0]
            },
            {
              Name: 152,
              Data: [-93.37, -91.71, -90.09, -88.54, -87.07, -85.73, -84.59, -83.70, -83.16, -83.10, -83.70, -85.19, -87.91, -92.34, -99.19,-109.69,-126.37,-156.70,-238.90, -273.0]
            },
            {
              Name: 151,
              Data: [-88.16, -86.16, -84.17, -82.20, -80.27, -78.42, -76.70, -75.16, -73.87, -73.00, -72.64, -73.02, -74.48, -77.44, -82.53, -90.83,-104.55,-130.39,-211.26, -273.0]
            },
            {
              Name: 150,
              Data: [-83.08, -80.75, -78.38, -75.99, -73.59, -71.22, -68.91, -66.70, -64.66, -62.90, -61.55, -60.77, -60.87, -62.21, -65.35, -71.19, -81.41,-101.33,-170.90, -273.0]
            },
            {
              Name: 149,
              Data: [-78.16, -75.48, -72.74, -69.95, -67.09, -64.19, -61.27, -58.39, -55.57, -52.91, -50.52, -48.53, -47.20, -46.81, -47.84, -50.95, -57.26, -70.08,-117.94, -173.0]
            },
            {
              Name: 148,
              Data: [-73.44, -70.44, -67.32, -64.10, -60.77, -57.35, -53.85, -50.27, -46.66, -43.09, -39.63, -36.39, -33.56, -31.37, -30.16, -30.35, -32.43, -37.37, -55.49,  -73.0]
            },
            {
              Name: 147,
              Data: [-68.93, -65.60, -62.13, -58.49, -54.69, -50.76, -46.66, -42.40, -38.01, -33.52, -28.97, -24.46, -20.08, -16.02, -12.48,  -9.62,  -7.30,  -4.02,  10.74,   27.0]
            },
            {
              Name: 146,
              Data: [-64.65, -61.01, -57.18, -53.14, -48.92, -44.45, -39.76, -34.83, -29.66, -24.26, -18.64, -12.83,  -6.89,  -0.94,   5.00,  10.96,  17.70,  29.01,  73.84,  127.0]
            },
            {
              Name: 145,
              Data: [-60.66, -56.70, -52.52, -48.12, -43.44, -38.49, -33.23, -27.65, -21.71, -15.41,  -8.72,  -1.63,   5.85,  13.74,  22.07,  31.12,  42.17,  60.82, 127.66,  227.0]
            },
            {
              Name: 144,
              Data: [-56.91, -52.69, -48.20, -43.42, -38.33, -32.91, -27.10, -20.89, -14.22,  -7.04,   0.70,   9.03,  18.05,  27.83,  38.51,  50.58,  65.68,  90.57, 168.60,  227.0]
            },
            {
              Name: 143,
              Data: [-53.52, -49.02, -44.23, -39.10, -33.63, -27.75, -21.43, -14.61,  -7.24,   0.77,   9.51,  19.04,  29.54,  41.13,  54.11,  69.06,  87.83, 117.59, 196.18,  227.0]
            },
            {
              Name: 142,
              Data: [-50.46, -45.71, -40.64, -35.21, -29.37, -23.08, -16.28,  -8.91,  -0.87,   7.94,  17.61,  28.29,  40.17,  53.52,  68.65,  86.29, 108.28, 141.36, 212.54,  227.0]
            },
            {
              Name: 141,
              Data: [-47.77, -42.79, -37.46, -31.75, -25.57, -18.91, -11.68,  -3.80,   4.85,  14.37,  24.90,  36.64,  49.83,  64.77,  81.92, 102.01, 126.73, 161.63, 221.03,  227.0]
            },
            {
              Name: 140,
              Data: [-45.47, -40.30, -34.75, -28.76, -22.32, -15.32,  -7.69,   0.66,   9.84,  19.99,  31.31,  43.99,  58.36,  74.75,  93.71, 115.98, 142.94, 178.32, 224.84,  227.0]
            },
            {
              Name: 139,
              Data: [-43.57, -38.24, -32.50, -26.32, -19.60, -12.32,  -4.35,   4.38,  14.03,  24.74,  36.73,  50.26,  65.64,  83.33, 103.85, 127.95, 156.67, 191.58, 226.33,  227.0]
            },
            {
              Name: 138,
              Data: [-42.12, -36.65, -30.75, -24.38, -17.47,  -9.95,  -1.72,   7.34,  17.37,  28.55,  41.10,  55.32,  71.56,  90.29, 112.15, 137.78, 167.81, 201.63, 226.82,  227.0]
            },
            {
              Name: 137,
              Data: [-41.11, -35.54, -29.53, -23.02, -15.97,  -8.26,   0.19,   9.50,  19.83,  31.36,  44.36,  59.11,  76.01,  95.58, 118.44, 145.25, 176.23, 208.77, 226.96,  227.0]
            },
            {
              Name: 136,
              Data: [-40.58, -34.93, -28.85, -22.25, -15.09,  -7.25,   1.33,  10.82,  21.35,  33.13,  46.43,  61.53,  78.90,  99.05, 122.63, 150.25, 181.85, 213.32, 226.99,  227.0]
            },
            {
              Name: 135,
              Data: [-40.52, -34.84, -28.72, -22.08, -14.86,  -6.97,   1.69,  11.24,  21.88,  33.80,  47.24,  62.54,  80.15, 100.61, 124.59, 152.66, 184.59, 215.49, 227.00,  227.0]
            },
            {
              Name: 134,
              Data: [-40.95, -35.28, -29.16, -22.53, -15.31,  -7.44,   1.22,  10.79,  21.43,  33.34,  46.78,  62.10,  79.73, 100.22, 124.22, 152.38, 184.40, 215.39, 227.00,  227.0]
            },
            {
              Name: 133,
              Data: [-41.90, -36.26, -30.20, -23.60, -16.45,  -8.64,  -0.07,   9.42,  19.94,  31.73,  45.03,  60.18,  77.59,  97.83, 121.52, 149.34, 181.21, 212.97, 226.99,  227.0]
            },
            {
              Name: 132,
              Data: [-43.33, -37.78, -31.79, -25.33, -18.28, -10.59,  -2.18,   7.11,  17.43,  28.98,  41.97,  56.75,  73.72,  93.42, 116.47, 143.58, 174.96, 208.02, 226.94,  227.0]
            },
            {
              Name: 131,
              Data: [-45.28, -39.85, -34.00, -27.67, -20.82, -13.33,  -5.13,   3.90,  13.89,  25.07,  37.62,  51.86,  68.15,  87.01, 109.06, 135.05, 165.61, 200.18, 226.74,  227.0]
            },
            {
              Name: 130,
              Data: [-47.73, -42.46, -36.78, -30.67, -24.02, -16.80,  -8.90,  -0.22,   9.36,  20.04,  31.99,  45.51,  60.91,  78.67,  99.39, 123.83, 153.13, 188.99, 226.01,  227.0]
            },
            {
              Name: 129,
              Data: [-50.69, -45.60, -40.14, -34.27, -27.91, -21.01, -13.48,  -5.24,   3.82,  13.89,  25.12,  37.74,  52.07,  68.47,  87.53, 110.05, 137.52, 173.95, 223.79,  227.0]
            },
            {
              Name: 128,
              Data: [-54.14, -49.29, -44.09, -38.49, -32.46, -25.95, -18.85, -11.12,  -2.64,   6.71,  17.08,  28.66,  41.70,  56.53,  73.63,  93.81, 118.87, 154.61, 217.99,  227.0]
            },
            {
              Name: 127,
              Data: [-58.06, -53.47, -48.56, -43.30, -37.65, -31.57, -24.97, -17.82, -10.03,  -1.48,   7.92,  18.33,  29.93,  42.98,  57.87,  75.33,  97.31, 130.71, 205.09,  227.0]
            },
            {
              Name: 126,
              Data: [-62.46, -58.16, -53.57, -48.69, -43.45, -37.84, -31.80, -25.29, -18.26, -10.61,  -2.26,   6.86,  16.88,  28.00,  40.44,  54.86,  73.12, 102.23, 180.56,  227.0]
            },
            {
              Name: 125,
              Data: [-67.31, -63.32, -59.09, -54.61, -49.83, -44.73, -39.31, -33.49, -27.26, -20.56, -13.36,  -5.63,   2.73,  11.76,  21.62,  32.73,  46.65,  69.52, 140.48,  227.0]
            },
            {
              Name: 124,
              Data: [-72.57, -68.93, -65.08, -61.02, -56.74, -52.21, -47.41, -42.34, -36.97, -31.28, -25.28, -18.97, -12.37,  -5.50,   1.65,   9.29,  18.41,  33.33,  83.81,  127.0]
            },
            {
              Name: 123,
              Data: [-78.21, -74.94, -71.51, -67.90, -64.15, -60.20, -56.07, -51.76, -47.28, -42.65, -37.89, -33.06, -28.23, -23.55, -19.15, -15.09, -11.08,  -5.26,  14.08,   27.0]
            },
            {
              Name: 122,
              Data: [-84.24, -81.35, -78.33, -75.22, -71.98, -68.64, -65.21, -61.70, -58.13, -54.57, -51.05, -47.70, -44.66, -42.15, -40.46, -39.97, -41.09, -44.84, -60.96,  -73.0]
            },
            {
              Name: 121,
              Data: [-90.59, -88.10, -85.54, -82.91, -80.21, -77.50, -74.76, -72.06, -69.41, -66.90, -64.64, -62.74, -61.45, -61.05, -61.98, -64.89, -70.98, -83.89,-131.56, -173.0]
            },
            {
              Name: 120,
              Data: [-97.26, -95.16, -93.04, -90.91, -88.77, -86.68, -84.66, -82.74, -81.01, -79.55, -78.49, -78.03, -78.39, -79.99, -83.36, -89.43,-100.03,-120.88,-189.30, -273.0]
            },
            {
              Name: 119,
              Data: [-104.16,-102.49,-100.81, -99.18, -97.61, -96.14, -94.82, -93.68, -92.84, -92.39, -92.49, -93.36, -95.29, -98.73,-104.31,-113.15,-127.61,-154.51,-229.86, -273.0]
            },
            {
              Name: 118,
              Data: [-111.31,-110.03,-108.82,-107.67,-106.66,-105.80,-105.14,-104.77,-104.79,-105.31,-106.50,-108.61,-111.96,-117.03,-124.54,-135.71,-153.12,-183.81,-253.99, -273.0]
            },
            {
              Name: 117,
              Data: [-118.64,-117.77,-116.98,-116.33,-115.86,-115.58,-115.57,-115.93,-116.75,-118.17,-120.37,-123.60,-128.19,-134.68,-143.77,-156.76,-176.15,-208.25,-265.97, -273.0]
            },
            {
              Name: 116,
              Data: [-126.10,-125.62,-125.27,-125.11,-125.12,-125.41,-126.03,-127.07,-128.63,-130.87,-133.96,-138.18,-143.87,-151.49,-161.81,-176.03,-196.42,-227.77,-270.84, -273.0]
            },
            {
              Name: 115,
              Data: [-133.66,-133.57,-133.63,-133.90,-134.41,-135.24,-136.42,-138.08,-140.34,-143.30,-147.19,-152.24,-158.79,-167.30,-178.47,-193.35,-213.79,-242.63,-272.45, -273.0]
            },
            {
              Name: 114,
              Data: [-141.27,-141.54,-142.01,-142.70,-143.67,-144.97,-146.70,-148.92,-151.76,-155.37,-159.91,-165.63,-172.86,-182.00,-193.62,-208.62,-228.27,-253.44,-272.87, -273.0]
            },
            {
              Name: 113,
              Data: [-148.90,-149.51,-150.34,-151.43,-152.81,-154.58,-156.77,-159.48,-162.85,-166.98,-172.06,-178.29,-185.99,-195.46,-207.20,-221.84,-240.01,-260.92,-272.96, -273.0]
            },
            {
              Name: 112,
              Data: [-156.49,-157.42,-158.59,-160.04,-161.81,-163.96,-166.56,-169.71,-173.50,-178.05,-183.53,-190.13,-198.07,-207.64,-219.17,-233.04,-249.27,-265.86,-272.98, -273.0]
            },
            {
              Name: 111,
              Data: [-164.01,-165.24,-166.72,-168.49,-170.58,-173.08,-176.03,-179.52,-183.66,-188.53,-194.29,-201.08,-209.10,-218.53,-229.58,-242.33,-256.35,-268.95,-272.98, -273.0]
            }
          ],
          Date:["2019-11-24","2019-12-02","2019-12-10","2019-12-18","2019-12-26","2020-01-03","2020-01-11","2020-01-19","2020-01-27","2020-02-04","2020-02-12","2020-02-20","2020-02-28","2020-03-07","2020-03-15","2020-03-23","2020-03-31","2020-04-08","2020-04-16","2020-04-17"]
        }
      },
      response_cash: {test: "hi"},
      response_percent: {test: "hello"}
    };
  },

  created() {
    this.$root.$on('generate_heatmap', (input) => {
      this.order_list = {};
      this.generate_order_list(input);
      console.log(input);
      console.log(this.order_list);
      let tickers = Object.keys(this.order_list);
      let expirations = null;
      let request_expiration = "";
      for (let i = 0; i < tickers.length; i++){
        let request_base = {
          "ticker": tickers[i],
          "current_price": this.order_list[tickers[i]].current_price,
          "implied_volatility": this.order_list[tickers[i]].implied_volatility,
          // "implied_volatility": 0,
          "output_display": "",
          "price_range": this.order_list[tickers[i]].price_range
        };
        expirations = Object.keys(this.order_list[tickers[i]].expiration_orders);
        for (let j=0; j< expirations.length; j ++){
          request_expiration = request_base;
          request_expiration['expiration_date'] = expirations[j];
          request_expiration.order_list = [];
          let data_keys = Object.keys(this.order_list[tickers[i]].expiration_orders[expirations[j]].data);
          for (let k=0; k < data_keys.length; k++){
            // console.log(k.toString() + "\t" + data[k] + "\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].data[data_keys[k]]);
            request_expiration.order_list.push(this.order_list[tickers[i]].expiration_orders[expirations[j]].data[data_keys[k]]);
          }
          console.log("Date:\t" + expirations[j] + "\tTicker:\t" + tickers[i]);
          console.log(request_expiration);
        }
      }

      for (let i=0; i < tickers.length; i++){
        expirations = Object.keys(this.order_list[tickers[i]].expiration_orders);
        for (let j=0; j < expirations.length; j ++){
          this.heatmap_data_call(request_expiration, cash_const, tickers, expirations, i, j, 1);
        }
      }

      //add resize event
      // window.addEventListener("resize", this.update_heatmap);
    });
  },

  methods: {
    set_color_ranges(ticker, expiration){
      console.log(ticker);
      console.log(expiration);
      // console.log(this.order_list[ticker].expiration_orders[expiration].options.series);
      let series = this.order_list[ticker].expiration_orders[expiration].options.series;
      console.log(series);
      let minimum = series[0]['data'][0];
      let maximum = series[0]['data'][0];
      let positive_sum = 0;
      let negative_sum = 0;
      let positive_std = 0;
      let negative_std = 0;
      let positive_set = [];
      let negative_set = [];
      let sigma_denominator = 2;
      let white_zone_sigma_denominator = 5;

      for (let i=0; i < series.length; i++){
        for (let j=0; j < series[i]['data'].length; j++){
          if (series[i]['data'][j] <= minimum){
            minimum = series[i]['data'][j];
          }
          if (series[i]['data'][j] >= maximum){
            maximum = series[i]['data'][j];
          }
          if (series[i]['data'][j] > 0){
            positive_set.push(series[i]['data'][j]);
            positive_sum += series[i]['data'][j];
          } else if (series[i]['data'][j] < 0) {
            negative_set.push(series[i]['data'][j]);
            negative_sum += series[i]['data'][j];
          }
        }
      }

      let positive_avg = positive_sum/positive_set.length;
      let negative_avg = negative_sum/negative_set.length;
      console.log("positive set");
      console.log(positive_set);
      console.log("negative set");
      console.log(negative_set);
      console.log("positive_avg\t" + positive_avg.toString())
      console.log("negative_avg\t" + negative_avg.toString())
      console.log("minimum:\t" + minimum);
      console.log("minimum:\t" + minimum.toString());
      console.log("maximum:\t" + maximum);
      console.log("maximum:\t" + maximum.toString());

      for (let i=0; i < positive_set.length; i++){
        positive_std += (positive_set[i] - positive_avg) * (positive_set[i] - positive_avg);
      }
      positive_std = Math.sqrt(positive_std/(positive_set.length-1))/sigma_denominator;

      if (positive_std < 1){
        positive_std = 1;
      }

      for (let i=0; i < negative_set.length; i++){
        negative_std += (negative_set[i] - negative_avg) * (negative_set[i] - negative_avg);
      }
      negative_std = Math.sqrt(negative_std/(negative_set.length-1))/sigma_denominator;

      if (negative_std < 1){
        negative_std = 1;
      }

      console.log("positive list length:\t" + positive_set.length.toString());
      console.log("negative list length:\t" + negative_set.length.toString());
      console.log("positive_std:\t" + positive_std.toString());
      console.log("negative_std:\t" + negative_std.toString());

      let positive_step_range_change = 1;

      if (positive_std > 0){
        positive_step_range_change = maximum/positive_std
      }

      let negative_step_range_change = 1;

      if (negative_std > 0){
        negative_step_range_change = minimum/negative_std;
      }

      let positive_steps = Math.floor(positive_step_range_change) + 1;
      let negative_steps = Math.abs(Math.floor(negative_step_range_change)) + 1;

      let positive_step_start = 0;
      if (negative_std == 1){
        console.log("now what");
      }

      let negative_step_stop = 0;
      if (positive_std == 1){
        console.log("now what");
      }

      let positive_step_color_change = 255/positive_steps;
      let negative_step_color_change = 255/negative_steps;

      console.log("positive_step_range_change\t" + positive_step_range_change.toString())
      console.log("negative_step_range_change\t" + negative_step_range_change.toString())
      console.log("positive_steps:\t" + positive_steps.toString());
      console.log("negative_steps:\t" + negative_steps.toString());
      console.log("positive_step_color_change:\t" + positive_step_color_change.toString());
      console.log("negative_step_color_change:\t" + negative_step_color_change.toString());

      let base_color = 255;

      this.order_list[ticker].expiration_orders[expiration].options.plotOptions.heatmap.colorScale.ranges = [];

      console.log("negative color value calc");
      for (let i=negative_steps-1; i >= negative_step_stop; i--){
        let this_color_value = Math.floor(base_color - (i+1)*negative_step_color_change);
        console.log(Math.ceil(-1*(i+1)*negative_std).toString() + " - " + Math.ceil(-1*(i)*negative_std).toString() + "\tblue/green:\t" + this_color_value.toString() + "\t" + this_color_value.toString(16) + "\t" + (base_color - i*negative_step_color_change).toString());
        if (this_color_value==0){
          this_color_value = "00";
        } else {
          this_color_value = this_color_value.toString(16)
        }
        let from_value = -1*(i+1)*negative_std + .0000000001;
        let to_value = -1*(i)*negative_std;
        if (to_value==0){
          to_value = negative_std/white_zone_sigma_denominator -.0000000001;
          to_value_str = "-" + (negative_std/white_zone_sigma_denominator).toFixed(2);
        }
        let from_value_str = Math.floor(from_value).toString();
        let to_value_str = Math.ceil(to_value).toString();
        let name_str = "";
        if (Math.abs(Math.floor(to_value) - Math.ceil(from_value)) <= 1){
          name_str = to_value_str;
        } else {
          name_str = from_value_str + " - " + to_value_str;
        }
        if (from_value >= minimum - negative_std){
          this.order_list[ticker].expiration_orders[expiration].options.plotOptions.heatmap.colorScale.ranges.push(
            {
              from: from_value,
              to: to_value,
              name: name_str,
              color: '#' + base_color.toString(16) + this_color_value + this_color_value
            }
          );
        }
      }

      this.order_list[ticker].expiration_orders[expiration].options.plotOptions.heatmap.colorScale.ranges.push(
        {
          from: -negative_std/white_zone_sigma_denominator,
          to: positive_std/white_zone_sigma_denominator,
          name: "-" + (negative_std/white_zone_sigma_denominator).toFixed(2) + " - " + (positive_std/white_zone_sigma_denominator).toFixed(2),
          color: '#ffffff'
        }
      );

      console.log("positive color value calc");
      for (let i=positive_step_start; i < positive_steps; i++){
        let this_color_value = Math.floor(base_color - (i+1)*positive_step_color_change);
        console.log(Math.floor(i*positive_std).toString() + " - " + Math.floor((i+1)*positive_std).toString() + "\tblue/red:\t" + this_color_value.toString() + "\t" + this_color_value.toString(16) + "\t" + (base_color - i*positive_step_color_change).toString());
        if (this_color_value==0){
          this_color_value = "00";
        } else {
          this_color_value = this_color_value.toString(16)
        }
        let from_value = (i)*positive_std + .000000001;
        if (i==0){
          from_value = positive_std/white_zone_sigma_denominator + .000000001
        }
        // if (i==positive_step_start){
        //   from_value = from_value + 1;
        // }
        let to_value = (i+1)*positive_std;
        let from_value_str = Math.floor(from_value).toString();
        let to_value_str = Math.ceil(to_value).toString();
        let name_str = "";
        if (Math.abs(Math.floor(to_value) - Math.ceil(from_value)) <= 1){
          name_str = from_value_str;
        } else {
          name_str = from_value_str + " - " + to_value_str;
        }
        if (to_value <= maximum + positive_std){
          this.order_list[ticker].expiration_orders[expiration].options.plotOptions.heatmap.colorScale.ranges.push(
            {
              from: from_value,
              to: to_value,
              name: name_str,
              color: '#' + this_color_value + base_color.toString(16) + this_color_value
            }
          );
        }
      }
      console.log("Color Ranges");
      console.log(this.order_list[ticker].expiration_orders[expiration].options.plotOptions.heatmap.colorScale.ranges);
    },
    generate_order_list(data, response_type){
      console.log(this.order_list);
      for (let i =0; i < data.length; i++){
        console.log(data[i].ticker);
        //If Ticker is not present in current orderlist, add it.
        if (!(data[i].ticker in this.order_list)){
          this.order_list[data[i].ticker] = {
            current_price: parseFloat(data[i].current_price),
            implied_volatility: data[i].implied_volatility,
            output_display: response_type,
            price_range: "",
            expiration_orders: {}
          }
        }

        if (!(data[i].date in this.order_list[data[i].ticker].expiration_orders)){
          this.order_list[data[i].ticker].expiration_orders[data[i].date] = {};
        }

        let temp = [];
        if ( "data" in this.order_list[data[i].ticker].expiration_orders[data[i].date]){
          temp = this.order_list[data[i].ticker].expiration_orders[data[i].date].data;
        }

        let data_set = {
          asset_type: data[i].asset_type,
          transaction: data[i].transaction,
          order_amount: parseInt(data[i].order_amount),
          strike_price: parseFloat(data[i].strike_price),
          premium: data[i].premium,
        };
        temp.push(data_set);
        this.order_list[data[i].ticker].expiration_orders[data[i].date] = {
          data: temp,
          chart: null,
          options: {
            chart: {
              height: 900,
              width: '100%',
              stacked: true,
              type: 'heatmap',
              foreColor: '#000000'
            },
            dataLabels: {
              enabled: true,
              style: {
                  fontSize: '12px',
                  fontFamily: 'sans-serif',
                  colors: ['000000']
              }
            },
            series: [],         //this is default to the system and used for cash_const
            other_series: [],   //this is not used by apex charts but will store percent_const data
            original_cash_data: [],
            original_percent_data: [],
            cash_max: 0,
            cash_min: 0,
            percent_max: 0,
            percent_min: 0,
            cash_longest: 0,
            percent_longest: 0,
            data_suffix: "",
            data_prefix: "",
            alt_data_suffix: "",
            alt_data_prefix: "",
            title: {
              text: data[i].ticker + " - " + data[i].date
            },
            grid: {
              padding: {
                right: 1
              }
            },
            legend: {
              show: true
            },
            xaxis: {
              type: 'category',
              categories: []
            },
            plotOptions: {
              heatmap: {
                // reverseNegativeShade: false,
                enableShades: false,
                // shadeIntensity: 0.5,
                colorScale: {
                  ranges: [
                    {
                      from: -1000000000,
                      to: 0,
                      name: 'Profit',
                      color: '#ff0000'
                    },
                    {
                      from: 0,
                      to: 1,
                      name: 'Even',
                      color: '#ffffff'
                    },
                    {
                      from: 1,
                      to: 1000000000,
                      name: 'Loss',
                      color: '#00ff00'
                    }
                  ]
                }
              }
            },
            tooltip: {
              enabled: true,
              theme: "light",
              x: {
                show: true,
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                  return value;
                }
              },
              y: {
                show: true,
                formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
                  // console.log(w);
                  let data_negative_prefix = w.config.series[seriesIndex].data[dataPointIndex] < 0 ? "-" : "";
                  let alt_data_negative_prefix = w.config.other_series[seriesIndex].data[dataPointIndex] < 0 ? "-" : "";
                  return data_negative_prefix + w.config.data_prefix + Math.abs(w.config.series[seriesIndex].data[dataPointIndex]).toString() + w.config.data_suffix + " (" + alt_data_negative_prefix + w.config.alt_data_prefix + Math.abs(w.config.other_series[seriesIndex].data[dataPointIndex]).toString() + w.config.alt_data_suffix + ")";
                }
              }
            }
          }
        }
      }
    },
    clean_data(input){
      let result = [];
      for (let i =0; i < input.length; i ++){
        let temp = [];
        for (let j=0; j < input[i]['Data'].length; j++){
          temp.push(parseFloat(input[i]['Data'][j].toFixed(2)));
        }
        result.push({
          data: temp,
          name: input[i]['Name']
        });
      }
      return result;
    },
    reduce_by_strike_price(input, max_strike_prices){
      let result = [];
      let target_data_length = max_strike_prices;
      let first_zero = input.length;
      let index_middle = input.length/2;
      let last_zero = 0;
      let zeros_set = false;
      let smallest_abs_index = 0;
      let smallest_abs_value = input[0]['Data'][0];
      let from_index = 0;
      let to_index = 0;

      for (let i=0; i<input.length; i++){
        for (let j=0; j<input[i]['Data'].length; j++){
          if (input[i]['Data'][j] == 0){
            zeros_set = true;
            if (i < first_zero){
              first_zero =i;
            }
            if (i > last_zero){
              last_zero = i;
            }
          }
          if (Math.abs(input[i]['Data'][j]) <  smallest_abs_value){
            smallest_abs_value = Math.abs(input[i]['Data'][j]);
            smallest_abs_index = i;
          }
        }
      }

      let large_side_rollover = 0;
      if (zeros_set){
        console.log("zero middle:\t" + ((last_zero - first_zero)/2).toString() + "\t" + last_zero.toString() + "\t" + first_zero.toString());
        let zero_middle = ((last_zero - first_zero)/2);
        if ( zero_middle > index_middle ){
          console.log("zero_middle > index_middle");
          // Get to (end) index for cases where the split is in the later half of the data set
          if ( zero_middle + target_data_length/2 < input.length ){
            console.log("zero_middle + target_data_length/2 < input.length");
            to_index = zero_middle + target_data_length/2;
          } else {
            console.log("zero_middle + target_data_length/2 < input.length else");
            large_side_rollover = zero_middle + target_data_length/2 - input.length;
            to_index = input.length;
          }
          if (zero_middle - target_data_length/2 - large_side_rollover >= 0){
            console.log("zero_middle - target_data_length/2 - large_side_rollover >= 0");
            from_index = zero_middle - target_data_length/2 - large_side_rollover;
          } else{
            console.log("zero_middle - target_data_length/2 - large_side_rollover >= 0 else");
            from_index = 0;
          }
        } else {
          console.log("zero_middle > index_middle else");
          // Get from (start) index for cases where the split is in the later half of the data set
          if ( zero_middle - target_data_length/2 >= 0 ){
            console.log("zero_middle - target_data_length/2 >= 0");
            from_index = zero_middle - target_data_length/2;
          } else {
            console.log("zero_middle - target_data_length/2 >= 0 else");
            large_side_rollover = target_data_length/2 - zero_middle;
            from_index = 0;
          }
          if (zero_middle + target_data_length/2 + large_side_rollover < input.length){
            console.log("zero_middle + target_data_length/2 + large_side_rollover < input.length");
            to_index = zero_middle + target_data_length/2 + large_side_rollover;
          }else{
            console.log("zero_middle + target_data_length/2 + large_side_rollover < input.length else");
            to_index = input.length;
          }
        }
      } else {
        console.log("smallest abs:\t" + smallest_abs_index.toString());
        if (smallest_abs_index > index_middle){
          console.log("smallest_abs_index > index_middle");
          if ( smallest_abs_index + target_data_length/2 < input.length ){
            console.log("smallest_abs_index + target_data_length/2 < input.length");
            to_index = smallest_abs_index + target_data_length/2;
          } else {
            console.log("smallest_abs_index + target_data_length/2 < input.length else");
            large_side_rollover = smallest_abs_index + target_data_length/2 - input.length;
            to_index = input.length;
          }
          if (smallest_abs_index - target_data_length/2 - large_side_rollover >= 0){
            console.log("smallest_abs_index - target_data_length/2 - large_side_rollover >= 0");
            from_index = smallest_abs_index - target_data_length/2 - large_side_rollover;
          } else{
            console.log("smallest_abs_index - target_data_length/2 - large_side_rollover >= 0 else");
            from_index = 0;
          }
        } else {
          if ( smallest_abs_index - target_data_length/2 >= 0 ){
            console.log("smallest_abs_index - target_data_length/2 >= 0");
            from_index = smallest_abs_index - target_data_length/2;
          } else {
            console.log("smallest_abs_index - target_data_length/2 >= 0 else");
            large_side_rollover = target_data_length/2 - smallest_abs_index;
            from_index = 0;
          }
          if (smallest_abs_index + target_data_length/2 + large_side_rollover < input.length){
            console.log("smallest_abs_index + target_data_length/2 + large_side_rollover < input.length");
            to_index = smallest_abs_index + target_data_length/2 + large_side_rollover;
          }else{
            console.log("smallest_abs_index + target_data_length/2 + large_side_rollover < input.length else");
            to_index = input.length;
          }
        }
      }
      console.log("large_side_rollover:\t" + large_side_rollover.toString());
      console.log("slicing index\t" + from_index.toString() + "\t" + to_index.toString());
      console.log(input.slice(from_index, to_index));

      for (let i = Math.floor(from_index); i < Math.ceil(to_index); i ++){
        if (true){
          result.push(input[i]);
        }
      }

      // return input.slice(Math.floor(from_index), Math.ceil(to_index));
      return result;
    },
    reduce_by_date(strike_prices, dates, max_dates){
      if (dates.length <= max_dates){
        return [strike_prices, dates];
      }

      let reduction = Math.ceil((dates.length - max_dates)/2);
      let corrected_strike_prices = [];

      for(let i=0; i < strike_prices; i++){
        corrected_strike_prices.push({
          "Name": strike_prices[i].Name,
          "Data": strike_prices[i].Data.slice(reduction, strike_prices[i].Data.length - reduction)
        });
      }
      return [corrected_strike_prices, dates.slice(reduction, dates.length - reduction)]
    },
    build_heatmap(tickers, i, expirations, j){
      let chart_destination = document.querySelector("#heatmapchart");
      // let chart_destination_parent = chart_destination.parentElement;
      // let new_chart_destination = document.createElement('div');
      // new_chart_destination.id = "heatmapchart";
      // chart_destination_parent.removeChild(chart_destination);
      // chart_destination_parent.appendChild(new_chart_destination);

      for (let i=0; i< chart_destination.children.length; i++){
        let current_child = chart_destination.children[i];
        if (current_child.classList.contains("apexcharts-canvas")){
          chart_destination.removeChild(current_child);
        }
      }

      console.log("build_heatmap " + tickers[i] + " " + expirations[j]);
      console.log(this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data);

      // Set best sizes
      this.set_heatmap_ideal_sizes(tickers, i, expirations, j);

      // Clean data for rendering
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.series = this.clean_data(this.order_list[tickers[i]].expiration_orders[expirations[j]].options.series);
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.other_series = this.clean_data(this.order_list[tickers[i]].expiration_orders[expirations[j]].options.other_series);
      // this.order_list[tickers[i]].expiration_orders[expirations[j]].options.xaxis.categories = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data['Date'];

      //set tooltip secondary data indicator
      console.log("setting data indicator")
      console.log(this.order_list[tickers[i]]);
      if (this.order_list[tickers[i]].output_display == cash_const){
        console.log("setting data indicator - cash");
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.alt_data_prefix = "$";
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.alt_data_suffix = "";
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.data_prefix = "";
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.data_suffix = "%";
      }
      if (this.order_list[tickers[i]].output_display == percent_const){
        console.log("setting data indicator - percent");
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.data_prefix = "$";
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.data_suffix = "";
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.alt_data_prefix = "";
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options.alt_data_suffix = "%";
      }

      //reverse data
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.series.reverse();
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.other_series.reverse();

      // Set colors/ranges
      this.set_color_ranges(tickers[i], expirations[j]);
      console.log(this.order_list[tickers[i]].expiration_orders[expirations[j]].options.plotOptions.heatmap.colorScale);
      console.log(this.order_list[tickers[i]].expiration_orders[expirations[j]].options)

      let chart = new ApexCharts(
        document.querySelector("#heatmapchart"),
        this.order_list[tickers[i]].expiration_orders[expirations[j]].options
      );
      this.order_list[tickers[i]].expiration_orders[expirations[j]].chart = chart;
      this.order_list[tickers[i]].expiration_orders[expirations[j]].chart.render();
    },
    heatmap_data_call(request_expiration, output_display, tickers, expirations, i, j, level){
      // let result = {};
      console.log("level:\t" + level.toString());
      if (level >= 0){
        request_expiration.output_display = output_display;
        this.order_list[tickers[i]].output_display = output_display;
        console.log("output_display:\t" + output_display);
        axios({
          method: "post",
          url: "http://optionstrats.com/option_pnl_calculator",
          headers: {
            common: {
              "Accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          },
          data: request_expiration,
          crossDomain: true
        })
        .then((response) => {
          // Set data
          console.log("request " + output_display + " " + tickers[i] + " " + expirations[j]);
          console.log(request_expiration);
          console.log("response " + output_display + " " + tickers[i] + " " + expirations[j]);
          console.log(response);
          if (output_display === cash_const){
            this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data = response.data;
            let series = response.data.AllData;
            console.log("cash series min-max find");
            console.log(series);
            for (let m=0; m < series.length; m++){
              for (let n=0; n < series[m]['Data'].length; n++){
                if (series[m]['Data'][n] <= this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_min){
                  this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_min = series[m]['Data'][n];
                }
                if (series[m]['Data'][n] >= this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_max){
                  this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_max = series[m]['Data'][n];
                }
                if (series[m]['Data'][n].toString().length > this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_longest){
                  this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_longest = series[m]['Data'][n].toString().length;
                  if (series[m]['Data'][n].toString().length > 8){
                    console.log("Too Long Data\t" + m.toString() + " "+ n.toString() + "\t" + series[m]['Data'][n].toString());
                  }
                }
              }
            }
            console.log("cash max:\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_max.toString());
            console.log("cash min:\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_min.toString());
            console.log("cash longest:\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_longest.toString());
            this.heatmap_data_call(request_expiration, percent_const, tickers, expirations, i, j, level -1);
          }
          if (output_display === percent_const){
            this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_percent_data = response.data;
            let series = response.data.AllData;
            console.log("percent series min-max find");
            console.log(series);
            for (let m=0; m < series.length; m++){
              for (let n=0; n < series[m]['Data'].length; n++){
                if (series[m]['Data'][n] <= this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_min){
                  this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_min = series[m]['Data'][n];
                }
                if (series[m]['Data'][n] >= this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_max){
                  this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_max = series[m]['Data'][n];
                }
                if (series[m]['Data'][n].toString().length > this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_longest){
                  this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_longest = series[m]['Data'][n].toString().length;
                }
              }
            }
            console.log("percent max:\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_max.toString());
            console.log("percent min:\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_min.toString());
            console.log("percent longest:\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_longest.toString());
            this.heatmap_data_call(request_expiration, cash_const, tickers, expirations, i, j, level -1);
          }
          if (level == 0){
            console.log("level0\t" +  tickers[i] + " " + expirations[j])
            this.build_heatmap(tickers, i, expirations, j);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    update_heatmap(){
      let tickers = Object.keys(this.order_list);
      let expirations = null;
      // let request_expiration = "";
      console.log("ticker count:\t" + tickers.length.toString());
      console.log("expiration count:\t" + tickers.length.toString());
      for (let i = 0; i < tickers.length; i++){
        expirations = Object.keys(this.order_list[tickers[i]].expiration_orders);
        console.log(tickers[i] + "expiration count:\t" + expirations.length.toString());
        for (let j=0; j< expirations.length; j++){
          this.build_heatmap(tickers, i, expirations, j);
          break;
        }
        break;
      }
      // this.build_heatmap(tickers, 0, expirations, 0);
    },
    set_heatmap_ideal_sizes(tickers, i, expirations, j){
      let window_height = window.innerHeight;
      let window_width = window.innerWidth;

      let heatmap_chart = document.getElementById("heatmapchart");
      let heatmap_rect = heatmap_chart.getBoundingClientRect();

      console.log("heatmap rect");
      console.log(heatmap_rect);

      let date_count = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data.Date.length;
      let strike_price_count = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data.AllData.length;

      let max_strike_prices_window_can_support = Math.floor(window_height/strike_price_count);
      let max_strike_prices_div_can_support = Math.floor(heatmap_rect.height/strike_price_count);
      let max_dates_window_can_support = Math.floor(window_width/date_count);
      let max_datas_div_can_support = Math.floor(heatmap_rect.width/date_count);

      let longest_cash_value = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_max.toString().length > this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_min.toString().length ? this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_max.toString().length : this.order_list[tickers[i]].expiration_orders[expirations[j]].options.cash_min.toString().length;
      let longest_percent_value = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_max.toString().length > this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_min.toString().length ? this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_max.toString().length : this.order_list[tickers[i]].expiration_orders[expirations[j]].options.percent_min.toString().length;
      let max_characters_in_a_cell = longest_cash_value > longest_percent_value ? longest_cash_value + 1 : longest_percent_value + 1;

      console.log("longest_cash_value:\t" + longest_cash_value.toString());
      console.log("longest_percent_value:\t" + longest_percent_value.toString());

      let maximum_cell_width = max_dates_window_can_support - 1;  // one less for safety
      let maximum_character_pixel = Math.floor(maximum_cell_width/max_characters_in_a_cell) <= largest_font_size_allowed ? Math.floor(maximum_cell_width/max_characters_in_a_cell) : Math.floor(maximum_cell_width/max_characters_in_a_cell) >= smallest_font_size_allowed ? Math.floor(maximum_cell_width/max_characters_in_a_cell) : smallest_font_size_allowed;

      let max_character_widths_height = maximum_character_pixel/.8;

      if (max_character_widths_height > max_strike_prices_div_can_support*.8){
        maximum_character_pixel = max_strike_prices_div_can_support*.8;
      }

      console.log("max font size:\t" + maximum_character_pixel.toString() + " px");

      let target_strike_price_count = strike_price_count;
      let target_date_count = date_count;
      let should_reduce_data = false;

      // if (max_strike_prices_window_can_support < strike_price_count){
      //   target_strike_price_count = max_strike_prices_window_can_support;
      //   should_reduce_data = true;
      // }

      // if (max_dates_window_can_support < date_count){
      //   target_date_count = max_dates_window_can_support;
      //   should_reduce_data = true;
      // }

      let reduced_cash_by_strike_price = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data.AllData;
      let reduced_percent_by_strike_price = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_percent_data.AllData;
      // let reduced_cash_data_by_date = this.reduce_by_date(reduced_cash_by_strike_price, this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data.Date);
      // let reduced_percent_data_by_date = this.reduce_by_date(reduced_percent_by_strike_price, this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_percent_data.Date);
      let reduced_cash_data_by_date = this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data.Date;
      let reduced_percent_data_by_date =  this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_percent_data.Date;

      if (should_reduce_data){
        reduced_cash_by_strike_price = this.reduce_by_strike_price(this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data.AllData, target_strike_price_count);
        reduced_percent_by_strike_price = this.reduce_by_strike_price(this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_percent_data.AllData, target_strike_price_count);
        let temp_cash_data = this.reduce_by_date(reduced_cash_by_strike_price, this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_cash_data.Date, target_date_count);
        let temp_percent_data = this.reduce_by_date(reduced_percent_by_strike_price, this.order_list[tickers[i]].expiration_orders[expirations[j]].options.original_percent_data.Date, target_date_count);
        reduced_cash_by_strike_price = temp_cash_data[0];
        reduced_percent_by_strike_price = temp_percent_data[0];
        reduced_cash_data_by_date = temp_cash_data[1];
        reduced_percent_data_by_date = temp_percent_data[1];
      }

      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.series = reduced_cash_by_strike_price;
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.other_series = reduced_percent_by_strike_price;
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.xaxis.categories = reduced_cash_data_by_date;

      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.chart.height = .9*window_height;
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.chart.width = .9*window_width;
      this.order_list[tickers[i]].expiration_orders[expirations[j]].options.dataLabels.style.fontSize = maximum_character_pixel.toString() + 'px';

      console.log("innerHeight:\t" + window.innerHeight.toString());
      console.log("innerWidth:\t" + window.innerWidth.toString());
      console.log("Heatmap Height:\t" + heatmap_rect.height.toString());
      console.log("Heatmap Width:\t" + heatmap_rect.width.toString());
      console.log("Font Size:\t" + this.order_list[tickers[i]].expiration_orders[expirations[j]].options.dataLabels.style.fontSize);
    }
  }
};
</script>

<style scoped>
.apexcharts-legend{
  display: none !important;
}
</style>
