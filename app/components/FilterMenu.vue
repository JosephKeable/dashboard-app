<template>
  <div class="component--filter-menu">
    <div class="d-flex align-center justify-space-between">
      <h5 class="ml-4">
        Select Date Range
      </h5>
      <VBtn
        variant="text"
        density="comfortable"
        size="small"
        @click="dashboardStore.filters.dateRange = []; fetchData()"
      >
        Clear Date Selection
      </VBtn>
    </div>
    <div v-if="dashboardStore.filters.dateRange.length === 2">
      <p class="ml-4 text-body-3">
        {{ new Date(dashboardStore.filters.dateRange[0]).toLocaleDateString() }} - {{ new Date(dashboardStore.filters.dateRange[1]).toLocaleDateString() }}
      </p>
    </div>
    <VDatePicker
      v-model="dashboardStore.filters.dateRange"
      width="100%"
      :multiple="2"
      :max="new Date().toISOString().split('T')[0]"
      :hide-header="true"
      @update:model-value="fetchData"
    />
    <h5 class="ml-4">
      Select Regions
    </h5>
    <VChipGroup
      v-model="dashboardStore.filters.region"
      class="ma-4"
      column
      multiple
      @update:model-value="fetchData"
    >
      <VChip
        v-for="region in regions"
        :key="region"
        :value="region"
        filter
      >
        {{ region }}
      </VChip>
    </VChipGroup>
    <h5 class="ml-4">
      Select Statuses
    </h5>
    <VChipGroup
      v-model="dashboardStore.filters.status"
      class="ma-4"
      column
      multiple
      @update:model-value="fetchData"
    >
      <VChip
        v-for="status in statuses"
        :key="status"
        :value="status"
        filter
      >
        {{ status }}
      </VChip>
    </VChipGroup>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types'

const dashboardStore = useDashboardStore()
async function fetchData() {
  await dashboardStore.fetch()
}

const regions = ref<string[]>([])
const statuses = ref<string[]>([])

function setRegions(transactions: Transaction[]) {
  const transactionRegions = [...new Set(transactions.map(t => t.region))]
  transactionRegions.forEach((r) => {
    if (!regions.value.includes(r)) {
      regions.value.push(r)
    }
  })
}

function setStatuses(transactions: Transaction[]) {
  const transactionStatuses = [...new Set(transactions.map(t => t.status))]
  transactionStatuses.forEach((s) => {
    if (!statuses.value.includes(s)) {
      statuses.value.push(s)
    }
  })
}

onMounted(() => {
  setRegions(dashboardStore.transactions)
  setStatuses(dashboardStore.transactions)
})
watch(dashboardStore.transactions, (newTransactions) => {
  setRegions(newTransactions)
  setStatuses(newTransactions)
})
</script>

<style>
.component--filter-menu {
  padding: 16px;
}
</style>
