//function for fetch safe, generic and with error
export async function safeFetch<T>(url:string, options:RequestInit):Promise<T> {
  const res = await fetch(url,options)
  if(!res.ok){
    throw new Error(`Error ${res.status}:${res.statusText}`)
  }
  return res.json() as Promise<T>
}
