<script lang="ts" setup>
import Card from 'primevue/card'
import CardGenerateReport from '@/components/CardGenerateReport.vue'
import { useDialog } from 'primevue'
import CardFormGenerateReport from '@/components/CardFormGenerateReport.vue'
import type { FormValues as SchemaGenerateReport } from '@/validation-schemas-forms/schema-generate-report'
import { useClinicReport } from '@/composables/useClinicReport'
import { useFinancialReport } from '@/composables/useFinancialReport'
import { ReportPeriod } from '@/services/enums/ReportPeriod'

const { getCaresByVetAndHeadquarterPdf } = useClinicReport()

const { getIncomeByPeriodAndServicePdf, getIncomeByHeadquarterPeriodPdf } = useFinancialReport()
const dialog = useDialog()

const generateReportCaresForVeterinary = () => {
  dialog.open(CardFormGenerateReport, {
    props: {
      modal: true,
      header: 'Citas por veterinario',
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as SchemaGenerateReport
      if (data) {
        console.log('Datos recibidos', data)
        const blob = await getCaresByVetAndHeadquarterPdf()
        if (blob) {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'cares_by_vet_and_headquarter.pdf')
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      }
    },
  })
}

const generateIncomeByPeriodAndServicePdf = () => {
  dialog.open(CardFormGenerateReport, {
    props: {
      modal: true,
      header: 'Ingresos por periodo y servicios',
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as SchemaGenerateReport
      if (data) {
        console.log('Datos recibidos', data)
        const period = ReportPeriod[data.period as keyof typeof ReportPeriod]
        const blob = await getIncomeByPeriodAndServicePdf(period)
        if (blob) {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'income_by_period_and_services.pdf')
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      }
    },
  })
}

const generateIncomeByHeadquarterPeriodPdf = () => {
  dialog.open(CardFormGenerateReport, {
    props: {
      modal: true,
      header: 'Ingresos por sede y periodo',
      blockScroll: true,
      dismissableMask: true,
    },
    onClose: async (options) => {
      const data = options?.data as SchemaGenerateReport
      if (data) {
        console.log('Datos recibidos', data)
        const period = ReportPeriod[data.period as keyof typeof ReportPeriod]
        const blob = await getIncomeByHeadquarterPeriodPdf(period)
        if (blob) {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'income_by_headquarter_and_period.pdf')
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      }
    },
  })
}
</script>

<template>
  <div class="layout-principal-flex">
    <Card class="card-principal-color-neutral">
      <template #title>
        <h2 class="h2">Reportes</h2>
      </template>
      <template #subtitle>
        <p>Genera y descarga reportes en formato pdf y excel</p>
      </template>
      <template #content>
        <div class="w-full grid grid-cols-2 gap-y-4 lg:grid-cols-4 gap-x-6 lg:gap-x-12 mt-4">
          <CardGenerateReport
            v-ripple
            class="cursor-pointer"
            title="Citas por veterinario"
            icon="fa-solid fa-shield-dog"
            description="Recuento de citas por veterinario"
            :incluyedFields="['Citas', 'Veterinario']"
            @click="generateReportCaresForVeterinary"
          />

          <CardGenerateReport
            v-ripple
            class="cursor-pointer"
            title="Ingresos por periodo y servicios"
            icon="fa-solid fa-house-medical"
            description="Recuento de ingresos por servicios"
            :incluyedFields="['Ingresos', 'Servicios']"
            @click="generateIncomeByPeriodAndServicePdf"
          />

          <CardGenerateReport
            v-ripple
            class="cursor-pointer"
            title="Ingresos sede y periodo"
            icon="pi pi-money-bill"
            description="Recuento de ingresos por sede"
            :incluyedFields="['Ingresos', 'Sede']"
            @click="generateIncomeByHeadquarterPeriodPdf"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
