import type { Transaction } from '~/types'

interface DashboardState {
  transactions: Transaction[]
  filters: {
    dateRange: [string, string] | []
    status: ('completed' | 'pending' | 'failed')[]
    region: string[]
  }
}

export const useDashboardStore = defineStore('dashboardStore', {
  state: (): DashboardState => ({
    transactions: [],
    filters: {
      dateRange: [],
      status: [],
      region: [],
    },
  }),
  actions: {
    async fetch() {
      const data: Transaction[] = await $fetch('/api/mock-server', {
        method: 'post',
        body: this.filters,
      })
      console.log('data', data)
      this.transactions = data
    },
    setDefaultDateRange() {
      this.filters.dateRange = [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
        new Date().toISOString(),
      ]
    },
  },
})
