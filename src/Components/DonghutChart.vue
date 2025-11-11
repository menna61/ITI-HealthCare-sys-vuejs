<template>
  <div class="flex gap-24 items-center">
    <canvas ref="bookingChart" width="200" height="200"></canvas>
    <div class="flex flex-col gap-2 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-green-500 rounded-full"></span> Completed: {{ completed }}
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-orange-400 rounded-full"></span> Confirmed: {{ confirmed }}
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-red-500 rounded-full"></span> Cancelled: {{ cancelled }}
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "DonghutChart",
  props: {
    completed: { type: Number, default: 0 },
    confirmed: { type: Number, default: 0 },
    cancelled: { type: Number, default: 0 },
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
    completed() {
      this.updateChart();
    },
    confirmed() {
      this.updateChart();
    },
    cancelled() {
      this.updateChart();
    },
  },
  methods: {
    createChart() {
      const ctx = this.$refs.bookingChart;

      // Plugin for center text when no data
      const centerTextPlugin = {
        id: "centerText",
        afterDatasetsDraw(chart) {
          const { ctx, data } = chart;
          const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (total === 0) {
            ctx.save();
            ctx.font = "bold 16px Arial";
            ctx.fillStyle = "#6B7280"; // gray color
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.fillText("No data", centerX, centerY);
            ctx.restore();
          }
        },
      };

      this.chartInstance = new Chart(ctx, {
        plugins: [centerTextPlugin],
        type: "doughnut",
        data: {
          labels: ["Completed", "Confirmed", "Cancelled"],
          datasets: [
            {
              data: [this.completed, this.confirmed, this.cancelled],
              backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
              borderWidth: 0,
              cutout: "70%",
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  return context.label + ": " + context.parsed;
                },
              },
            },
          },
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        },
      });
    },
    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.data.datasets[0].data = [this.completed, this.confirmed, this.cancelled];
        this.chartInstance.update("none");
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

<style scoped>
canvas {
  max-width: 200px;
  max-height: 200px;
}
</style>
