export interface PaymentMethod {
  paymentMethodId: number;
  name: string;
  description?: string;
  status: boolean;
}

export interface PaymentMethodRequest {
  name: string;
  description?: string;
}

export interface PaymentMethodList {
  paymentMethodId: number;
  name: string;
  description:string
}

export interface TopPaymentMethods{
methodLabels:string[]
totalPayments:number[]
}