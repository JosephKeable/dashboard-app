<template>
  <VCard class="pa-4 chart-container">
    <Bar
      :data="chartData"
      :options="chartOptions"
    />
  </VCard>
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'

const props = defineProps({
  by: {
    type: String,
    required: true,
  },
})

const dashboardStore = useDashboardStore()
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const months = computed(() => {
  const monthsSet = new Set<string>()
  dashboardStore.transactions.forEach((t) => {
    const date = new Date(t.date)
    const monthName = `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    monthsSet.add(monthName)
  })
  return Array.from(monthsSet)
})

const monthlyRevenue = computed(() => {
  const monthTotals: Record<string, number> = {}
  months.value.forEach((month) => {
    monthTotals[month] = dashboardStore.transactions.filter(trans =>
      `${monthNames[new Date(trans.date).getMonth()]} ${new Date(trans.date).getFullYear()}` === month && trans.status === 'completed',
    ).reduce((sum, t) => sum + t.value, 0)
  })
  return Object.values(monthTotals)
})

const regionNames = computed(() => {
  return [...new Set(dashboardStore.transactions.map(t => t.region))]
})

const regionRevenue = computed(() => {
  const regionTotals: Record<string, number> = {}
  regionNames.value.forEach((reg) => {
    regionTotals[reg] = dashboardStore.transactions.filter(trans =>
      trans.region === reg && trans.status === 'completed',
    ).reduce((sum, t) => sum + t.value, 0)
  })
  return Object.values(regionTotals)
})

const chartData = ref({
  labels: props.by === 'monthly' ? months.value : props.by === 'region' ? regionNames.value : [],
  datasets: [
    {
      label: '$',
      backgroundColor: 'rgb(33, 150, 243)',
      data: props.by === 'monthly' ? monthlyRevenue.value : props.by === 'region' ? regionRevenue.value : [],
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
watch(() => dashboardStore.transactions, updateChartData, { deep: true })
watch(() => props.by, updateChartData)
function updateChartData() {
  chartData.value = {
    labels: props.by === 'monthly' ? months.value : props.by === 'region' ? regionNames.value : [],
    datasets: [
      {
        label: '$',
        backgroundColor: 'rgb(33, 150, 243)',
        data: props.by === 'monthly' ? monthlyRevenue.value : props.by === 'region' ? regionRevenue.value : [],
      },
    ],
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
}
</style>
