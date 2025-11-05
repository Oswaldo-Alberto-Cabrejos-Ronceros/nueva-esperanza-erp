export class FormatAdapter{
  static toCaptalizeCaseWithout_(text:string){
    return text.toLowerCase()
  .replace('_', ' ')
  .replace(/^\w/, c => c.toUpperCase());
  }
}
