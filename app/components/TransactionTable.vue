<template>
  <VCard class="pa-4 table-container">
    <VTextField
      v-model="search"
      label="Search"
      variant="outlined"
      density="comfortable"
      class="mb-4"
      prepend-icon="mdi-magnify"
    />
    <VDataTable :items="items" />
  </VCard>
</template>

<script setup lang="ts">
const dashboardStore = useDashboardStore()
const search = ref('')

const filteredTransactions = computed(() => {
  if (!search.value) {
    return dashboardStore.transactions
  }
  const lowerSearch = search.value.toLowerCase()
  return dashboardStore.transactions.filter(transaction =>
    Object.values(transaction).some(value =>
      String(value).toLowerCase().includes(lowerSearch),
    ),
  )
})

const items = computed(() => {
  return filteredTransactions.value.map(transaction => ({
    'date': new Date(transaction.date).toLocaleDateString(),
    'value': transaction.value,
    'status': transaction.status,
    'Business Unit': transaction.businessUnit,
    'region': transaction.region,
  }))
})
</script>

<style scoped>
.table-container {
  position: relative;
}
</style>
