import {test,expect} from "vitest"

function sumar(a:number, b:number){
  return a+b;
}

test(
  'should plus 2 + 3 = 5',
  ()=>{
expect(sumar(2,3)).toBe(5);
  }
)
