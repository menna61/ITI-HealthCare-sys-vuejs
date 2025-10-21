<template>
    <div>
        <canvas id="revenueChart" height="100"></canvas>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
  name: 'LineChart',
  mounted() {
    const ctx = document.getElementById('revenueChart')
    

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [500, 400, 300, 350, 420, 480, 500,600,700,750,800,900],
            borderColor: '#5271FF',
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
            grid: { color: '#eee' },
          },
        },
      },
    })
  },
}
</script>
<style lang="scss" scoped>

</style>