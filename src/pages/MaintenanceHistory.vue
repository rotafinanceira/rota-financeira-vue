<template>
  <q-layout view="hHh lpR fFf" class="layout-background">
    <AppHeader />
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="title-wrapper">
          <q-img :src="Doc" class="doc-image" />
          <span class="title-text">Histórico mensal</span>
        </div>
        <div>
          <q-card
            v-for="(item, index) in maintenanceHistory"
            :key="index"
            :class="{ 'last-card': index === maintenanceHistory.length - 1 }"
            class="my-card"
          >
            <q-card-section class="custom-padding">
              <div class="text-h6">{{ item.month }}</div>
              <div class="maintenance-info">
                <div class="maintenance-date">{{ item.date }}</div>
                <div class="maintenance-km">
                  <span class="km-label">Km do dia</span> {{ item.km }}km
                </div>
              </div>
              <div>
                <q-img :src="Line" class="line-image" />
              </div>
              <div class="q-mt-sm">
                <ul class="no-bullets">
                  <li
                    v-for="(maintenance, idx) in item.maintenanceDetails"
                    :key="`${index}-${idx}`"
                    class="q-mb-sm"
                  >
                    <q-item class="no-padding-item">
                      <q-item-section class="maintenance-section no-grow">
                        <img
                          :src="getMaintenanceIcon(maintenance.name)"
                          alt="Maintenance Icon"
                          class="maintenance-icon"
                        />
                      </q-item-section>
                      <q-item-section class="no-grow">
                        <img
                          :src="VerticalLine"
                          alt="Vertical Line Icon"
                          class="vertical-line-icon"
                        />
                      </q-item-section>
                      <q-item-section class="maintenance-info-section">
                        <div>{{ maintenance.name }}</div>
                        <div class="text-body2">R$ {{ maintenance.cost }}</div>
                      </q-item-section>
                    </q-item>
                  </li>
                </ul>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>

<script setup>
import AppHeader from 'components/AppHeader.vue';
import AppFooter from 'components/AppFooter.vue';
import FiltroComb from '@/assets/FiltroComb.svg';
import Alinhamento from '@/assets/Alinham.svg';
import Agua from '@/assets/agua.svg';
import OilChange from '@/assets/agua.svg';
// import DefaultIcon from '@/assets/default.svg';
import Doc from '@/assets/Doc.svg';
import Line from '@/assets/Line.svg';
import VerticalLine from '@/assets/VerticalLine.svg';

const maintenanceHistory = [
  {
    month: 'Setembro',
    date: 'Quarta, 25 set. 2024',
    km: '10.570',
    maintenanceDetails: [
      { name: 'Troca de filtro de combustível', cost: '400,00' },
      { name: 'Alinhamento e Balanceamento', cost: '400,00' },
    ],
  },
  {
    month: 'Agosto',
    date: 'Segunda, 21 ago. 2024',
    km: '9.510',
    maintenanceDetails: [{ name: 'Troca de água', cost: '400,00' }],
  },
  {
    month: 'Julho',
    date: 'Quinta, 15 jul. 2024',
    km: '10.150',
    maintenanceDetails: [
      { name: 'Troca de filtro de combustível', cost: '400,00' },
      { name: 'Alinhamento e Balanceamento', cost: '400,00' },
    ],
  },
  {
    month: 'Junho',
    date: 'Terça, 10 jun. 2024',
    km: '9.150',
    maintenanceDetails: [{ name: 'Troca de óleo', cost: '300,00' }],
  },
];

const maintenanceIcons = {
  'Troca de filtro de combustível': FiltroComb,
  'Alinhamento e Balanceamento': Alinhamento,
  'Troca de água': Agua,
  'Troca de óleo': OilChange,
};

function getMaintenanceIcon(name) {
  return maintenanceIcons[name] || null;
}
</script>

<style scoped>
.layout-background {
  background-color: #f5f5f5;
}

.q-page {
  padding-top: 24px;
}

.text-h6 {
  font-weight: 500;
}

.title-wrapper {
  display: flex;
  align-items: center;
  margin-left: 20px;
  gap: 10px;
}

.doc-image {
  width: 20px;
  height: 20px;
}

.title-text {
  font-size: 20px;
  font-weight: 700;
}

.my-card {
  width: calc(100% - 40px);
  min-height: 163px;
  margin: 12px auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-card:last-child {
  margin-bottom: 80px;
}

.custom-padding {
  padding: 10px;
}

.no-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
}

.q-item {
  display: flex;
  align-items: center;
}

.q-item-section {
  margin-left: 8px;
}

.no-padding-item {
  padding: 0 !important;
  display: flex;
  align-items: center;
}

.maintenance-section {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.maintenance-icon {
  width: 25px;
  height: 25px;
}

.vertical-line-icon {
  height: 100%;
}

.text-body2 {
  color: gray;
}

.maintenance-info {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.no-grow {
  flex: 0 0 auto;
}

.vertical-line-icon {
  width: 1.5px;
}

.maintenance-date {
  font-size: 10px;
  color: #3c4349;
}

.maintenance-km {
  font-size: 10px;
  color: #3c4349;
}

.km-label {
  color: #76828b;
  margin-right: 5px;
}
</style>
