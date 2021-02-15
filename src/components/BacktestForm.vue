<template>
  <div class="row m-0">
    <div class="col-md-4">
      <div class="form-group">
        <div class="row m-0">
          <div class="col-4 p-0 pr-2 pb-5">
            <div class="btn-group-vertical btn-block">
              <button :class="['btn', buy_choice_class]" type="button" @click="swap_buy_sell('buy')">
                <i class="fal fa-dollar-sign hidden-sm-down"></i> Buy
              </button>
              <button :class="['btn', sell_choice_class]" type="button" @click="swap_buy_sell('sell')">
                <i class="fal fa-money-bill hidden-sm-down"></i> Sell
              </button>
            </div>
          </div>
          <!-- Ticker Search -->
          <div class="col-8 p-0 pl-2">
            <label for="select-ticker" class="form-label">
              Ticker
            </label>
            <Select2 :options="tickers" v-model="form_data.ticker" :settings="{placeholder: 'Please select a ticker...', multiple: true}" />
          </div>

          <div class="col-6 p-0 pr-2">
            <label for="starting-cash" class="form-label">
              Starting Cash
            </label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input type="number" class="form-control" v-model="form_data.starting_cash">
            </div>
          </div>

          <div class="col-6 p-0 pl-2">
            <label for="starting-cash" class="form-label">
              Target Return
            </label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input type="number" class="form-control" v-model="form_data.target_return">
            </div>
          </div>

          <div class="col-6 p-0 pr-2 mt-3">
            <label class="form-label" for="profit-target">Profit Target</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <div class="custom-control d-flex custom-switch">
                    <input id="profit_target_continue_or_stop" type="checkbox" class="custom-control-input" @change="swap_profit_target">
                    <label class="custom-control-label fw-500" for="profit_target_continue_or_stop" style="text-transform: capitalize">{{ form_data.profit_target_continue_or_stop }}</label>
                  </div>
                </div>
              </div>
              <input type="number" class="form-control" id="profit-target" v-model="form_data.profit_target" placeholder="Profit target..." :disabled="form_data.profit_target_continue_or_stop == 'continue'">
            </div>
          </div>

          <div class="col-6 p-0 pl-2 mt-3">
            <label class="form-label" for="profit-target">Stop Loss</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <div class="custom-control d-flex custom-switch">
                    <input id="stop_loss_continue_or_stop" type="checkbox" class="custom-control-input" @change="swap_stop_loss">
                    <label class="custom-control-label fw-500" for="stop_loss_continue_or_stop" style="text-transform: capitalize">{{ form_data.stop_loss_continue_or_stop }}</label>
                  </div>
                </div>
              </div>
              <input type="number" class="form-control" id="profit-target" v-model="form_data.stop_loss" placeholder="Profit target..." :disabled="form_data.stop_loss_continue_or_stop == 'continue'">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-group">
        <div class="row">
          <div class="col-12 mb-3">
            <label class="form-label">
              Strategy Action
            </label>
            <div class="btn-group btn-group-sm btn-block">
              <button :class="['btn', strategy_open_class]" type="button" @click="swap_strategy('open')">Open</button>
              <button :class="['btn', strategy_close_class]" type="button" @click="swap_strategy('close')">Close</button>
              <button :class="['btn', strategy_high_class]" type="button" @click="swap_strategy('high')">High</button>
              <button :class="['btn', strategy_low_class]" type="button" @click="swap_strategy('low')">Low</button>
            </div>
          </div>

          <div class="col-6">
            <label for="start-date" class="form-label">Start Date</label>
            <date-picker v-model="form_data.start_date" input-class="form-control"></date-picker>
          </div>

          <div class="col-6">
            <label for="end-date" class="form-label">End Date</label>
            <date-picker v-model="form_data.end_date" input-class="form-control"></date-picker>
          </div>

          <div class="col-12 mt-3">
            <ul class="nav nav-tabs nav-tabs-clean" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#by-value" role="tab">
                  <i class="fal fa-dollar-sign text-primary mr-1"></i>
                  By Value
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#by-percent" role="tab">
                  <i class="fal fa-percent text-primary mr-1"></i>
                  By Percent
                </a>
              </li>
            </ul>

            <div class="tab-content p-3">
              <div class="tab-pane fade show active" id="by-value" role="tabpanel">
                <div class="form-group">
                  <div class="row">
                    <div class="col-6">
                      <label class="form-label">Buy value</label>
                      <input type="number" v-model="form_data.buy_value" class="form-control">
                    </div>
                    <div class="col-6">
                      <label class="form-label">Sell value</label>
                      <input type="number" v-model="form_data.sell_value" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade show" id="by-percent" role="tabpanel">
                <div class="form-group">
                  <div class="row">
                    <div class="col-6">
                      <label class="form-label">Buy percent</label>
                      <input type="number" v-model="form_data.buy_percent" class="form-control">
                    </div>
                    <div class="col-6">
                      <label class="form-label">Sell percent</label>
                      <input type="number" v-model="form_data.sell_percent" class="form-control">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-group">
        <div class="row">
          <div class="col-12">
            <ul class="nav nav-tabs nav-tabs-clean" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#buy-strategies" role="tab">
                  <i class="fal fa-dollar-sign text-primary mr-1"></i>
                  Buy Strategies
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#sell-strategies" role="tab">
                  <i class="fal fa-money-bill text-success mr-1"></i>
                  Sell Strategies
                </a>
              </li>
            </ul>

            <div class="tab-content p-3">
              <div class="tab-pane fade show active" id="buy-strategies" role="tabpanel">

                <div class="tab-content p-0">
                  <template v-for="(buy_strat, i) in buy_strats">
                    <div :class="['tab-pane', 'fade', 'show', (i == 0 ? 'active' : '')]" :key="'b-strat-' + (i + 1)" :id="'b-strat-' + (i + 1)" role="tabpanel">
                      <div class="form-group mb-0">
                        <div class="row">
                          <div class="col-6">
                            <label class="form-label">
                              <i class="fal fa-chart-line text-primary"></i> First Indicator
                            </label>

                            <Select2 :options="indicators" v-model="buy_strat.first_indicator" :settings="{placeholder: 'Please select an indicator...'}" />
                          </div>

                          <div class="col-6">
                            <label class="form-label">Time Period</label>

                            <div class="input-group">
                              <div class="input-group-prepend">
                                  <span class="input-group-text text-primary">
                                      <i class="fal fa-arrows-h"></i>
                                  </span>
                              </div>
                              <input type="number" v-model="buy_strat.first_period" class="form-control" placeholder="Time period...">
                            </div>
                          </div>

                          <div class="col-12 border-top mt-3 pt-2 clearfix">
                            <label class="form-label">Comparison</label>

                            <button class="btn btn-sm btn-icon btn-danger float-right ml-2" @click="remove_buy_strat(i)">
                              <i class="fal fa-times"></i>
                            </button>

                            <div class="btn-group btn-group-sm float-right">
                              <button :class="['btn', buy_strat.condition_greater_class]" type="button" @click="swap_buy_greater_less_condition(i, '>')" :key="'greater-strat-' + (i + 1)" :id="'greater-strat-' + (i + 1)">
                                <span class="d-md-none d-lg-block">Greater than</span>
                                <i class="fal fa-angle-right d-none d-md-block d-lg-none"></i>
                              </button>
                              <button :class="['btn', buy_strat.condition_less_class]" type="button" @click="swap_buy_greater_less_condition(i, '<')" :key="'less-strat-' + (i + 1)" :id="'less-strat-' + (i + 1)">
                                <span class="d-md-none d-lg-block">Less than</span>
                                <i class="fal fa-angle-left d-none d-md-block d-lg-none"></i>
                              </button>
                            </div>
                          </div>

                          <div class="col-12 mt-2">
                            <ul class="nav nav-tabs nav-tabs-clean" role="tablist">
                              <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" :href="'#buy-second-indicator-' + (i + 1)" role="tab">
                                  <i class="fal fa-chart-line text-primary mr-1"></i>
                                  Indicator
                                </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" :href="'#buy-second-value-1' + (i + 1)" role="tab">
                                  <i class="fal fa-dollar-sign text-primary mr-1"></i>
                                  Value
                                </a>
                              </li>
                            </ul>

                            <div class="tab-content p-3">
                              <div class="tab-pane fade show active" :id="'buy-second-indicator-' + (i + 1)" role="tabpanel">
                                <div class="form-group">
                                  <div class="row">
                                    <div class="col-6">
                                      <label class="form-label">
                                        <i class="fal fa-chart-line text-primary"></i> Second Indicator
                                      </label>

                                      <Select2 :options="indicators" v-model="buy_strat.second_indicator" :settings="{placeholder: 'Please select an indicator...'}" />
                                    </div>

                                    <div class="col-6">
                                      <label class="form-label">Time Period</label>

                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text text-primary">
                                                <i class="fal fa-arrows-h"></i>
                                            </span>
                                        </div>
                                        <input type="number" v-model="buy_strat.second_period" class="form-control" placeholder="Time period...">
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="tab-pane fade show" :id="'buy-second-value-1' + (i + 1)" role="tabpanel">
                                <div class="form-group">
                                  <div class="row">
                                    <div class="col-12">
                                      <label class="form-label">Value to compare</label>

                                      <input type="number" v-model="buy_strat.constant" class="form-control" placeholder="Enter a numeric value to compare...">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>

                <div class="col-12 border-top pt-2 clearfix">
                  <ul class="nav nav-pills float-left" role="tablist">
                    <template v-for="(buy_strat, i) in buy_strats">
                      <li class="nav-item" v-bind:key="'b-strat-' + (i + 1)">
                        <a :href="'#b-strat-' + (i + 1)" data-toggle="pill" :class="['nav-link', 'btn-sm', (i <= 0 ? 'active' : '')]">{{ i + 1 }}</a>
                      </li>
                    </template>
                  </ul>
                  <button type="button" class="btn btn-sm btn-success float-right ml-2" @click="add_buy_strat()">Add</button>

                  <div class="btn-group btn-group-sm float-right">
                    <button type="button" :class="['btn', buy_strat_cond_and_class]" @click="swap_buy_strat_condition('and')">And</button>
                    <button type="button" :class="['btn', buy_strat_cond_or_class]" @click="swap_buy_strat_condition('or')">Or</button>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade show" id="sell-strategies" role="tabpanel">

                <div class="tab-content p-0">
                  <template v-for="(sell_strat, i) in sell_strats">
                    <div :class="['tab-pane', 'fade', 'show', (i <= 0 ? 'active' : '')]" :key="'s-strat-' + (i + 1)" :id="'s-strat-' + (i + 1)" role="tabpanel">
                      <div class="form-group mb-0">
                        <div class="row">
                          <div class="col-6">
                            <label class="form-label">
                              <i class="fal fa-chart-line text-success"></i> First Indicator
                            </label>

                            <Select2 :options="indicators" v-model="sell_strat.first_indicator" :settings="{placeholder: 'Please select an indicator...'}" />
                          </div>

                          <div class="col-6">
                            <label class="form-label">Time Period</label>

                            <div class="input-group">
                              <div class="input-group-prepend">
                                  <span class="input-group-text text-success">
                                      <i class="fal fa-arrows-h"></i>
                                  </span>
                              </div>
                              <input type="number" v-model="sell_strat.first_period" class="form-control" placeholder="Time period...">
                            </div>
                          </div>

                          <div class="col-12 border-top mt-3 pt-2 clearfix">
                            <label class="form-label">Comparison</label>

                            <button class="btn btn-sm btn-icon btn-danger float-right ml-2" @click="remove_sell_strat(i)">
                              <i class="fal fa-times"></i>
                            </button>

                            <div class="btn-group btn-group-sm float-right">
                              <button :class="['btn', sell_strat.condition_greater_class]" type="button" @click="swap_sell_greater_less_condition(i, '>')">
                                <span class="hidden-sm-down">Greater than</span>
                                <i class="fal fa-angle-right hidden-md-up"></i>
                              </button>
                              <button :class="['btn', sell_strat.condition_less_class]" type="button" @click="swap_sell_greater_less_condition(i, '<')">
                                <span class="hidden-sm-down">Less than</span>
                                <i class="fal fa-angle-left hidden-md-up"></i>
                              </button>
                            </div>
                          </div>

                          <div class="col-12 mt-2">
                            <ul class="nav nav-tabs nav-tabs-clean" role="tablist">
                              <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" :href="'#sell-second-indicator-' + (i + 1)" role="tab">
                                  <i class="fal fa-chart-line text-success mr-1"></i>
                                  Indicator
                                </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" :href="'#sell-second-value-' + (i + 1)" role="tab">
                                  <i class="fal fa-dollar-sign text-success mr-1"></i>
                                  Value
                                </a>
                              </li>
                            </ul>

                            <div class="tab-content p-3">
                              <div class="tab-pane fade show active" :id="'sell-second-indicator-' + (i + 1)" role="tabpanel">
                                <div class="form-group">
                                  <div class="row">
                                    <div class="col-6">
                                      <label class="form-label">
                                        <i class="fal fa-chart-line text-success"></i> Second Indicator
                                      </label>

                                      <Select2 :options="indicators" v-model="sell_strat.second_indicator" :settings="{placeholder: 'Please select an indicator...'}" />
                                    </div>

                                    <div class="col-6">
                                      <label class="form-label">Time Period</label>

                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text text-success">
                                                <i class="fal fa-arrows-h"></i>
                                            </span>
                                        </div>
                                        <input type="number" v-model="sell_strat.second_period" class="form-control" placeholder="Time period...">
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="tab-pane fade show" :id="'sell-second-value-' + (i + 1)" role="tabpanel">
                                <div class="form-group">
                                  <div class="row">
                                    <div class="col-12">
                                      <label class="form-label">Value to compare</label>

                                      <input type="number" v-model="sell_strat.constant" class="form-control" placeholder="Enter a numeric value to compare...">
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>

                <div class="col-12 border-top pt-2 clearfix">
                  <ul class="nav nav-pills float-left" role="tablist">
                    <template v-for="(sell_strat, i) in sell_strats">
                      <li class="nav-item" v-bind:key="'s-strat-' + (i + 1)">
                        <a :href="'#s-strat-' + (i + 1)" data-toggle="pill" :class="['nav-link', 'btn-sm', (i <= 0 ? 'active' : '')]">{{ i + 1 }}</a>
                      </li>
                    </template>
                  </ul>
                  <button type="button" class="btn btn-sm btn-success float-right ml-2" @click="add_sell_strat()">Add</button>

                  <div class="btn-group btn-group-sm float-right">
                    <button type="button" :class="['btn', sell_strat_cond_and_class]" @click="swap_sell_strat_condition('and')">And</button>
                    <button type="button" :class="['btn', sell_strat_cond_or_class]" @click="swap_sell_strat_condition('or')">Or</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 clearfix">
      <button class="btn btn-lg btn-info float-right" type="button" @click="submit()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Select2 from 'v-select2-component'
import datePicker from 'vuejs-datepicker'

export default {
  components: {
    Select2,
    datePicker
  },
  props: {
    form_data: {
      type: Object,
      default: () => ({
        ticker: "",
        starting_cash: 0,
        profit_target: 0,
        target_return: 0,
        profit_target_continue_or_stop: "continue",
        stop_loss: 0,
        stop_loss_continue_or_stop: "continue",
        conflict_choice: "buy",
        price_type: "open",
        start_date: new Date(),
        end_date: new Date(),
        buy_value: 0,
        sell_value: 0,
        buy_percent: 0,
        sell_percent: 0,
        buy_combine_condition: 'and',
        sell_combine_condition: 'and'
      })
    }
  },
  data() {
    return {
      ticker: "AAPL",
      tickers: ["AAPL", "IBM", "MMM"],
      indicators: ["volume", "ema", "sma", "t3", "dema"],
      buy_choice_class: "btn-info",
      sell_choice_class: "btn-default",
      strategy_open_class: "btn-info",
      strategy_close_class: "btn-default",
      strategy_low_class: "btn-default",
      strategy_high_class: "btn-default",
      buy_strat_cond_and_class: "btn-info",
      buy_strat_cond_or_class: "btn-default",
      sell_strat_cond_and_class: "btn-info",
      sell_strat_cond_or_class: "btn-default",

      strat_template: {
        first_indicator: '',
        first_period: '',
        condition: '<',
        second_indicator: '',
        second_period: '',
        constant: 0,
        condition_greater_class: 'btn-default',
        condition_less_class: 'btn-info'
      },

      buy_strats: [],
      sell_strats: []
    };
  },
  mounted() {
    this.add_buy_strat();
    this.add_sell_strat();
  },
  methods: {
    swap_stop_loss() {
      if (this.form_data.stop_loss_continue_or_stop != 'continue') {
        this.form_data.stop_loss_continue_or_stop = 'continue'
      }
      else {
        this.form_data.stop_loss_continue_or_stop = 'stop'
      }
    },
    swap_profit_target() {
      if (this.form_data.profit_target_continue_or_stop != 'continue') {
        this.form_data.profit_target_continue_or_stop = 'continue'
      }
      else {
        this.form_data.profit_target_continue_or_stop = 'stop'
      }
    },
    swap_buy_sell(value) {
      this.form_data.conflict_choice = value;
      this.buy_choice_class = "btn-default";
      this.sell_choice_class = "btn-default";

      if (this.form_data.conflict_choice == "buy") {
        this.buy_choice_class = "btn-info";
      }
      else {
        this.sell_choice_class = "btn-warning";
      }
    },
    swap_strategy(value) {
      this.form_data.price_type = value;
      this.strategy_open_class = "btn-default";
      this.strategy_close_class = "btn-default";
      this.strategy_low_class = "btn-default";
      this.strategy_high_class = "btn-default";

      switch (value) {
        case 'open':
          this.strategy_open_class = "btn-info";
          break;

        case 'close':
          this.strategy_close_class = "btn-info";
          break;

        case 'low':
          this.strategy_low_class = "btn-info";
          break;

        case 'high':
          this.strategy_high_class = "btn-info";
          break;
      }
    },
    swap_buy_strat_condition(value) {
      this.form_data.buy_combine_condition = value;
      this.buy_strat_cond_and_class = "btn-default";
      this.buy_strat_cond_or_class = "btn-default";

      switch (value) {
        case 'and':
          this.buy_strat_cond_and_class = "btn-info";
          break;
      
        case 'or':
          this.buy_strat_cond_or_class = "btn-info";
          break;
      }
    },
    swap_sell_strat_condition(value) {
      this.form_data.sell_combine_condition = value;
      this.sell_strat_cond_and_class = "btn-default";
      this.sell_strat_cond_or_class = "btn-default";

      switch (value) {
        case 'and':
          this.sell_strat_cond_and_class = "btn-info";
          break;
      
        case 'or':
          this.sell_strat_cond_or_class = "btn-info";
          break;
      }
    },
    swap_buy_greater_less_condition(index, value) {
      console.log('Changing buy strat ' + index)
      this.buy_strats[index].condition = value;
      this.buy_strats[index].condition_greater_class = 'btn-default';
      this.buy_strats[index].condition_less_class = 'btn-default';

      switch (value) {
        case '>':
          this.buy_strats[index].condition_greater_class = 'btn-info';
          break;
      
        case '<':
          this.buy_strats[index].condition_less_class = 'btn-info';
          break;
      }
    },
    swap_sell_greater_less_condition(index, value) {
      this.sell_strats[index].condition = value;
      this.sell_strats[index].condition_greater_class = 'btn-default';
      this.sell_strats[index].condition_less_class = 'btn-default';

      switch (value) {
        case '>':
          this.sell_strats[index].condition_greater_class = 'btn-info';
          break;
      
        case '<':
          this.sell_strats[index].condition_less_class = 'btn-info';
          break;
      }
    },
    add_buy_strat() {
      if (this.buy_strats.length < 5) {
        this.buy_strats.push({
          first_indicator: '',
          first_period: '',
          condition: '<',
          second_indicator: '',
          second_period: '',
          constant: 0,
          condition_greater_class: 'btn-default',
          condition_less_class: 'btn-info'
        })
        console.log('Added new buy srategy on position ' + this.buy_strats.length)
      }
      else {
        console.log('No more than 5 strategies are permited')
      }
    },
    remove_buy_strat(index) {
      this.buy_strats.pop(index);

      if (this.buy_strats.length <= 0) {
        this.add_buy_strat();
      }
    },
    add_sell_strat() {
      if (this.sell_strats.length < 5) {
        this.sell_strats.push({
          first_indicator: '',
          first_period: '',
          condition: '<',
          second_indicator: '',
          second_period: '',
          constant: 0,
          condition_greater_class: 'btn-default',
          condition_less_class: 'btn-info'
        })
        console.log('Added new sell srategy on position ' + this.sell_strats.length)
      }
      else {
        console.log('No more than 5 strategies are permited')
      }
    },
    remove_sell_strat(index) {
      this.sell_strats.pop(index);

      if (this.sell_strats.length <= 0) {
        this.add_sell_strat();
      }
    },
    submit() {
      console.log('Submiting form')

      this.add_strats_to_form();

      console.log(this.form_data)

      axios({
        method: "post",
        url: "http://optionstrats.com/backtest",
        headers: {
          common: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        data: this.form_data,
        crossDomain: true
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
    },
    parse_indicator(indicator, period) {
      return indicator + '_' + period;
    },
    create_strategy_object(raw_data) {
      let output_object = {
        indicator_1: this.parse_indicator(raw_data.first_indicator, raw_data.first_period),
        condition: raw_data.condition,
        indicator_2: this.parse_indicator(raw_data.second_indicator, raw_data.second_period),
        constant: raw_data.constant
      }

      return output_object
    },
    add_strats_to_form() {
      for (const i of Array(5).keys()) { 
        let buy_strat_object_name = 'buy_strat_' + (i + 1)
        let sell_strat_object_name = 'sell_strat_' + (i + 1)
        
        this.form_data[buy_strat_object_name] = {}
        this.form_data[sell_strat_object_name] = {}

        if (i < this.buy_strats.length) {
          this.form_data[buy_strat_object_name] = this.create_strategy_object(this.buy_strats[i])
        }
        if (i < this.sell_strats.length) {
          this.form_data[sell_strat_object_name] = this.create_strategy_object(this.sell_strats[i])
        }
      }
    }
  },
  computed: {
  }
};
</script>

<style scoped></style>
