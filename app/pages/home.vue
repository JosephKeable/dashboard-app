<template>
  <VContainer>
    <div class="d-flex flex-wrap ga-4">
      <KpiCard
        title="Revenue"
        :value="revenue"
        icon="mdi-finance"
      />
      <KpiCard
        title="Active Customers"
        :value="activeCustomers"
        icon="mdi-account-group"
      />
      <KpiCard
        title="Conversion Rate"
        :value="conversionRate"
        icon="mdi-account-reactivate"
      />
      <KpiCard
        title="Transactions"
        :value="dashboardStore.transactions.length"
        icon="mdi-clipboard-list"
      />
    </div>
    <h3 class="mt-6 ml-3">
      Revenue Summary
    </h3>
    <VTabs
      v-model="tab"
      color="primary"
      inset
      class="mb-4"
    >
      <VTab value="monthly">
        Monthly
      </VTab>
      <VTab value="region">
        By Region
      </VTab>
    </VTabs>
    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="monthly">
        <MonthlyRevenueChart />
      </VTabsWindowItem>
      <VTabsWindowItem value="region">
        region chart
      </VTabsWindowItem>
    </VTabsWindow>
  </VContainer>
</template>

<script setup lang="ts">
const tab = ref('monthly')
const dashboardStore = useDashboardStore()
await callOnce(async () => {
  await dashboardStore.setDefaultDateRange()
  await dashboardStore.fetch()
})
const revenue = computed(() => `$${dashboardStore.transactions.reduce((sum, t) => {
  if (t.status === 'completed') {
    return sum + t.value
  }
  return sum
}, 0)}`)
const activeCustomers = computed(() => [...new Set(dashboardStore.transactions.map(t => t.customerId))].length)
const conversionRate = computed(() => {
  if (dashboardStore.transactions.length === 0) {
    return 'N/A'
  }
  return (dashboardStore.transactions.filter(t => t.status === 'completed').length / dashboardStore.transactions.length * 100).toFixed(2) + '%'
})
</script>

<style lang="">

</style>
