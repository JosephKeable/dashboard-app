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
      const data = await $fetch<{ transactions: Record<string, Transaction> }>('/api/mock-server')

      console.log('Dashboard Store fetch infos', data.transactions)
      const transactionsArray = Object.values(data.transactions)

      this.transactions = transactionsArray.filter((transaction) => {
        if (this.filters.dateRange.length === 2) {
          this.filters.dateRange = this.filters.dateRange.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        }
        const [startDate, endDate] = this.filters.dateRange
        const transactionDate = new Date(transaction.date)

        if (this.filters.dateRange.length === 2 && startDate && endDate) {
          const start = new Date(startDate)
          const end = new Date(endDate)
          if (transactionDate < start || transactionDate > end) {
            return false
          }
        }

        if (this.filters.status.length > 0 && !this.filters.status.includes(transaction.status)) {
          return false
        }

        if (this.filters.region.length > 0 && !this.filters.region.includes(transaction.region)) {
          return false
        }

        return true
      })
    },
    setDefaultDateRange() {
      this.filters.dateRange = [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
        new Date().toISOString(),
      ]
    },
  },
})
