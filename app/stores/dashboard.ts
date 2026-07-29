import type { Transaction } from '~/types'

interface DashboardState {
  transactions: Transaction[]
  filters: {
    dateRange: [string, string] | []
    status: ('completed' | 'pending' | 'failed')[]
    region: string[]
    transactionValue: [number, number] | []
  }
  maxValue: number
}

export const useDashboardStore = defineStore('dashboardStore', {
  state: (): DashboardState => ({
    transactions: [],
    filters: {
      dateRange: [],
      status: [],
      region: [],
      transactionValue: [],
    },
    maxValue: 0,
  }),
  actions: {
    async fetch() {
      const data: { transactionsArray: Transaction[], maxValue: number } = await $fetch('/api/mock-server', {
        method: 'post',
        body: this.filters,
      })
      this.transactions = data.transactionsArray
      this.maxValue = data.maxValue
      if (this.filters.transactionValue.length === 0) {
        this.filters.transactionValue = [0, data.maxValue - 100]
      }
    },
    setDefaultDateRange() {
      this.filters.dateRange = [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
        new Date().toISOString(),
      ]
    },
  },
})
