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
    <div
      v-if="dashboardStore.filters.dateRange.length === 2"
      class="ml-4 range-text"
    >
      {{ new Date(dashboardStore.filters.dateRange[0]).toLocaleDateString() }} - {{ new Date(dashboardStore.filters.dateRange[1]).toLocaleDateString() }}
    </div>
    <VDatePicker
      v-model="dashboardStore.filters.dateRange"
      width="100%"
      multiple="range"
      :max="new Date().toISOString().split('T')[0]"
      :hide-header="true"
      @update:model-value="dashboardStore.filters.dateRange.length === 2 ? fetchData() : null"
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
    <h5 class="ml-4">
      Select Transaction Value Range
    </h5>
    <VRangeSlider
      v-model="dashboardStore.filters.transactionValue"
      class="mt-10 mx-5"
      step="10"
      :max="dashboardStore.maxValue"
      :min="min"
      thumb-label="always"
      @update:model-value="fetchData"
    >
      <template #thumb-label="{ modelValue }">
        ${{ modelValue }}
      </template>
    </VRangeSlider>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types'

const dashboardStore = useDashboardStore()

const timeoutFunc = ref <ReturnType<typeof setTimeout> | null>(null)
const regions = ref<string[]>([])
const statuses = ref<string[]>([])
const min = ref<number>(0)

async function fetchData() {
  if (timeoutFunc.value !== null) {
    clearTimeout(timeoutFunc.value)
    timeoutFunc.value = null
  }
  timeoutFunc.value = setTimeout(async () => {
    await dashboardStore.fetch()
  }, 800)
}
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
watch(() => dashboardStore.transactions.length, () => {
  // If new transactions were added, then any new options for region/status would be added automatically.
  setRegions(dashboardStore.transactions)
  setStatuses(dashboardStore.transactions)
})
</script>

<style>
.component--filter-menu {
  padding: 16px;
}
.range-text {
  font-size: 0.8rem;
  color: #666;
}
</style>
