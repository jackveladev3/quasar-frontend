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

    <div class="row d-flex flex-row overflow-auto mb-2" id="fast-info-web">
      <div class="col-lg-3 col-md-4 col-sm-12 mr-1" style="margin-top: 1.5em">
        <div class="subheader vertical-middle">
          <h1 class="subheader-title">
            <i class="subheader-icon fal fa-chart-pie"></i> Dashboard
            <span class="fw-300">{{ ticker }}</span>
          </h1>
        </div>
      </div>
      <q-space />
      <div class="p-2 col-lg-3 col-md-4 col-sm-12 mr-1">
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
      <div class="p-2 col-md-1 col-sm-12 mr-1">
        <button
          class="btn btn-lg btn-primary"
          @click="open_modal()"
          :disabled="form_data.order_list.length <= 0"
        >Heatmap</button>
      </div>
    </div>

    <div class="row d-flex flex-col">
      <panel
        outer_class="col-md-6 col-lg-4"
        :show_header="true"
        title="Puts"
        subtitle=""
      >
        <div class="panel-content">
          <!-- <ul class="nav nav-tabs nav-justified nav-tabs-clean" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="pill" href="#put">Put</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#call">Call</a>
            </li>
          </ul> -->

          <!-- TABS CONTENT -->
          <!-- <div class="tab-content my-3 position-relative"> -->
            <!-- PUT CONTENT TAB -->
            <div class="tab-pane fade show active" id="put" role="tabpanel">
              <!-- DATE PILLS -->
              <ul
                class="nav nav-pills overflow-auto pb-3"
                style="flex-wrap: unset; background-color: white"
              >
                <template v-for="(date, index) in exp_date_map.put.dates">
                  <li class="nav-item" :key="index">
                    <a
                      :class="['nav-link fs-xs py-2 px-3', index == 0 ? 'active' : '']"
                      data-toggle="pill"
                      :href="'#put-date-' + date"
                      style="white-space: nowrap"
                    >
                      <i class="fal fa-calendar-alt"></i>
                      &nbsp;&nbsp;{{ date }}
                    </a>
                  </li>
                </template>
              </ul>

              <!-- DATE PILLS CONTENT -->
              <div class="tab-content p-3">
                <template v-for="(date, index) in exp_date_map.put.dates">
                  <div
                    :class="['tab-pane fade', index == 0 ? 'active show' : '']"
                    role="tabpanel"
                    :id="'put-date-' + date"
                    :key="index"
                  >
                    <!-- <q-resize-observer @resize="onResize" ></q-resize-observer> -->
                    <BottomReachingScrollArea>
                      <div class="d-flex flex-column">
                        <template v-for="(value, price_strike) in exp_date_map.put.data[date]">
                          <!-- PRICE BOX -->
                          <div class="row pb-2 mb-3 border-bottom" :key="">
                            <div class="col-8">
                              <!-- PRICE HEADERS -->
                              <div class="row">
                                <div class="col-6 bg-info">
                                  <span class="text-white fs-xs fw-200">PUT</span>
                                </div>

                                <div class="col-2 px-1 text-center">
                                  <span class="text-muted fs-xs fw-200">BID</span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="text-muted fs-xs fw-700">MID</span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="text-muted fs-xs fw-200">ASK</span>
                                </div>
                              </div>
                              <!-- PRICE VALUES -->
                              <div class="row">
                                <div class="col-6 bg-info-50">
                                  <span class="strike-price fw-400">$ {{ price_strike }}</span>
                                </div>

                                <div class="col-2 px-1 text-center">
                                  <span class="fs-lg fw-200">
                                    <a
                                      href="#"
                                      @click.prevent="set_price(value.bid, date + '_' + price_strike, 'put')"
                                    >{{ value.bid }}</a>
                                  </span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="fs-lg fw-700">
                                    <a
                                      href="#"
                                      @click.prevent="set_price(value.mark, date + '_' + price_strike, 'put')"
                                    >{{ value.mark }}</a>
                                  </span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="fs-lg fw-200">
                                    <a
                                      href="#"
                                      @click.prevent="set_price(value.ask, date + '_' + price_strike, 'put')"
                                    >{{ value.ask }}</a>
                                  </span>
                                </div>
                              </div>

                              <!-- BREAK EVEN ROW -->
                              <div class="row mt-2">
                                <div class="col-6 hide-show">
                                  <div class="row no-gutters">
                                    <span class="text-muted fs-xs fw-200">BREAK EVEN</span>
                                  </div>
                                  <div class="row no-gutters">
                                    <span
                                      class="fs-lg fw-200 hide-me"
                                    >$ {{ break_even(value.mark, price_strike, 'put', false) }}</span>
                                    <span
                                      class="fs-lg fw-200 show-me"
                                    >{{ break_even(value.mark, price_strike, 'put', true) }} %</span>
                                  </div>
                                </div>
                                <!-- GREEKS -->
                                <div class="col-6">
                                  <div class="row">
                                    <div
                                      class="col-6 text-center hide-show border-right border-bottom"
                                    >
                                      <i class="fal fa-delta-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.delta }}</span>
                                    </div>
                                    <div class="col-6 text-center hide-show border-bottom">
                                      <i class="fal fa-gamma-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.gamma }}</span>
                                    </div>
                                    <div class="col-6 text-center hide-show border-right">
                                      <i class="fal fa-vega-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.vega }}</span>
                                    </div>
                                    <div class="col-6 text-center hide-show">
                                      <i class="fal fa-theta-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.theta }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- BUTTONS -->
                            <div class="col-4">
                              <div class="row no-gutters">
                                <button
                                  class="btn btn-xs btn-block btn-success"
                                  @click="add_order(date + '_' + price_strike, 'put', 'buy', value.volatility, value.mark)"
                                >BUY</button>
                                <div class="input-group input-group-sm my-1">
                                  <input
                                    type="number"
                                    size="1"
                                    class="form-control"
                                    :value="typeof put_orders[date + '_' + price_strike] !== 'undefined' ? put_orders[date + '_' + price_strike].quantity : '1'"
                                    @input="v => { $set(put_orders[date + '_' + price_strike], 'quantity', v.target.value) }"
                                  />
                                  <input
                                    class="form-control text-black fw-700"
                                    :value="typeof put_orders[date + '_' + price_strike]  !== 'undefined' ? put_orders[date + '_' + price_strike].price : value.mark"
                                    disabled
                                  />
                                </div>
                                <button
                                  class="btn btn-xs btn-block btn-danger"
                                  @click="add_order(date + '_' + price_strike, 'put', 'sell', value.volatility, value.mark)"
                                >SELL</button>
                              </div>
                            </div>
                          </div>

                          <!-- <div class="d-table border-bottom mb-3">
                            <div class="d-table-row">
                              <div class="d-table-cell" style="width: 60%">
                                <span
                                  class="price-strike-price fw-200"
                                >$ {{ price_strike }}&nbsp;&nbsp;</span>
                                <span class="fs-xl fw-200 text-muted">Put</span>
                              </div>

                              <div class="d-table-cell form-group">
                                <div class="input-group input-group-sm">
                                  <div class="input-group-prepend">
                                    <button
                                      class="btn btn-sm btn-success"
                                      @click="add_order('put', 'buy', 1, price_strike, value.mark, date, value.volatility)"
                                    >{{ parseFloat(value.mark).toFixed(2) }}</button>
                                  </div>
                                  <input
                                    type="number"
                                    class="form-control"
                                    size="3"
                                    style="width: 30px !important"
                                  />
                                  <div class="input-group-append">
                                    <button
                                      class="btn btn-sm btn-danger"
                                      @click="add_order('put', 'sell', 1, price_strike, value.mark, date, value.volatility)"
                                    >{{ parseFloat(value.mark).toFixed(2) }}</button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="d-table">
                              <div class="d-table-cell">
                                <p class="fs-xs fw-200 mb-0 text-muted">BREAK EVEN</p>
                                <p
                                  class="fs-sm fw-700"
                                >$ {{ break_even(value.mark, price_strike, 'put', false) }}</p>
                              </div>

                              <div class="d-table-cell">
                                <p class="fs-xs fw-200 mb-0 text-muted">TO BREAK EVEN %</p>
                                <p
                                  class="fs-sm fw-700"
                                >{{ break_even(value.mark, price_strike, 'put', true) }} %</p>
                              </div>
                            </div>
                          </div>-->
                        </template>
                      </div>
                    </BottomReachingScrollArea>
                  </div>
                </template>
              </div>
          </div>
        </div>
      </panel>

      <panel
        outer_class="col-md-6 col-lg-4"
        :show_header="true"
        title="Calls"
        subtitle=""
      >
        <div class="panel-content">
          <div class="tab-pane fade show" id="call" role="tabpanel">
              <!-- DATE PILLS -->
              <ul
                class="nav nav-pills overflow-auto pb-3"
                style="flex-wrap: unset; background-color: white"
              >
                <template v-for="(date, index) in exp_date_map.call.dates">
                  <li class="nav-item" :key="index">
                    <a
                      :class="['nav-link fs-xs py-2 px-3', index == 0 ? 'active' : '']"
                      data-toggle="pill"
                      :href="'#call-date-' + date"
                      style="white-space: nowrap"
                    >
                      <i class="fal fa-calendar-alt"></i>
                      &nbsp;&nbsp;{{ date }}
                    </a>
                  </li>
                </template>
              </ul>

              <!-- DATE PILLS CONTENT -->
              <div class="tab-content p-3">
                <template v-for="(date, index) in exp_date_map.call.dates">
                  <div
                    :class="['tab-pane fade', index == 0 ? 'active show' : '']"
                    role="tabpanel"
                    :id="'call-date-' + date"
                    :key="index"
                  >
                    <BottomReachingScrollArea>
                      <div class="d-flex flex-column">
                        <template v-for="(value, price_strike) in exp_date_map.call.data[date]">
                          <!-- PRICE BOX -->
                          <div class="row pb-2 mb-3 border-bottom">
                            <div class="col-8">
                              <!-- PRICE HEADERS -->
                              <div class="row">
                                <div class="col-6 bg-info">
                                  <span class="text-white fs-xs fw-200">CALL</span>
                                </div>

                                <div class="col-2 px-1 text-center">
                                  <span class="text-muted fs-xs fw-200">BID</span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="text-muted fs-xs fw-700">MID</span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="text-muted fs-xs fw-200">ASK</span>
                                </div>
                              </div>
                              <!-- PRICE VALUES -->
                              <div class="row">
                                <div class="col-6 bg-info-50">
                                  <span class="strike-price fw-400">$ {{ price_strike }}</span>
                                </div>

                                <div class="col-2 px-1 text-center">
                                  <span class="fs-lg fw-200">
                                    <a
                                      href="#"
                                      @click.prevent="set_price(value.bid, date + '_' + price_strike, 'call')"
                                    >{{ value.bid }}</a>
                                  </span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="fs-lg fw-700">
                                    <a
                                      href="#"
                                      @click.prevent="set_price(value.mark, date + '_' + price_strike, 'call')"
                                    >{{ value.mark }}</a>
                                  </span>
                                </div>
                                <div class="col-2 px-1 text-center">
                                  <span class="fs-lg fw-200">
                                    <a
                                      href="#"
                                      @click.prevent="set_price(value.ask, date + '_' + price_strike, 'call')"
                                    >{{ value.ask }}</a>
                                  </span>
                                </div>
                              </div>

                              <!-- BREAK EVEN ROW -->
                              <div class="row mt-2">
                                <div class="col-6 hide-show">
                                  <div class="row no-gutters">
                                    <span class="text-muted fs-xs fw-200">BREAK EVEN</span>
                                  </div>
                                  <div class="row no-gutters">
                                    <span
                                      class="fs-lg fw-200 hide-me"
                                    >$ {{ break_even(value.mark, price_strike, 'call', false) }}</span>
                                    <span
                                      class="fs-lg fw-200 show-me"
                                    >{{ break_even(value.mark, price_strike, 'call', true) }} %</span>
                                  </div>
                                </div>
                                <!-- GREEKS -->
                                <div class="col-6">
                                  <div class="row">
                                    <div
                                      class="col-6 text-center hide-show border-right border-bottom"
                                    >
                                      <i class="fal fa-delta-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.delta }}</span>
                                    </div>
                                    <div class="col-6 text-center hide-show border-bottom">
                                      <i class="fal fa-gamma-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.gamma }}</span>
                                    </div>
                                    <div class="col-6 text-center hide-show border-right">
                                      <i class="fal fa-vega-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.vega }}</span>
                                    </div>
                                    <div class="col-6 text-center hide-show">
                                      <i class="fal fa-theta-lower fs-lg fw-700 show-me"></i>
                                      <span class="fs-m fw-200 hide-me">{{ value.theta }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- BUTTONS -->
                            <div class="col-4">
                              <div class="row no-gutters">
                                <button
                                  class="btn btn-xs btn-block btn-success"
                                  @click="add_order(date + '_' + price_strike, 'call', 'buy', value.volatility, value.mark)"
                                >BUY</button>
                                <div class="input-group input-group-sm my-1">
                                  <input
                                    type="number"
                                    class="form-control"
                                    size="1"
                                    :value="typeof call_orders[date + '_' + price_strike] !== 'undefined' ? call_orders[date + '_' + price_strike].quantity : '1'"
                                    @input="v => { $set(call_orders[date + '_' + price_strike], 'quantity', v.target.value) }"
                                  />
                                  <input
                                    class="form-control text-black fw-700"
                                    :value="typeof call_orders[date + '_' + price_strike]  !== 'undefined' ? call_orders[date + '_' + price_strike].price : value.mark"
                                    disabled
                                  />
                                </div>
                                <button
                                  class="btn btn-xs btn-block btn-danger"
                                  @click="add_order(date + '_' + price_strike, 'call', 'sell', value.volatility, value.mark)"
                                >SELL</button>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </BottomReachingScrollArea>
                  </div>
                </template>
              </div>
            </div>
        </div>
      </panel>

      <panel outer_class="col-md-12 col-lg-4" :show_header="true" title="Order List" subtitle="">
        <div class="panel-content">
          <BottomReachingScrollArea>
            <table class="table table-bordered table-hover table-striped w-100 dataTable dtr-inline">
              <tr class="bg-info text-white">
                <th>Date</th>
                <th>Price</th>
                <th>Type</th>
                <th>Action</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
              <template v-for="item in form_data.order_list">
                <!-- I'd really like these to have some key -->
                <tr :key=""> 
                  <td>{{ form_data.expiration_date }}</td>
                  <td>{{ item.strike_price }}</td>
                  <td>{{ item.asset_type }}</td>
                  <td>{{ item.transaction }}</td>
                  <td>
                    <div style="display: table-row">
                      <div style="display: table-cell;">
                        {{ item.order_amount }}
                      </div>
                      <button
                        class="btn btn-xs btn-block btn-danger"
                        @click="remove_order_list_item(item)"
                        style="display: table-cell; width: 100%; margin-left: 66%;"
                      >X</button>
                    </div>
                  </td>
                  <td>{{ item.premium }}</td>
                </tr>
              </template>
            </table>
          </BottomReachingScrollArea>
        </div>
      </panel>
    </div>

    <!-- Fullscreen Modal Heatmap -->
    <!-- <div
      :class="['modal fade modal-fullscreen', modal_show ? 'show' : '']"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content h-100 border-0 shadow-0 bg-fusion-800">
          <button
            type="button"
            class="close p-sm-2 p-md-4 text-white fs-xxl position-absolute pos-right mr-sm-2 mt-sm-1 z-index-space"
            data-dismiss="modal"
            aria-label="Close"
            @click="close_modal()"
          >
            <span aria-hidden="true">
              <i class="fal fa-times"></i>
            </span>
          </button>
          <div class="modal-body p-0">
            <PNLHeatMap></PNLHeatMap>
          </div>
        </div>
      </div>
    </div> -->
    <div 
      class="row d-flex flex-row mb-2 heatmapcontainer"
    >
      <SideOverflowControlledDiv>
        <PNLHeatMap></PNLHeatMap>
      </SideOverflowControlledDiv>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Panel from "../components/widgets/Panel.vue";
import PNLHeatMap from "../components/PNLHeatMap.vue";
import BottomReachingScrollArea from "../components/BottomReachingScrollArea.vue";
import SideOverflowControlledDiv from "../components/SideOverflowControlledDiv.vue";
import Select2 from "v-select2-component";

export default {
  name: "PNLCalculator",
  components: {
    Panel,
    Select2,
    PNLHeatMap,
    BottomReachingScrollArea,
    SideOverflowControlledDiv
  },
  data() {
    return {
      ticker: this.$route.params.ticker.toUpperCase(),
      tickers: [],
      modal_show: false,
      last_price: 0,
      put_orders: {},
      call_orders: {},
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
      exp_date_map: {
        put: {
          dates: [],
          data: {}
        },
        call: {
          dates: [],
          data: {}
        }
      },
      form_data: {
        ticker: "",
        current_price: 0,
        expiration_date: "",
        implied_volatility: 0,
        output_display: "percent",
        price_range: "",
        order_list: []
      },
      scrollable_style_width: "",
      scrollable_style_height: ""
    };
  },
  watch: {
    $route(to, from) {
      this.ticker = this.$route.params.ticker.toUpperCase();
    }
  },
  mounted() {
    this.get_all_available_tickers();
    this.get_ticker_last_data();
    this.get_expiration_date_map();
  },
  methods: {
    open_modal() {
      console.log("emitting heatmap trigger");
      this.$root.$emit('generate_heatmap', this.form_data.order_list);
      this.modal_show = !this.modal_show
    },
    close_modal() {
      this.modal_show = false;
    },
    set_price(price, index, type) {
      if (price == 0) {
        return true;
      }

      if (type == "call") {
        let price_obj = {
          price: price,
          quantity:
            typeof this.call_orders[index] !== "undefined"
              ? this.call_orders[index].quantity
              : "1"
        };
        this.$set(this.call_orders, index, price_obj);
      } else if (type == "put") {
        let price_obj = {
          price: price,
          quantity:
            typeof this.put_orders[index] !== "undefined"
              ? this.put_orders[index].quantity
              : "1"
        };
        this.$set(this.put_orders, index, price_obj);
      }
    },
    add_order(
      index,
      asset_type,
      transaction,
      implied_volatility,
      default_cost
    ) {
      // console.log(index);
      // console.log(this.put_orders);
      // console.log("default cost");
      // console.log(default_cost);
      if (asset_type == "put"){
        if (this.put_orders[index] === undefined){
          this.set_price(default_cost, index, 'put');
        } else {
          // console.log("this.put_orders[index]");
          // console.log(this.put_orders[index]);
        }
      } else {
        if (this.call_orders[index] === undefined){
          this.set_price(default_cost, index, 'call');
        } else {
          // console.log("this.call_orders[index]");
          // console.log(this.call_orders[index]);
        }
      }
      // console.log(this.put_orders);

      this.form_data.ticker = this.ticker;
      this.form_data.expiration_date = index.split("_")[0];
      this.form_data.current_price = this.last_price;
      this.form_data.implied_volatility = implied_volatility;
      // this.form_data.output_display = output_display;
      let order_obj =
        asset_type == "put" ? this.put_orders[index] : this.call_orders[index];

      let spot = this.getorder_list_index(asset_type, transaction, index.split("_")[1], order_obj.price, index.split("_")[0], this.ticker, implied_volatility, this.last_price);

      if (spot < 0){
        let order = {
          asset_type: asset_type,
          transaction: transaction,
          order_amount: order_obj.quantity,
          strike_price: index.split("_")[1],
          premium: order_obj.price,
          date:  index.split("_")[0],
          ticker: this.ticker,
          implied_volatility: implied_volatility,
          current_price: this.last_price
        };
        if (this.is_add_allowed(order)){
          this.form_data.order_list.push(order);
        } else {
          alert("You cannot buy and sell the same option.  Please remove the conflicting contract purchase and try again.");
        }
      } else {
        if (order_obj.quantity > 0){
          this.form_data.order_list[spot].order_amount = order_obj.quantity;
        } else {
          this.form_data.order_list.splice(spot, 1);
        }
      }
    },
    is_add_allowed(order){
      let opposite_action = "";
      if (order.transaction == "buy"){
        opposite_action = "sell";
      } else if (order.transaction == "sell"){
        opposite_action = "buy";
      }
      return this.getorder_list_index(order.asset_type, 
        opposite_action, 
        order.strike_price, 
        order.premium, 
        order.date, 
        order.ticker, 
        order.implied_volatility, 
        order.current_price) < 0;
    },
    remove_order_list_item(item){
      let index = this.getorder_list_index(item.asset_type, 
        item.transaction, 
        item.strike_price, 
        item.premium, 
        item.date, 
        item.ticker, 
        item.implied_volatility, 
        item.current_price);
      this.form_data.order_list.splice(index, 1);
    },
    getorder_list_index(asset_type, transaction, strike_price, premium, date, ticker, implied_volatility, current_price){
      let result = -1;
      for (let i=0; i < this.form_data.order_list.length; i++){
        if (result < 0 && 
            this.form_data.order_list[i].asset_type == asset_type &&
            this.form_data.order_list[i].transaction == transaction &&
            this.form_data.order_list[i].strike_price == strike_price &&
            this.form_data.order_list[i].premium == premium &&
            this.form_data.order_list[i].date == date &&
            this.form_data.order_list[i].ticker == ticker &&
            this.form_data.order_list[i].implied_volatility == implied_volatility &&
            this.form_data.order_list[i].current_price == current_price){
          result = i;
          i = this.form_data.order_list.length;
        }
      }
      return result;
    },
    break_even(strike_price, mark, type, percent) {
      let output = 0;
      if (type == "put") {
        output = (parseFloat(mark)).toFixed(2) - parseFloat(strike_price);
      } else {
        output = (parseFloat(strike_price) + parseFloat(mark)).toFixed(2);
      }

      if (percent) {
        output = ((output * 100) / this.last_price).toFixed(2);
      }
      return output;
    },
    get_expiration_date_map() {
      axios({
        method: "get",
        url: "http://optionstrats.com/get_calculator_data/" + this.ticker,
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
        this.exp_date_map = response.data;
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
    change_ticker(params) {
      console.log(params);
      this.$router.push({
        name: "pnl_calculator",
        params: { ticker: params }
      });
      this.get_ticker_last_data();
      this.get_expiration_date_map();
    },
    onResize(size){
      this.scrollable_style_height = size.height,
      this.scrollable_style_width = size.width
    }
  },
  computed: {
    computedScrollArea(){
      return {
        height: this.scrollable_style_height + 'px',
        width: this.scrollable_style_width + 'px'
      }
    }
  }
};
</script>

<style lang="scss">
@import "assets/plugins/select2/select2-cust.scss";

.price-strike-price {
  font-size: 1.3rem !important;
}

.strike-price {
  font-size: 1.1rem !important;
}

.hide-show:hover .hide-me {
  display: block;
}

.hide-me {
  display: none;
}

.hide-show:hover .show-me {
  display: none;
}

.modal.show {
  padding-right: 0 !important;
  display: block;
}

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
</style>