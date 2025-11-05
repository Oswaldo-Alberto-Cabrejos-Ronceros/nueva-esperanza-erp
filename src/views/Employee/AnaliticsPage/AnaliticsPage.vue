<script lang="ts" setup>
import Card from 'primevue/card'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import CardNewsPrimary from '@/components/CardNewsPrimary.vue'
import { onMounted, ref } from 'vue'
import Chart from 'primevue/chart'
import { usePaymentMethod } from '@/composables/usePaymentMethod'
import type { TopPaymentMethods } from '@/services/PaymentMethod/domain/models/PaymentMethod'
import { ReportPeriod } from '@/services/enums/ReportPeriod'
import { useAuthentication } from '@/composables/useAuthentication'
import { useEmployee } from '@/composables/useEmployee'
import { usePayment } from '@/composables/usePayment'
import type {
  AnnualRevenue,
  IncomePerHeadquarter,
  MonthlyStats,
} from '@/services/Payment/domain/models/Payment'
import { useAppointment } from '@/composables/useAppointment'
import type {
  DailyAppointmentStats,
  OperationalMonthlyStats,
  VeterinarianPerformance,
} from '@/services/Appointment/domain/models/Appointment'
import { useSpecie } from '@/composables/useSpecie'
import type { TopSpeciesCare } from '@/services/Specie/domain/models/Specie'

onMounted(async () => {
  await loadInfo()
  chartDataIncome.value = setChartDataIncome()
  chartOptionsIncome.value = setChartOptionsIncome()
  chartDataPaymentMethods.value = setChartDataPaymentMethods()
  chartOptionsPaymentMethods.value = setChartOptionsPaymentMethods()
  chartDataIncomeHeadquarter.value = setChartDataIncomeHeadquarter()
  chartOptionsIncomeHeadquarter.value = setChartOptionsIncomeHeadquarter()
  chartDataAppointmentWeek.value = setChartDataAppointmenstWeek()
  chartOptionsAppointmentWeek.value = setChartOptionsAppointmenstWeek()
  //operationals

  chartDataPacients.value = setChartDataPacients()
  chartOptionsPacients.value = setChartOptionsPacients()
  chartDataSpecies.value = setChartDataSpecies()
  chartOptionsSpecies.value = setChartOptionsSpecies()
  chartDataVeterinarians.value = setChartDataVeterinarians()
  chartOptionsVeterinarians.value = setChartOptionsVeterinarians()
})

const { getEmployeeMyInfo } = useEmployee()

//methods

const { getMainRole, getEntityId } = useAuthentication()

const headquarterId = ref<number | null>(null)

const topPaymentMethods = ref<TopPaymentMethods | null>(null)

const annualRevenue = ref<AnnualRevenue | null>(null)

const incomePerHeadquarter = ref<IncomePerHeadquarter | null>(null)

const veterinariansPerformance = ref<VeterinarianPerformance|null>(null)

const { getTopPaymentMethodsByHeadquarter, getTopPaymentMethods } = usePaymentMethod()

const {getTopVeterinariansPerformanceByHeadquarter,getTopVeterinariansPerformance
  ,getGeneralOperationalMonthlyStats,
  getOperationalMonthlyStatsByHeadquarter,
  getDailyAppointmentStatsLast7Days,
  getDailyAppointmentStatsByHeadquarter,
} = useAppointment()

const {getTopSpeciesByPeriod,getTopSpeciesByPeriodAndHeadquarter}= useSpecie()

const statsMounthly = ref<MonthlyStats | null>(null)

const operationalStats = ref<OperationalMonthlyStats | null>(null)

const appointmentsDaily = ref<DailyAppointmentStats | null>(null)

const topSpecies = ref<TopSpeciesCare|null>(null)

const {
  getMonthlyStatsByHeadquarter,
  getGeneralMonthlyStats,
  getIncomePerHeadquarterByPeriod,
  getAnnualFinancialEvolutionByHeadquarter,
  getAnnualFinancialEvolution,
} = usePayment()

const loadInfo = async () => {
  const role = getMainRole()
  if (role != null) {
    if (role === 'Administrador') {
      topPaymentMethods.value = await getTopPaymentMethods(ReportPeriod.WEEK)
      annualRevenue.value = await getAnnualFinancialEvolution()
      statsMounthly.value = await getGeneralMonthlyStats()
      appointmentsDaily.value = await getDailyAppointmentStatsLast7Days()
      operationalStats.value = await getGeneralOperationalMonthlyStats()
      topSpecies.value = await getTopSpeciesByPeriod(ReportPeriod.WEEK)
    veterinariansPerformance.value = await getTopVeterinariansPerformance(ReportPeriod.WEEK)
    } else {
      const entityIdGet = getEntityId()
      if (entityIdGet) {
        const info = await getEmployeeMyInfo(entityIdGet)

        headquarterId.value = info.headquarter.id
        if (headquarterId.value) {
          topPaymentMethods.value = await getTopPaymentMethodsByHeadquarter(
            ReportPeriod.WEEK,
            headquarterId.value,
          )
          annualRevenue.value = await getAnnualFinancialEvolutionByHeadquarter(headquarterId.value)
          statsMounthly.value = await getMonthlyStatsByHeadquarter(headquarterId.value)
          appointmentsDaily.value = await getDailyAppointmentStatsByHeadquarter(headquarterId.value)
          operationalStats.value = await getOperationalMonthlyStatsByHeadquarter(
            headquarterId.value,
          )
          topSpecies.value = await getTopSpeciesByPeriodAndHeadquarter(ReportPeriod.WEEK,headquarterId.value)
      veterinariansPerformance.value = await getTopVeterinariansPerformanceByHeadquarter(ReportPeriod.WEEK,headquarterId.value)
        }
      }
    }
    incomePerHeadquarter.value = await getIncomePerHeadquarterByPeriod(ReportPeriod.WEEK)
  }
}

const chartDataIncome = ref()
const chartOptionsIncome = ref()
const chartDataPaymentMethods = ref()
const chartOptionsPaymentMethods = ref()

const chartDataIncomeHeadquarter = ref()
const chartOptionsIncomeHeadquarter = ref()

const chartDataAppointmentWeek = ref()
const chartOptionsAppointmentWeek = ref()

//operationals

const chartDataPacients = ref()
const chartOptionsPacients = ref()

const chartDataSpecies = ref()
const chartOptionsSpecies = ref()

const chartDataVeterinarians = ref()
const chartOptionsVeterinarians = ref()

//data and options for sales
const setChartDataIncome = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: annualRevenue.value?.monthLabels,
    datasets: [
      {
        label: 'Ingresos',
        data: annualRevenue.value?.totalIncomes,
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-green-500'),
        tension: 0.4,
      },
    ],
  }
}

const setChartOptionsIncome = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const setChartDataPaymentMethods = () => {
  const documentStyle = getComputedStyle(document.body)
  console.log(topPaymentMethods.value)
  return {
    labels: topPaymentMethods.value?.methodLabels,
    datasets: [
      {
        data: topPaymentMethods.value?.totalPayments,
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
          documentStyle.getPropertyValue('--p-emerald-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400'),
          documentStyle.getPropertyValue('--p-gray-400'),
          documentStyle.getPropertyValue('--p-emerald-400'),
        ],
      },
    ],
  }
}

const setChartOptionsPaymentMethods = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor,
        },
      },
    },
  }
}

const setChartDataIncomeHeadquarter = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: incomePerHeadquarter.value?.headquarterLabels,
    datasets: [
      {
        label: 'Ingresos',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: incomePerHeadquarter.value?.totalIncomes,
      },
    ],
  }
}
const setChartOptionsIncomeHeadquarter = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  }
}

const setChartDataAppointmenstWeek = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: appointmentsDaily.value?.completedCounts,
    datasets: [
      {
        label: 'Completadas',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: appointmentsDaily.value?.completedCounts,
      },
      {
        label: 'Canceladas',
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        yAxisID: 'y1',
        tension: 0.4,
        data: appointmentsDaily.value?.cancelledCounts,
      },
    ],
  }
}
const setChartOptionsAppointmenstWeek = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  }
}

//operationals

const setChartDataPacients = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: appointmentsDaily.value?.dayLabels,
    datasets: [
      {
        label: 'Completadas',
        data: appointmentsDaily.value?.completedCounts,
        fill: true,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
      },
      {
        label: 'Canceladas',
        data: appointmentsDaily.value?.cancelledCounts,
        fill: true,
        tension: 0.4,
        borderColor: documentStyle.getPropertyValue('--p-orange-500'),
      },
    ],
  }
}
const setChartOptionsPacients = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const setChartDataSpecies = () => {
  const documentStyle = getComputedStyle(document.documentElement)
console.log(topSpecies)
  return {
    datasets: [
      {
        data: topSpecies.value?.totalCounts,
        backgroundColor: [
          documentStyle.getPropertyValue('--p-pink-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
          documentStyle.getPropertyValue('--p-orange-500'),
          documentStyle.getPropertyValue('--p-purple-500'),
          documentStyle.getPropertyValue('--p-cyan-500'),
        ],
        label: 'Citas',
      },
    ],
    labels: topSpecies.value?.speciesLabels,
  }
}
const setChartOptionsSpecies = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      r: {
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const setChartDataVeterinarians = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: veterinariansPerformance.value?.employeesNames,
    datasets: [
      {
        label: 'Pacientes',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: veterinariansPerformance.value?.totalPatients,
      },
      {
        label: 'Citas',
        backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        data: veterinariansPerformance.value?.totalAppointments,
      },
    ],
  }
}
const setChartOptionsVeterinarians = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  }
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">Analiticas</h2>
      </template>
      <template #subtitle>
        <p>Analisis y metricas de la clinica</p>
      </template>
      <template #content>
        <Tabs value="0" class="bg-surface-800">
          <TabList class="bg-surface-800">
            <Tab value="0">Financieras</Tab>
            <Tab value="1">Operacionales</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="flex flex-col">
                <h2 class="p-card-title h2">Financieras</h2>

                <p class="p-card-subtitle">Analisis de ingresos y rentabilidad</p>

                <div
                  v-if="statsMounthly"
                  class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4"
                >
                  <CardNewsPrimary
                    :title="'Ingresos del mes'"
                    icon="pi-money-bill"
                    :content="`S/ ${statsMounthly.totalIncomeThisMonth}`"
                  >
                  </CardNewsPrimary>
                  <CardNewsPrimary
                    :title="'Atenciones del mes'"
                    icon="pi-clock"
                    :content="`${statsMounthly.totalCompletedCaresThisMonth}`"
                  >
                  </CardNewsPrimary>
                  <CardNewsPrimary
                    :title="'Citas del mes'"
                    icon="pi-calendar"
                    :content="`${statsMounthly.totalCompletedAppointmentsThisMonth}`"
                  >
                  </CardNewsPrimary>
                  <CardNewsPrimary
                    :title="'Tasa de exito'"
                    icon="pi-chart-line"
                    :content="`% ${statsMounthly.appointmentSuccessRate}`"
                  >
                  </CardNewsPrimary>
                </div>
                <Card class="card-primary min-h-24 mt-4">
                  <template #title>
                    <h2 class="h2">Evolución financiera anual</h2>
                  </template>

                  <template #subtitle>
                    <p>Ingresos por mes</p>
                  </template>
                  <template #content>
                      <Chart
                        type="line"
                        :data="chartDataIncome"
                        :options="chartOptionsIncome"
                        class="h-[30rem] w-full"
                      />
                  </template>
                </Card>

                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 mt-4">
                  <!-- chart donut -->
                  <Card class="card-primary min-h-24">
                    <template #title>
                      <h2 class="h2">Distribucion de metodos de pago</h2>
                    </template>
                    <template #subtitle>
                      <p>Porcentaje por metodo de pago</p>
                    </template>
                    <template #content>
                      <div class="card flex justify-center">
                        <Chart
                          type="doughnut"
                          :data="chartDataPaymentMethods"
                          :options="chartOptionsPaymentMethods"
                          class="w-full md:w-[30rem]"
                        />
                      </div>
                    </template>
                  </Card>
                  <!-- appointments -->
                  <Card class="card-primary min-h-24">
                    <template #title>
                      <h2 class="h2">Ingresos por sede</h2>
                    </template>
                    <template #subtitle>
                      <p>Distribucion de ingresos por sede</p>
                    </template>
                    <template #content>
                      <div class="card flex justify-center">
                        <Chart
                          type="bar"
                          :data="chartDataIncomeHeadquarter"
                          :options="chartOptionsIncomeHeadquarter"
                          class="h-[30rem] w-full"
                        />
                      </div>
                    </template>
                  </Card>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div class="flex flex-col">
                <h2 class="p-card-title h2">Operacionales</h2>

                <p p-card-subtitle>Analisis de pacientes y veterinarios</p>

                <!-- news -->
                <div
                  v-if="operationalStats"
                  class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4"
                >
                  <CardNewsPrimary
                    :title="'Total de pacientes'"
                    icon="pi-heart"
                    :content="operationalStats.totalPatients.toString()"
                  >
                  </CardNewsPrimary>
                  <CardNewsPrimary
                    :title="'Total de clientes'"
                    icon="pi-user"
                    :content="operationalStats.totalClients.toString()"
                  >
                  </CardNewsPrimary>
                  <CardNewsPrimary
                    :title="'Veterinarios activos'"
                    icon="pi-users"
                    :content="operationalStats.activeVeterinarians.toString()"
                  >
                  </CardNewsPrimary>
                  <CardNewsPrimary
                    :title="'Ingresos por veterinario'"
                    icon="pi-money-bill"
                    :content="operationalStats.avgIncomePerVet.toString()"
                    plus="en promedio"
                  >
                  </CardNewsPrimary>
                </div>
                <Card class="card-primary min-h-24 mt-4">
                  <template #title>
                    <h2 class="h2">Evolución de pacientes</h2>
                  </template>
                  <template #subtitle>
                    <p>Pacientes nuevos vs recurrentes por mes</p>
                  </template>
                  <template #content>
                    <Chart
                      type="line"
                      :data="chartDataAppointmentWeek"
                      :options="chartOptionsAppointmentWeek"
                      class="h-[30rem]"
                    />
                  </template>
                </Card>

                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 mt-4">
                  <!-- species -->
                  <Card class="card-primary min-h-24">
                    <template #title>
                      <h2 class="h2">Distribucion por especies</h2>
                    </template>
                    <template #subtitle>
                      <p>Tipos de pacientes atendidos</p>
                    </template>
                    <template #content>
                      <div class="card flex justify-center">
                        <Chart
                          type="polarArea"
                          :data="chartDataSpecies"
                          :options="chartOptionsSpecies"
                          class="w-full md:w-[30rem]"
                        />
                      </div>
                    </template>
                  </Card>
                  <!-- veterinarians -->

                  <Card class="card-primary min-h-24">
                    <template #title>
                      <h2 class="h2">Rendimiento por veterinario</h2>
                    </template>
                    <template #subtitle>
                      <p>Pacientes atendidos</p>
                    </template>
                    <template #content>
                      <div class="card flex justify-center">
                        <Chart
                          type="bar"
                          :data="chartDataVeterinarians"
                          :options="chartOptionsVeterinarians"
                          class="h-[30rem] w-full"
                        />
                      </div>
                    </template>
                  </Card>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
