export interface RecentPayment {
  id: number;
  clientFullName: string;
  clientInitials: string;
  petName: string;
  serviceName: string;
  amount: number;
  paymentDate: string;
  paymentTime: string;
  paymentStatus: string;
}
