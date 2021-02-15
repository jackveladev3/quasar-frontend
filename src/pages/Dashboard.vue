<template>
  <div>
    <ol class="breadcrumb page-breadcrumb">
      <li class="breadcrumb-item">OptionStrats</li>
      <li class="breadcrumb-item active">Dashboard</li>
      <li class="position-absolute pos-top pos-right d-none d-sm-block">
        <span class="js-get-date"></span>
      </li>
    </ol>

    <div class="subheader">
      <h1 class="subheader-title">
        <i class='subheader-icon fal fa-chart-pie'></i> Dashboard <span class='fw-300'>Subtitle</span> <sup class='badge badge-primary fw-500'>5</sup>
      </h1>
    </div>

    <div class="row">
      <panel outer_class="col-md-8" :show_header="true" title="Charts" subtitle="amcharts">
        <div class="panel-content">
            <div class="amchart" ref="chartdiv"></div>
        </div>
      </panel>

      <div class="col-4 q-pa-md">
        <q-list>
          <q-item-section>
            <q-card
              v-for="highlight in highlights"
              :key="highlight.id"
              class="highlight-cards card q-mb-sm"
            >
              <q-card-section>
                <div class="text-subtitle1">{{ highlight.title }}</div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6">{{ highlight.message }}</div>
              </q-card-section>
              <q-card-section>
                <div class="text-subtitle2">{{ highlight.date }}</div>
              </q-card-section>
            </q-card>
          </q-item-section>
        </q-list>
      </div>
    </div>
    <div class="row">
      <panel outer_class="col-md-8" :show_header="false">
        <div class="panel-content">
          <VueTradingView :options="{ symbol: 'NASDAQ:AAPL', theme: 'light', }" />
        </div>
      </panel>
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import VueTradingView from 'vue-trading-view';

import Panel from '../components/widgets/Panel'
// import { close } from 'fs';

am4core.useTheme(am4themes_animated);

export default {
  components: {
    Panel,
    VueTradingView
  },
  data() {
    return {
      highlights: [
        {
          id: 1,
          title: "Impressions",
          message: "1,563",
          date: "May 23 - June 01 (2017)",
          icon: "remove_red_eye"
        },
        {
          id: 2,
          title: "Goal",
          message: "30,564",
          date: "May 23 - June 01 (2017)",
          icon: "remove_red_eye"
        },
        {
          id: 3,
          title: "Impact",
          message: "42.6%",
          date: "May 23 - June 01 (2017)",
          icon: "remove_red_eye"
        }
      ],
      chart_name: "dash_chart",
      ticker: "IBM"
    };
  },
  mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let data = [];
    let open_val = 0;
    let close_val = 200;
    let high_val = 0;
    let low_val = 0;
    let diff = 0;
    for (let i = 1; i < 366; i++) {
      open_val = close_val;
      diff = Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      close_val += diff;
      if (diff < 0) {
        high_val = open_val * (1 + Math.round(Math.random() * 5) / 100);
        low_val = close_val * (1 - Math.round(Math.random() * 15) / 100);
      } else {
        low_val = open_val * (1 - Math.round(Math.random() * 5) / 100);
        high_val = close_val * (1 + Math.round(Math.random() * 15) / 100);
      }
      data.push({
        date: new Date(2018, 0, i),
        name: "name" + i,
        open: open_val,
        close: close_val,
        high: high_val,
        low: low_val
      });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    var series = chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.tooltipText =
      "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

    series.riseFromPreviousState.properties.fillOpacity = 1;
    series.dropFromPreviousState.properties.fillOpacity = 0;

    chart.cursor = new am4charts.XYCursor();

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    lineSeries.defaultState.properties.visible = false;

    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(lineSeries);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<style scoped>
.amchart {
  width: 100%;
  height: 500px;
}
</style>
