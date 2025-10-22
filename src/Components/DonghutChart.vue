// ...existing code...
<template>
  <div class="flex gap-24 items-center">
    <canvas ref="bookingChart" width="200" height="200"></canvas>
    <div class="flex flex-col gap-2 text-sm">
      <div class="flex items-center gap-2"><span class="w-3 h-3 bg-green-500 rounded-full"></span> Completed</div>
      <div class="flex items-center gap-2"><span class="w-3 h-3 bg-orange-400 rounded-full"></span> Waiting approval</div>
      <div class="flex items-center gap-2"><span class="w-3 h-3 bg-red-500 rounded-full"></span> Cancelled</div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  name: 'DonghutChart',
  data() {
    return {
      chartInstance: null
    }
  },
  mounted() {
    const ctx = this.$refs.bookingChart
    // disable responsive so canvas width/height attributes are respected
    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Waiting approval', 'Cancelled'],
        datasets: [
          {
            data: [70, 10, 20],
            backgroundColor: ['#22C55E', '#F59E0B', '#EF4444'],
            borderWidth: 0,
            cutout: '70%'
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    })
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy()
      this.chartInstance = null
    }
  }
}
</script>

<style scoped>
/* optional: force CSS sizing if you prefer CSS over width/height attrs */
/* canvas { width:200px !important; height:200px !important; } */
</style>
