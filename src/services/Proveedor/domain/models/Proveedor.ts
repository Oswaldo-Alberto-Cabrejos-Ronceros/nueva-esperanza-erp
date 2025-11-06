export interface Proveedor {
  id: number
  nombre: string
  ruc: string
  telefono: string
  direccion: string
  email: string
}

export interface ProveedorRequest {
  nombre: string
  ruc: string
  telefono: string
  direccion: string
  email: string
}
