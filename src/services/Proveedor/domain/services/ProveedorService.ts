import type { Proveedor, ProveedorRequest } from "../models/Proveedor"

export interface ProveedorService {
  getAllProveedores(): Promise<Proveedor[]>
  getProveedorById(proveedorId: number): Promise<Proveedor>
  getProveedorByNombre(nombre:string): Promise<Proveedor>
  createProveedor(proveedorRequest: ProveedorRequest): Promise<Proveedor>
  updateProveedor(proveedorId: number, employeeRequest: ProveedorRequest): Promise<Proveedor>
  blockProveedor(proveedorId: number): Promise<void>
}
