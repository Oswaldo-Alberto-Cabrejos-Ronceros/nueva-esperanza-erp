<script lang="ts" setup>
import StepPanel from 'primevue/steppanel'
import Panel from 'primevue/panel'
import Button from 'primevue/button'
import CardScheduleUnitary from '@/components/CardScheduleUnitary.vue'
import type { TimesForTurn } from '@/models/TimesForTurn'
import Message from 'primevue/message'
import DatePicker from 'primevue/datepicker'
import { ref } from 'vue'
import type { FormatTime } from '@/models/FormatTime'
defineProps<{
  schedules?: TimesForTurn[]
}>()
//for date

const date = ref<Date>(new Date())
const timeSelected = ref<FormatTime | null>(null)
//for emit
const emit = defineEmits(['date-change', 'select-time'])
const selectTime = (time: FormatTime) => {
  console.log(time)
  timeSelected.value = time
}

//for emit date change
const emitDateChange = () => {
  emit('date-change', date.value)
}

//for emit select time
const emitSelectTime = () => {
  if (timeSelected.value) {
    emit('select-time', timeSelected.value)
  }
}
</script>

<template>
  <!-- for schedule -->
  <StepPanel class="dark:bg-surface-800" v-slot="{ activateCallback }" value="3">
    <div class="min-h-48">
      <div class="w-full flex justify-between items-center">
        <p>Escogue horario</p>
        <DatePicker
          v-model="date"
          showIcon
          fluid
          iconDisplay="input"
          @value-change="emitDateChange()"
        />
      </div>

      <!-- for messague nothing  -->
      <Message v-if="schedules?.length === 0" severity="error" size="small" variant="simple">
        No hay horarios disponibles
      </Message>
      <div class="w-full flex flex-col gap-2 my-4" v-if="schedules">
        <!-- for morning -->
        <Panel toggleable>
          <template #header>
            <div class="flex gap-2 items-center">
              <i class="pi pi-sun text-2xl text-yellow-500"></i>
              <span>Mañana</span>
            </div>
          </template>
          <template #icons>
            <span>8h-13h</span>
          </template>
          <div
            class="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 3xl:grid-cols-9 place-items-center gap-2 my-2"
            v-if="schedules[0]"
          >
            <CardScheduleUnitary
              v-for="(schedule, index) of schedules[0].times"
              :key="index"
              :time="schedule.timeRange"
              @click="selectTime(schedule)"
              :selected="timeSelected?.time===schedule.time"
            ></CardScheduleUnitary>
          </div>
          <Message v-if="!schedules[0]" severity="error" size="small" variant="simple">
            No hay horarios disponibles en la mañana
          </Message>
        </Panel>
        <!-- for afternoon -->
        <Panel toggleable>
          <template #header>
            <div class="flex gap-2 items-center">
              <i class="pi pi-cloud text-2xl text-orange-400"></i>
              <span>Tarde</span>
            </div>
          </template>
          <template #icons>
            <span>13h-18h</span>
          </template>
          <div
            class="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 3xl:grid-cols-9 place-items-center gap-2 my-2"
            v-if="schedules[1]"
          >
            <CardScheduleUnitary
              v-for="(schedule, index) of schedules[1].times"
              :key="index"
              :time="schedule.timeRange"
              @click="selectTime(schedule)"
              :selected="timeSelected?.time===schedule.time"
            ></CardScheduleUnitary>
          </div>
          <Message v-if="!schedules[1]" severity="error" size="small" variant="simple">
            No hay horarios disponibles en la tarde
          </Message>
        </Panel>

        <!-- night -->
        <Panel toggleable>
          <template #header>
            <div class="flex gap-2 items-center">
              <i class="pi pi-moon text-2xl text-sky-700"></i>
              <span>Noche</span>
            </div>
          </template>
          <template #icons>
            <span>18h-22h</span>
          </template>
          <div
            class="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 3xl:grid-cols-9 place-items-center gap-2 my-2"
            v-if="schedules[2]"
          >
            <CardScheduleUnitary
              v-for="(schedule, index) of schedules[2].times"
              :key="index"
              :time="schedule.time"
              @click="selectTime(schedule)"
              :selected="timeSelected?.time===schedule.time"
            ></CardScheduleUnitary>
          </div>
          <Message v-if="!schedules[2]" severity="error" size="small" variant="simple">
            No hay horarios disponibles en la noche
          </Message>
        </Panel>
      </div>
    </div>
    <div class="flex justify-between">
      <Button
        label="Atrás"
        severity="secondary"
        icon="pi pi-arrow-left"
        icon-pos="left"
        @click="activateCallback('2')"
      />

      <Button
      :disabled="timeSelected===null"
        label="Siguiente"
        icon="pi pi-arrow-right"
        icon-pos="right"
        @click="
          () => {
            emitSelectTime()
            activateCallback('4')
          }
        "
      />
    </div>
  </StepPanel>
</template>
