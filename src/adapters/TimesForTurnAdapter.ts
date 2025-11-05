import type { TimesForTurn } from '@/services/Appointment/domain/models/Appointment'
import type { TimesForTurn as TimesForTurnView } from '@/models/TimesForTurn'
import { FormatTimeAdapter } from './FormatTimeAdapter'

export class TimesForTurnAdapter {
  static toTimesForTurnView(timesForTurn: TimesForTurn): TimesForTurnView {
    return {
      turn: timesForTurn.turn,
      times: timesForTurn.times.map((time) => FormatTimeAdapter.toFormatTimeView(time)),
    }
  }
}
