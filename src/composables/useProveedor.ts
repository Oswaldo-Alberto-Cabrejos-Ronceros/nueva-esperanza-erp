import { AxiosHttpClient } from "@/services/Http/infrastructure/AxiosHttpClient"
import type { Proveedor, ProveedorRequest } from "@/services/Proveedor/domain/models/Proveedor"
import { ProveedorServiceImpl } from "@/services/Proveedor/infrastructure/ProveedorServiceImpl"
import { useAsyncHandler } from "./useAsyncHandler"

export function useProveedor(){
    //get from useAsyncHandle
    const { loading, error, runUseCase } = useAsyncHandler()
  //instantiete AxiosHttpCliente
  const axiosHttpClient = new AxiosHttpClient()
  //instantiete service implementation
  const proveedorService = new ProveedorServiceImpl(axiosHttpClient)


  const blockProveedor = async (proveedorId: number) => {
    await runUseCase('blockProveedor', () => proveedorService.blockProveedor(proveedorId))
  }

  //create
  const createProveedor = async (proveedorRequest: ProveedorRequest): Promise<Proveedor> => {
    const proveedor = await runUseCase('createProveedor', () =>
      proveedorService.createProveedor(proveedorRequest),
    )
    return proveedor
  }

  const getAllProveedores = async (): Promise<Proveedor[]> => {
    const proveedores: Proveedor[] = await runUseCase('getAllProveedores', () =>
      proveedorService.getAllProveedores(),
    )
    return proveedores
  }

  const getProveedorById = async (proveedorId: number): Promise<Proveedor> => {
    const employee: Proveedor = await runUseCase('getProveedorById', () =>
      proveedorService.getProveedorById(proveedorId),
    )
    return employee
  }

  const getProveedorByNombre = async (nombre: string): Promise<Proveedor> => {
    const proveedor: Proveedor = await runUseCase('getProveedorByNombre', () =>
      proveedorService.getProveedorByNombre(nombre),
    )
    return proveedor
  }

  const updateProveedor = async (
    proveedorId: number,
    proveedorRequest: ProveedorRequest,
  ): Promise<Proveedor> => {
    const employee = await runUseCase('updateProveedor', () =>
      proveedorService.updateProveedor(proveedorId, proveedorRequest),
    )

    return employee
  }

  return {
    loading,
    error,
    blockProveedor,
    createProveedor,
    getAllProveedores,
    getProveedorById,
    getProveedorByNombre,
    updateProveedor,
  }

}
