import { AxiosHttpClient } from "@/services/Http/infrastructure/AxiosHttpClient";
import { DownloadPaymentTicket } from "@/services/PaymentTicket/aplication/DownloadPaymentTicket";
import { PaymentTicketServiceImpl } from "@/services/PaymentTicket/infrastructure/PaymentTicketServiceImpl";

// Instancia de cliente HTTP
const axiosHttpClient = new AxiosHttpClient()

//instancie of implementation

const paymentTicketService = new PaymentTicketServiceImpl(axiosHttpClient)


//export use cases

export const paymentTicketUsesCases={
  downloadPaymentTicket: new DownloadPaymentTicket(paymentTicketService)
  
}

