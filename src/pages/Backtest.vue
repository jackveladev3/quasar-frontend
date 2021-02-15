<template>
  <div class="row">
    <panel outer_class="col-xs-12" title="Backtest" subtitle="Configuration Form">
      <div class="panel-content">
        <BacktestForm />
      </div>
    </panel>

    <panel outer_class="col-lg-8" title="Backtest" subtitle="Visualization">
      <div class="panel-content">
        <!-- BacktestChart /> -->
      </div>
    </panel>

    <panel outer_class="col-lg-4" title="Backtest" subtitle="Summary">
      <div class="panel-content">
        <!-- BacktestResult /> -->
      </div>
    </panel>

    <panel outer_class="col-lg-4" title="Meta" subtitle="Summary">
      <div class="panel-content">
        <!-- BacktestMeta /> -->
      </div>
    </panel>
  </div>
</template>

<script>
import BacktestForm from "../components/BacktestForm";
import Panel from "../components/widgets/Panel";

export default {
  components: {
    BacktestForm,
    Panel
  }
};
</script>

<style lang="scss">
@import "assets/plugins/select2/select2-cust.scss";
</style>
