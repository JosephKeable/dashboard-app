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
  let monthBeingCounted: string = ''
  let monthCount: number = 0
  const monthValues: number[] = []
  dashboardStore.transactions.forEach((trans, index) => {
    if (trans.status === 'completed') {
      const date = new Date(trans.date)
      const monthName = `${monthNames[date.getMonth()]} ${date.getFullYear()}`

      if (monthBeingCounted === '') {
        monthBeingCounted = monthName
      }
      if (monthBeingCounted === monthName) {
        monthCount += trans.value
      }
      else {
        monthValues.push(monthCount)
        monthBeingCounted = monthName
        monthCount = 0
        monthCount += trans.value
        if (index === dashboardStore.transactions.length - 1) {
          monthValues.push(monthCount)
        }
      }
    }
  })
  return monthValues
})

const chartData = ref({
  labels: months,
  datasets: [
    {
      label: '$',
      backgroundColor: 'rgb(33, 150, 243)',
      data: monthlyRevenue,
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
watch(() => dashboardStore.transactions, () => {
  chartData.value = {
    labels: months.value,
    datasets: [
      {
        label: '$',
        backgroundColor: 'rgb(33, 150, 243)',
        data: monthlyRevenue.value,
      },
    ],
  }
}, { deep: true })
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
}
</style>
