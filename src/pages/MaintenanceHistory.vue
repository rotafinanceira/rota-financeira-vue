<template>
  <q-layout view="hHh lpR fFf" class="layout-background">
    <!-- Header -->
    <AppHeader />

    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Cabeçalho -->
        <div class="q-mt-md historico" style="display: flex; align-items: center;">
  <q-btn flat class="my-icon">
    <q-img :src="Doc" style="width: 24px; height: 24px;" />
  </q-btn>
  <div class="headline-h6-bold q-ml-sm">Histórico mensal</div>
</div>


        <!-- Lista de Cards de Manutenção -->
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
    <!-- Data -->
    <div class="maintenance-date">{{ item.date }}</div>
    <!-- Quilometragem -->
    <div class="maintenance-km">
      <span class="km-label">Km do dia:</span> {{ item.km }} km
    </div>
  </div>
  <div class="q-mt-sm">
    <ul class="no-bullets">
      <li
        v-for="(maintenance, idx) in item.maintenanceDetails"
        :key="`${index}-${idx}`"
        class="q-mb-sm"
      >
        <q-item class="no-padding-item">
          <!-- Ícone da manutenção -->
          <q-item-section class="maintenance-section">
            <img
              :src="getMaintenanceIcon(maintenance.name)"
              alt="Maintenance Icon"
              class="maintenance-icon"
            />
          </q-item-section>

          <!-- Nome da manutenção -->
          <q-item-section>
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

    <!-- Footer -->
    <AppFooter />
  </q-layout>
</template>

<script setup>
import AppHeader from 'components/AppHeader.vue';
import AppFooter from 'components/AppFooter.vue';

// Importações de SVGs
import FiltroComb from '@/assets/FiltroComb.svg';
import Alinhamento from '@/assets/Alinham.svg';
import Agua from '@/assets/agua.svg';
import OilChange from '@/assets/oil-change.svg';
import DefaultIcon from '@/assets/default.svg';
import Doc from '@/assets/Doc.svg';

// Dados de exemplo
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
    date: 'Quarta, 25 set. 2024',
    km: '9.510',
    maintenanceDetails: [{ name: 'Troca de água', cost: '400,00' }],
  },
  {
    month: 'Julho',
    date: 'Quarta, 25 set. 2024',
    km: '10.150',
    maintenanceDetails: [
      { name: 'Troca de filtro de combustível', cost: '400,00' },
      { name: 'Alinhamento e Balanceamento', cost: '400,00' },
    ],
  },
  {
    month: 'Junho',
    date: 'Quarta, 25 set. 2024',
    km: '9.150',
    maintenanceDetails: [{ name: 'Troca de óleo', cost: '300,00' }],
  },
];

// Função para retornar o ícone SVG correspondente
function getMaintenanceIcon(name) {
  switch (name) {
    case 'Troca de filtro de combustível':
      return FiltroComb;
    case 'Alinhamento e Balanceamento':
      return Alinhamento;
    case 'Troca de água':
      return Agua;
    case 'Troca de óleo':
      return OilChange;
    default:
      return DefaultIcon;
  }
}
</script>

  <style scoped>
  .q-page,
  .q-page-container {
    padding: 0 !important;
  }

  .no-padding-item {
  padding: 0 !important;
}


  .maintenance-info {
    display: flex; /* Exibe as divs em linha */
    justify-content: space-between; /* Espaçamento máximo entre os itens */
    margin-top: 10px; /* Espaçamento superior entre o título e as informações */
    margin-bottom: 10px; /* Espaçamento inferior entre as informações e a lista */
  }

.maintenance-date {
  color: var(--Cores-Cinza-700, #3C4349);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: 10px;
}

.maintenance-km {
  display: flex;
  align-items: center;
  font-size: 10px;
}

.km-label {
  color: var(--Cores-Cinza-400, #76828B); /* Cor para o texto 'Km do dia' */
  margin-right: 5px;
}

.maintenance-km {
  color: var(--Cores-Cinza-700, #3C4349); /* Cor para a quilometragem */
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: 10px;
}

  .maintenance-section {
    width: 24px !important; /* Define largura fixa */
    height: 100%; /* Preenche toda a altura do item */
    flex: 0 0 auto; /* Impede que o elemento se expanda */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* Necessário para a linha separadora */

    /* Linha vertical pontilhada */
    border-right: 1px dashed gray; /* Linha pontilhada separadora */
    padding-right: 8px; /* Espaçamento entre a linha e o texto */
  }

  .maintenance-icon {
  width: 24px;
  height: 24px;
  margin-right: 9px;
  padding: 5px;
  border-right: 9px;
}
  .layout-background {
    background-color: #f5f5f5; /* Cinza claro */
  }
  .custom-padding {
  padding: 10px !important; /* Altera o padding para 10px */
}
  .my-card {
    width: calc(100% - 40px); /* Subtraindo 20px de cada lado */
    min-height: 163px; /* Altura mínima para os cards */
    margin: 12px auto; /* Centraliza horizontalmente e cria um espaço vertical */
    gap: 12px; /* Espaço entre os elementos */
    border-radius: 8px; /* Bordas arredondadas */
    border: 1px solid #ddd; /* Borda de 1px com cor suave */
    background: #ffffff; /* Fundo branco */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra leve */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Distribui conteúdo de forma uniforme */
  }

  /* Adiciona margin-bottom de 60px no último card */
  .last-card {
    margin-bottom: 80px;
  }

  /* Textos */
  .text-h6 {
    font-weight: 500;
  }

  .text-subtitle2 {
    color: gray;
  }

  /* Ícones e seções */
  .q-item {
    display: flex;
    align-items: center;
  }

  .q-item-section {
    margin-left: 8px;
  }

.text-body2 {
  color: gray;
}
.historico {
  margin-top: 64px;
}
  /* Remove bullets das listas */
  .no-bullets {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .headline-h6-bold {
  color: var(--Cores-Secundria-800, #223227); /* Cor para o texto */
  font-family: var(--Tipo-Familia-Headline, Raleway); 
  font-size: var(--Tipo-Tamanho-Xl, 20px); /* Tamanho da fonte */
  font-style: normal;
  font-weight: 700; /* Peso da fonte (negrito) */
  line-height: 120%; /* Altura da linha */
  letter-spacing: -0.4px; /* Espaçamento entre as letras */
}

/* Estilos para o botão de ícone */
.my-icon img {
  display: flex;
  width: var(--cones_Tamanho, 20px); /* Usando variável para o tamanho */
  height: var(--cones_Tamanho, 20px); /* Usando variável para o tamanho */
  justify-content: center; /* Centraliza o conteúdo dentro do container */
  align-items: center; /* Alinha a imagem verticalmente */
  object-fit: contain; /* Mantém a proporção da imagem */
}


.my-icon img {
  width: 100%;  /* Faz a imagem ocupar toda a largura do botão */
  height: 100%; /* Faz a imagem ocupar toda a altura do botão */
  object-fit: contain; /* Mantém a proporção da imagem */
}

</style>
