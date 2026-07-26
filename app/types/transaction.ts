export interface Transaction {
  id: string
  customerId: string
  value: number
  status: 'completed' | 'pending' | 'failed'
  date: string
  region: string
  businessUnit: string
}
