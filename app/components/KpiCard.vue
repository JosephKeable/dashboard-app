<template>
  <VCard
    outlined
    width="400"
    min-height="230"
  >
    <VCardTitle class="mt-2 text-primary">
      {{ props.title }}
    </VCardTitle>
    <VCardText>
      {{ props.value }}
    </VCardText>
    <VIcon
      v-if="props.icon"
      size="48"
      color="primary"
    >
      {{ props.icon }}
    </VIcon>
    <ul v-if="Object.keys(activeFilters).length > 0">
      <li
        v-for="[filterKey, filterValue] in Object.entries(activeFilters)"
        :key="filterKey"
      >
        {{ returnReadableFilterKey(filterKey) }} {{ returnReadableFilterValue(filterValue, filterKey) }}.
      </li>
    </ul>
  </VCard>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
})
const dashboardStore = useDashboardStore()
const activeFilters = computed(() => {
  const filters: Record<string, unknown> = {}
  Object.entries(dashboardStore.filters).forEach(([key, value]) => {
    if (key === 'dateRange' && Array.isArray(value) && value.length === 2) {
      filters[key] = value
    }
    else if (key !== 'dateRange' && Array.isArray(value) && value.length > 0) {
      filters[key] = value
    }
  })
  return filters
})
function returnReadableFilterKey(filterKey: string): string {
  switch (filterKey) {
    case 'dateRange':
      return 'From'
    case 'region':
      return 'In'
    case 'status':
      return 'Status:'
    default:
      return filterKey
  }
}
function returnReadableFilterValue(filterValue: unknown, filterKey: string): string {
  console.log('returnReadableFilterValue', filterValue, filterKey)
  switch (filterKey) {
    case 'dateRange':
      if (Array.isArray(filterValue) && filterValue.length === 2) {
        return `${new Date(filterValue[0]).toLocaleDateString()} to ${new Date(filterValue[1]).toLocaleDateString()}`
      }
      return String(filterValue)
    default:
      return Array.isArray(filterValue) ? filterValue.map(String).join(', ') : String(filterValue)
  }
}
</script>

<style scoped>
    .v-card-title {
      font-size: 1.8rem;
    }
    .v-card-text {
      font-size: 2.5rem;
      font-weight: bold;
    }
    .v-icon {
      position: absolute;
      bottom: 16px;
      right: 16px;
    }
    ul {
        font-size: 0.8rem;
        max-width: 80%;
        li {
            list-style-type: none;
        }
    }
</style>
