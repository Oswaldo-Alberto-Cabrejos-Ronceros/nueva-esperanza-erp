import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
import { CreatePaymentMethod } from '@/services/PaymentMethod/aplication/CreatePaymentMethod'
import { DeletePaymentMethod } from '@/services/PaymentMethod/aplication/DeletePaymentMethod'
import { GetAllPaymentMethods } from '@/services/PaymentMethod/aplication/GetAllPaymentMethod'
import { GetPaymentMethodById } from '@/services/PaymentMethod/aplication/GetPaymentMethodById'
import { UpdatePaymentMethod } from '@/services/PaymentMethod/aplication/UpdatePaymentMethod'
import { ActivatePaymentMethod } from '@/services/PaymentMethod/aplication/ActivatePaymentMethod'
import { PaymentMethodServiceImpl } from '@/services/PaymentMethod/infrastructure/PaymentMethodServiceImpl'
import { SearchPaymentMethod } from '@/services/PaymentMethod/aplication/SearchPaymentMethod'
import { GetTopPaymentMethods } from '@/services/PaymentMethod/aplication/GetTopPaymentMethods'
import { GetTopPaymentMethodsByHeadquarter } from '@/services/PaymentMethod/aplication/GetTopPaymentMethodsByHeadquarter'

// Instanciar cliente HTTP
const axiosHttpClient = new AxiosHttpClient()
// Instanciar implementación del servicio con dependencia inyectada
const paymentMethodService = new PaymentMethodServiceImpl(axiosHttpClient)

// Exportar los casos de uso
export const paymentMethodUseCases = {
  createPaymentMethod: new CreatePaymentMethod(paymentMethodService),
  deletePaymentMethod: new DeletePaymentMethod(paymentMethodService),
  getAllPaymentMethods: new GetAllPaymentMethods(paymentMethodService),
  getPaymentMethodById: new GetPaymentMethodById(paymentMethodService),
  updatePaymentMethod: new UpdatePaymentMethod(paymentMethodService),
  activatePaymentMethod: new ActivatePaymentMethod(paymentMethodService),
  searchPaymentMethod: new SearchPaymentMethod(paymentMethodService),
getTopPaymentMethods: new GetTopPaymentMethods(paymentMethodService),
  getTopPaymentMethodsByHeadquarter: new GetTopPaymentMethodsByHeadquarter(paymentMethodService),

}
