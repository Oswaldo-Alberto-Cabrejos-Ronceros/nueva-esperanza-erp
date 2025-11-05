import type { FormatTime } from '@/services/Appointment/domain/models/Appointment'
import type { FormatTime as FormatTimeView } from '@/models/FormatTime'

export class FormatTimeAdapter {
  static toFormatTimeView(formatTime: FormatTime): FormatTimeView {
    return {
      time: formatTime.time,
      timeRange: formatTime.timeRange,
    }
  }
}
