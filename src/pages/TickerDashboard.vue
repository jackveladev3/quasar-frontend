<template>
  <div>
    <ol class="breadcrumb page-breadcrumb">
      <li class="breadcrumb-item">OptionStrats</li>
      <li class="breadcrumb-item active">Dashboard</li>
      <li class="breadcrumb-item active">{{ ticker }}</li>
      <li class="position-absolute pos-top pos-right d-none d-sm-block">
        <span class="js-get-date"></span>
      </li>
    </ol>

    <div class="subheader">
      <h1 class="subheader-title">
        <i class="subheader-icon fal fa-chart-pie"></i> Dashboard
        <span class="fw-300">{{ ticker }}</span>
      </h1>
    </div>

    <div class="row d-flex flew-row overflow-auto mb-2" id="fast-info-web">
      <div class="p-2 col-lg-3 col-md-4 col-sm-12 mr-3">
        <div class="form-group">
          <div class="input-group input-group-lg">
            <Select2
              class="input-group-prepend select-2-group"
              :options="tickers"
              v-model="ticker"
              @change="change_ticker($event)"
              :settings="{placeholder: 'Please select a ticker...'}"
            />
            <div class="input-group-append">
              <span class="input-group-text bg-dark text-white fw-700">$ {{ last_price }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-2 flex-fill d-table mr-3">
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Change ({{ change.period }})&emsp;</span>
          <span
            :class="['fw-500 d-table-cell', change.net > 0 ? 'text-success' : 'text-danger']"
          >$ {{ change.net }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Change(%)&emsp;</span>
          <span
            :class="['fw-500 d-table-cell', change.net > 0 ? 'text-success' : 'text-danger']"
          >{{ change.percent }}%</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Close&emsp;</span>
          <span
            :class="['fw-500 d-table-cell', change.net > 0 ? 'text-success' : 'text-danger']"
          >$ {{ change.previous_close }}</span>
        </p>
      </div>

      <div class="p-2 flex-fill d-table mr-3">
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Open&emsp;</span>
          <span
            :class="['fw-500 d-table-cell', change.net > 0 ? 'text-success' : 'text-danger']"
          >$ {{ change.open }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">High&emsp;</span>
          <span
            :class="['fw-500 d-table-cell', change.net > 0 ? 'text-success' : 'text-danger']"
          >$ {{ change.high }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Low&emsp;</span>
          <span
            :class="['fw-500 d-table-cell', change.net > 0 ? 'text-success' : 'text-danger']"
          >$ {{ change.low }}</span>
        </p>
      </div>

      <div class="p-2 flex-fill d-table mr-3">
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Vol&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">{{ change.volume }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">P/E&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">{{ change.trailing_pe }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Mkt Cap&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">$ {{ change.mkt_cap_intraday }}</span>
        </p>
      </div>

      <div class="p-2 flex-fill d-table mr-3">
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">52W High&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">$ {{ change_52_week.high }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">52W Low&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">$ {{ change_52_week.low }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">90D Avg Vol&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">{{ avg_vol_90_day }}</span>
        </p>
      </div>

      <div class="p-2 flex-fill d-table mr-3">
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Yield&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">{{ trailing_annual_dividend_yield }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">Beta&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">{{ beta_3y_monthly }}</span>
        </p>
        <p class="fs-xs mb-0 d-table-row">
          <span class="fw-300 color-primary-200 d-table-cell">EPS&emsp;</span>
          <span class="text-primary fw-500 d-table-cell">{{ diluted_eps_ttm }}</span>
        </p>
      </div>
    </div>

    <div class="row d-flex d-flex-row">
      <panel
        outer_class="col-md-6 col-lg-6"
        :show_header="false"
        title="Charts"
        subtitle="amcharts"
      >
        <div class="panel-content">
          <VueTradingView
            :options="{ symbol: ticker, theme: 'light', autosize: true, allow_symbol_change: true }"
          />
        </div>
      </panel>

      <panel
        outer_class="col-md-6 col-lg-6"
        :show_header="false"
        title="Charts"
        subtitle="amcharts"
      >
        <div class="panel-content">
          <div class="row mb-3 pb-1 border-faded border-top-0 border-right-0 border-left-0">
            <span class="fs-xl fw-700 ml-2">Dividens</span>
          </div>

          <dividen />
        </div>
      </panel>

      <panel
        outer_class="col-md-3 col-lg-2"
        :show_header="false"
        title="Charts"
        subtitle="amcharts"
      >
        <div class="panel-content">
          <div class="row mb-3 pb-1 border-faded border-top-0 border-right-0 border-left-0">
            <span class="fs-xl fw-700 ml-2">News</span>
          </div>

          <template v-for="data in latest_news">
            <news-card :data="data" />
          </template>
        </div>
      </panel>

      <panel
        outer_class="col-md-6 col-lg-4"
        :show_header="false"
        title="Charts"
        subtitle="amcharts"
      >
        <div class="panel-content"></div>
      </panel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Panel from "../components/widgets/Panel.vue";
import NewsCard from "../components/widgets/NewsCard.vue";
import Select2 from "v-select2-component";
import Dividen from "../components/Dividen.vue";

import VueTradingView from "vue-trading-view";

export default {
  name: "TickerDashboard",
  components: {
    Panel,
    Select2,
    VueTradingView,
    NewsCard,
    Dividen
  },
  data() {
    return {
      ticker: this.$route.params.ticker.toUpperCase(),
      tickers: ["IBM", "AAPL"],
      last_price: 0,
      avg_vol_90_day: 0,
      latest_news: {},
      trailing_annual_dividend_yield: 0,
      beta_3y_monthly: 0,
      diluted_eps_ttm: 0,
      change: {
        net: 0,
        percent: 0,
        high: 0,
        low: 0,
        range: 0,
        period: "24hr",
        previous_close: 0,
        open: 0,
        volume: 0,
        trailing_pe: 0,
        mkt_cap_intraday: 0
      },
      change_52_week: {
        net: 0,
        percent: 0,
        high: 0,
        low: 0,
        range: 0
      }
    };
  },
  watch: {
    $route(to, from) {
      this.ticker = this.$route.params.ticker.toUpperCase();
    }
  },
  mounted() {
    this.get_ticker_last_data();
    this.update_52_week_data();
    this.get_avg_vol_90_day();
    this.get_latest_news();
    this.get_all_available_tickers();
    this.get_market_capital_intraday();
    this.get_trailing_pe();
    this.get_trailing_yearly_yield();
    this.get_beta_3y_monthly();
    this.get_diluted_eps_ttm();
  },
  methods: {
    get_diluted_eps_ttm() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/diluted_eps_ttm",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("diluted_eps_ttm " + response.data);
          this.diluted_eps_ttm = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_beta_3y_monthly() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/beta_3y_monthly",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("beta_3y_monthly " + response.data);
          this.beta_3y_monthly = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_trailing_yearly_yield() {
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
          console.log("trailing_annual_dividend_yield " + response.data);
          this.trailing_annual_dividend_yield = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_trailing_pe() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/trailing_p_e",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("trailing_p_e " + response.data);
          this.change.trailing_pe = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_market_capital_intraday() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/market_cap_intraday",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("mkt capital intraday " + response.data);
          this.change.mkt_cap_intraday = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_all_available_tickers() {
      axios({
        method: "get",
        url: "http://optionstrats.com/get_available_tickers",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          // console.log(response.data);
          this.tickers = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_ticker_last_data() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/get_current_price/" +
          this.$route.params.ticker.toUpperCase(),
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log(response.data);
          this.last_price = parseFloat(response.data["price"]).toFixed(3);
          this.change.net = parseFloat(response.data["change"]).toFixed(3);
          this.change.percent = parseFloat(
            response.data["change_percent"]
          ).toFixed(3);
          this.change.high = parseFloat(response.data["high"]).toFixed(3);
          this.change.low = parseFloat(response.data["low"]).toFixed(3);
          this.change.previous_close = parseFloat(
            response.data["previous_close"]
          ).toFixed(3);
          this.change.open = parseFloat(response.data["open"]).toFixed(3);
          this.change.volume = parseFloat(response.data["volume"]);
          this.change.range = this.change.high - this.change.low;
          this.change.range = this.change.range.toFixed(3);
          // return String(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_52_week_high() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/52_week_high",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log(response.data);
          this.change_52_week.high = parseFloat(response.data).toFixed(3);

          this.change_52_week.range =
            this.change_52_week.high - this.change_52_week.low;
          this.change_52_week.range = this.change_52_week.range.toFixed(3);
          console.log(this.change_52_week.range);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_52_week_low() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/52_week_low",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log(response.data);
          this.change_52_week.low = parseFloat(response.data).toFixed(3);

          this.change_52_week.range =
            this.change_52_week.high - this.change_52_week.low;
          this.change_52_week.range = this.change_52_week.range.toFixed(3);
          console.log(this.change_52_week.range);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_52_week_change() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/52_week_change",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log(response.data);
          this.change_52_week.net = parseFloat(response.data).toFixed(3);
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_avg_vol_90_day() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/ticker_data/" +
          this.$route.params.ticker.toUpperCase() +
          "/avg_vol_3_month",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log("Average 90day volume: " + response.data);
          this.avg_vol_90_day = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    update_52_week_data() {
      console.log("Updating 52 week data");
      this.get_52_week_high();
      this.get_52_week_low();
      this.get_52_week_change();
    },
    change_ticker(params) {
      console.log(params);
      this.$router.push({
        name: "ticker_dashboard",
        params: { ticker: params }
      });
      this.get_ticker_last_data();
      this.update_52_week_data();
      this.get_avg_vol_90_day();
    },
    get_latest_news() {
      axios({
        method: "get",
        url:
          "http://optionstrats.com/latest_news/" +
          this.$route.params.ticker.toUpperCase() +
          "/get/5",
        headers: {
          common: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        crossDomain: true
      })
        .then(response => {
          console.log(response.data);
          this.latest_news = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
@import "assets/plugins/select2/select2-cust.scss";

.input-group .select2-selection__rendered {
  font-size: 1rem !important;
  line-height: 1.5 !important;
}

.input-group-lg .select2-selection__rendered {
  padding: 0.75rem 1.5rem !important;
}

.input-group .select2-selection.select2-selection--single {
  height: 100%;
}

.input-group-prepend .select2-selection {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-group-append .select2-selection {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input-group-prepend.select-2-group {
  -webkit-box-flex: 1 !important;
  -ms-flex: 1 1 auto !important;
  flex: 1 1 auto !important;
  width: 1% !important;
}

#vue-trading-view {
  height: 500px !important;
}
</style>