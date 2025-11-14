<template>
  <div>
    <canvas id="revenueChart" height="100"></canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  name: "LineChart",
  props: {
    revenueData: {
      type: Array,
      default: () => [500, 400, 300, 350, 420, 480, 500, 600, 700, 750, 800, 900],
    },
    labels: {
      type: Array,
      default: () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  mounted() {
    this.createChart();
  },
  watch: {
    revenueData() {
      // this.updateChart();
    },
    labels() {
      this.updateChart();
    },
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("revenueChart");
      this.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Revenue",
              data: this.revenueData,
              borderColor: "#5271FF",
              borderWidth: 2,
              fill: false,
              tension: 0.4, // smooth line
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              grid: { color: "#eee" },
            },
          },
        },
      });
    },
    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.data.labels = this.labels;
        this.chartInstance.data.datasets[0].data = this.revenueData;
        // this.chartInstance.update();
      }
    },
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  },
};
</script>
<style lang="scss" scoped></style>
