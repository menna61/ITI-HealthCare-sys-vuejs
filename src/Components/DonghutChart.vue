// ...existing code...
<template>
  <div class="flex gap-24 items-center">
    <canvas ref="bookingChart" width="200" height="200"></canvas>
    <div class="flex flex-col gap-2 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-green-500 rounded-full"></span> Completed: {{ completed }}
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 bg-orange-400 rounded-full"></span> Waiting approval: {{ pending }}
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
    pending: { type: Number, default: 0 },
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
    pending() {
      this.updateChart();
    },
    cancelled() {
      this.updateChart();
    },
  },
  methods: {
    createChart() {
      const ctx = this.$refs.bookingChart;
      this.chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Completed", "Waiting approval", "Cancelled"],
          datasets: [
            {
              data: [this.completed || 70, this.pending || 10, this.cancelled || 20],
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
        },
      });
    },
    updateChart() {
      if (this.chartInstance) {
        this.chartInstance.data.datasets[0].data = [
          this.completed || 70,
          this.pending || 10,
          this.cancelled || 20,
        ];
        this.chartInstance.update();
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
/* optional: force CSS sizing if you prefer CSS over width/height attrs */
/* canvas { width:200px !important; height:200px !important; } */
</style>
