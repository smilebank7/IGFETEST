import { ChartOptions } from 'chart.js'

const baseOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  resizeDelay: 100,
}

export const barChartOptions: ChartOptions<'bar'> = {
  ...baseOptions,
  plugins: { legend: { position: 'top' } },
  animation: {
    duration: 1000
  }
}

export const pieChartOptions: ChartOptions<'pie'> = {
  ...baseOptions,
  layout: { padding: { left: 80, right: 80, top: 30, bottom: 10 } },
  plugins: { legend: { position: 'right', align: 'center' } },
  animation: {
    duration: 1000
  }
}

export const radarChartOptions: ChartOptions<'radar'> = {
  ...baseOptions,
  layout: { padding: { left: 80, right: 80, top: 30, bottom: 10 } },
  plugins: { legend: { position: 'right', align: 'center' } },
  animation: {
    duration: 1000
  }
} 