<template>
  <VContainer>
    <h2 class="ml-3">
      Key Performance Indicators
    </h2>
    <div class="d-flex flex-wrap ga-8">
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
    <h2 class="mt-8 ml-3">
      Revenue Summary
    </h2>
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
        <RevenueChart :by="tab" />
      </VTabsWindowItem>
      <VTabsWindowItem value="region">
        <RevenueChart :by="tab" />
      </VTabsWindowItem>
    </VTabsWindow>
    <h2 class="mt-8 ml-3">
      Transaction Details
    </h2>
    <TransactionTable />
  </VContainer>
</template>

<script setup lang="ts">
const tab = ref('monthly')
const dashboardStore = useDashboardStore()
await callOnce(async () => {
  // This order is important
  // The date filter needs to be in place to avoid fetching all the items.
  await dashboardStore.setDefaultDateRange()
  await dashboardStore.fetch()
})
const revenue = computed(() => `$${dashboardStore.transactions.reduce((sum, t) => {
  if (t.status === 'completed') {
    return sum + t.value
  }
  return sum
}, 0).toFixed(2)}`)
const activeCustomers = computed(() => [...new Set(dashboardStore.transactions.map(t => t.customerId))].length)
const conversionRate = computed(() => {
  if (dashboardStore.transactions.length === 0) {
    return 'N/A'
  }
  return (dashboardStore.transactions.filter(t => t.status === 'completed').length / dashboardStore.transactions.length * 100).toFixed(2) + '%'
})
</script>

<style>
.v-card {
  border-radius: 10px;
}
</style>
