import { ChartOptions } from 'chart.js'

const baseOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  resizeDelay: 100,
  animation: { duration: 0 }
}

export const barChartOptions: ChartOptions<'bar'> = {
  ...baseOptions,
  plugins: { legend: { position: 'top' } }
}

export const pieChartOptions: ChartOptions<'pie'> = {
  ...baseOptions,
  layout: { padding: { left: 80, right: 80, top: 30, bottom: 10 } },
  plugins: { legend: { position: 'right', align: 'center' } }
}

export const radarChartOptions: ChartOptions<'radar'> = {
  ...baseOptions,
  layout: { padding: { left: 80, right: 80, top: 30, bottom: 10 } },
  plugins: { legend: { position: 'right', align: 'center' } }
} 