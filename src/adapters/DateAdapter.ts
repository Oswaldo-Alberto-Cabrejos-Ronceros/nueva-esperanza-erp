import { optionsDatePeruLong } from '@/utilities/dateOptions'

export class DateAdapter {
  static toDateYYYYmmDD(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  static toTimeHHmmSS(date: Date): string {
    //14:30:00
    return date.toTimeString().split(' ')[0]
  }

  static fromHHmmSSToDate(time: string): Date | null {
    const [hours, minutes, seconds] = time.split(':').map(Number)

    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      isNaN(seconds) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59 ||
      seconds < 0 ||
      seconds > 59
    ) {
      console.error('Formato de hora inválido:', time)
      return null
    }

    const date = new Date()
    date.setHours(hours, minutes, seconds, 0)
    return date
  }
  static fromDateToFormatLong(date: Date): string {
    return date.toLocaleDateString('es-PE', optionsDatePeruLong)
  }

  static fromDateAndTimeStringToString(date: Date, time: string): string {
    try {
      //getting hours and minutes
      const [hours, minutes] = time.split(':').map(Number)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const hoursWithZero = String(hours).padStart(2, '0')
      const minutesWithZero = String(minutes).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      console.log(`${year}-${month}-${day}T${hoursWithZero}:${minutesWithZero}:00`)
      return `${year}-${month}-${day}T${hoursWithZero}:${minutesWithZero}:00`
    } catch (error) {
      console.error('Error al convertir', error)
      return ''
    }
  }

  static fromISOFormalToStringFull(date: string): string {
    return date.replace('T', ' ')
  }

  static toFormatView(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    return new Intl.DateTimeFormat('es-PE', options).format(date)
  }
}
