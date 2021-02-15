<template>
  <div>
    <div class="d-flex flew-row overflow-auto mb-3">
      <div class="p-2 width-sm flex-fill border-right">
        <p class="mb-0 fs-sm fw-700">Dividen Amount</p>
        <p class="mb-0 fs-nano fw-100">(MOST RECENT)</p>
        <p class="mb-0 fs-sm fw-500">$ {{ data.dividend_amount }}</p>
      </div>
      <div class="p-2 width-sm flex-fill border-right">
        <p class="mb-0 fs-sm fw-700">Announcement Date</p>
        <p class="mb-0 fs-sm fw-500">{{ data.announcement_date }}</p>
      </div>
      <div class="p-2 width-sm flex-fill border-right">
        <p class="mb-0 fs-sm fw-700">Ex-Div Date</p>
        <p class="mb-0 fs-sm fw-500">{{ data.ex_div_date }}</p>
      </div>
      <div class="p-2 width-sm flex-fill border-right">
        <p class="mb-0 fs-sm fw-700">Record Date</p>
        <p class="mb-0 fs-sm fw-500">20/10/2019</p>
      </div>
      <div class="p-2 width-sm flex-fill border-right">
        <p class="mb-0 fs-sm fw-700">Pay Date</p>
        <p class="mb-0 fs-sm fw-500">20/10/2019</p>
      </div>
      <div class="p-2 width-sm flex-fill">
        <p class="mb-0 fs-sm fw-700">Dividen Frequency</p>
        <p class="mb-0 fs-sm fw-500">Quarterly</p>
      </div>
    </div>

    <div class="d-flex flew-row overflow-auto border-top">
      <div class="p-2 width-lg flex-fill border-right">
        <p class="mb-0 fs-md fw-700">Strenght</p>
        <p class="mb-0 fs-sm fw-100">Dividen Yield</p>

        <bar-chart
          :chart_data="chart_data"
          :options="options"
          style="width: 250px; height: 150px;"
        />
      </div>
      <div class="p-2 width-sm flex-fill border-right">
        <p class="mb-0 fs-md fw-700">Sustainability</p>
        <p class="mb-0 fs-sm fw-100">Dividen Payout Ratio</p>

        <div class="row no-gutters p-2">
          <div class="position-relative mr-3">
            <div class="row no-gutters positon-absolute pos-top">
              <peity
                :type="'donut'"
                :options="{ 'fill': [secondary_color.hex], width: dividend_donut_size, height:dividend_donut_size,  'innerRadius': 40, 'radius': 60 }"
                :data="data.previous_trailling + '/100'"
              ></peity>
            </div>

            <div
              class="row no-gutters position-absolute pos-top"
              :style="'width: ' + dividend_donut_size +'px; height: ' + dividend_donut_size +'px'"
            >
              <p
                class="fs-xl mx-auto text-center"
                style="margin: auto !important;"
              >{{ data.previous_trailling + ' %' }}</p>
            </div>

            <p class="mb-0 mt-2 mx-auto text-center fs-md fw-700">Previous Trailling</p>
            <p class="mb-0 mx-auto text-center fs-sm fw-100">(12 MONTHS)</p>
          </div>

          <div class="position-relative mr-3">
            <div class="row no-gutters positon-absolute pos-top">
              <peity
                :type="'donut'"
                :options="{ 'fill': [primary_color.hex], width: dividend_donut_size, height:dividend_donut_size,  'innerRadius': 40, 'radius': 60 }"
                data="3/4"
              ></peity>
            </div>

            <div
              class="row no-gutters position-absolute pos-top"
              :style="'width: ' + dividend_donut_size +'px; height: ' + dividend_donut_size +'px'"
            >
              <p
                class="fs-xl mx-auto text-center"
                style="margin: auto !important;"
              >{{ data.current_trailling + ' %' }}</p>
            </div>

            <p class="mb-0 mt-2 mx-auto text-center fs-md fw-700">Current Trailling</p>
            <p class="mb-0 mx-auto text-center fs-sm fw-100">(12 MONTHS)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../components/widgets/HorizontalBarChart.vue";
import PieChart from "../components/widgets/PieChart.vue";
import Peity from "vue-peity";
import axios from "axios";

export default {
  components: {
    BarChart,
    PieChart,
    Peity
  },
  data() {
    let primary_color = {
        rgba: "rgba(33, 150, 243, 1)",
        hex: "#2196f3"
      },
      secondary_color = {
        rgba: "rgba(134, 142, 150, 1)",
        hex: "#868e96"
      },
      dividend_yield_ticker = null,
      dividend_yield_median = null,
      previous_trailling = 0.94,
      current_trailling = 0.67;

    return {
      primary_color: primary_color,
      secondary_color: secondary_color,
      dividend_donut_size: 120,

      data: {
        dividend_amount: null,
        announcement_date: null,
        ex_div_date: null,
        record_date: null,
        pay_date: null,
        dividen_frequency: null,
        dividend_yield_ticker: dividend_yield_ticker,
        dividend_yield_median: dividend_yield_median,
        previous_trailling: previous_trailling,
        current_trailling: current_trailling
      },

      chart_data: {
        labels: ["IBM", "Market Median"],
        datasets: [
          {
            label: "Dividen Yield",
            data: [4.61, 2.74],
            backgroundColor: [primary_color.rgba, secondary_color.rgba],
            borderColor: [primary_color.rgba, secondary_color.rgba],
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: tooltipItem =>
              `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
            title: () => null
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                  return value + " %";
                },
                display: false
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                  return value + " %";
                }
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    };
  },
  watch: {
    $route(to, from) {
      this.ticker = this.$route.params.ticker.toUpperCase();
      this.get_dividend_amount();
      this.get_dividend_ex_date();
      this.get_dividend_date();
      this.get_current_trailling();
      this.get_previous_trailling();
      this.get_dividend_yield_ticker();
      this.$set(
        this.chart_data.labels,
        0,
        this.$route.params.ticker.toUpperCase()
      );
    }
  },
  mounted() {
    this.get_dividend_amount();
    this.get_dividend_ex_date();
    this.get_dividend_date();
    this.get_current_trailling();
    this.get_previous_trailling();
    this.get_dividend_yield_ticker();
    this.$set(
      this.chart_data.labels,
      0,
      this.$route.params.ticker.toUpperCase()
    );
  },
  methods: {
    get_dividend_amount() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/forward_annual_dividend_rate",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("dividend amount");
          this.data.dividend_amount = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_dividend_ex_date() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/ex_dividend_date",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("dividend ex date");
          this.data.ex_div_date = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_dividend_date() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/dividend_date",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("dividend date");
          this.data.announcement_date = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_current_trailling() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/forward_annual_dividend_yield",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("current trailling");
          let current_trailling = response.data;
          current_trailling = current_trailling.split()[0];

          this.data.current_trailling = parseFloat(current_trailling).toFixed(
            2
          );
          console.log(response.data);
          console.log(this.data.current_trailling);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_previous_trailling() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/trailing_annual_dividend_yield",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("previous trailling");
          let previous_trailling = response.data;
          previous_trailling = previous_trailling.split()[0];

          this.data.previous_trailling = parseFloat(previous_trailling).toFixed(
            2
          );
          console.log(response.data);
          console.log(this.data.previous_trailling);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_dividend_yield_ticker() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/forward_annual_dividend_rate",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("dividend_yield_ticker");
          let dividend_yield_ticker = response.data;
          dividend_yield_ticker = dividend_yield_ticker.split()[0];

          this.chart_data.datasets[0].data[0] = parseFloat(
            dividend_yield_ticker
          ).toFixed(2);
          console.log(response.data);
          console.log(this.data.dividend_yield_ticker);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>