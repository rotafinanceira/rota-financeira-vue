<template>
  <div class="edit">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="Ícone de Finanças" />
      <h1>Editar Valor</h1>
    </div>
    <div class="edit__card">
      <h2 class="card__title">
        Qual será o novo valor da sua reserva de manutenção?
      </h2>
      <div class="card__info">
        <span class="card__text">Valor atual</span>
        <span class="card__value">{{ formattedBalance }}</span>
      </div>
      <input class="card__input" placeholder="Ex: 20" v-model="amount" type="number" />
    </div>
    <button class="card__button" @click="handleSave">Salvar</button>

    <CModal v-model="showConfirmModal" icon="alert" :showClose="false">
      <div class="confirm-modal-content">
        <h3>Atenção!</h3>
        <p>Essa ação {{ isRemoving ? 'removerá' : 'adicionará' }} {{ formattedLastDifference }} {{ isRemoving ? 'da' : 'à' }} sua reserva.<br/>Você tem certeza?</p>
        <div class="confirm-modal-actions">
          <button class="btn-confirm" @click="commitSave" :disabled="loading">
            <q-spinner v-if="loading" color="white" size="1em" />
            <span v-else>Confirmar</span>
          </button>
          <button class="btn-cancel" @click="showConfirmModal = false" :disabled="loading">Cancelar</button>
        </div>
      </div>
    </CModal>

    <CModal v-model="showSuccessModal" icon="success" @update:model-value="onModalClose">
      <div class="success-modal-content">
        <h3>Valor atualizado!</h3>
        <p>Você {{ isRemoving ? 'retirou' : 'adicionou' }} {{ formattedLastDifference }} {{ isRemoving ? 'da' : 'à' }} sua reserva. O valor atual é de {{ formattedBalance }}.</p>
      </div>
    </CModal>
  </div>
</template>

<script setup lang="ts">
import { MoneyCircleIcon } from '@/shared/assets/icons';
import { ref, computed } from 'vue';
import { useFinancialStore } from '@/stores/financialStore';
import { useCarStore } from '@/stores/carStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import CModal from '@/shared/components/CModal.vue';

const financialStore = useFinancialStore();
const { maintenanceBalance } = storeToRefs(financialStore);
const router = useRouter();

const amount = ref<string>('');
const showConfirmModal = ref(false);
const showSuccessModal = ref(false);
const pendingAmount = ref(0);
const lastDifference = ref(0);
const loading = ref(false);

const formattedBalance = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(maintenanceBalance.value);
});

const isRemoving = computed(() => pendingAmount.value < maintenanceBalance.value);

const formattedLastDifference = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(lastDifference.value);
});

async function handleSave() {
  const val = String(amount.value); 
  const numericAmount = parseFloat(val.replace(',', '.'));
  
  if (!isNaN(numericAmount) && numericAmount >= 0 && numericAmount !== maintenanceBalance.value) {
    pendingAmount.value = numericAmount;
    lastDifference.value = Math.abs(maintenanceBalance.value - numericAmount);
    showConfirmModal.value = true;
  }
}

async function commitSave() {
  loading.value = true;
  try {
    // Ensure car is loaded
    if (!financialStore.licensePlate) {
         const carStore = useCarStore();
         if (!carStore.car) {
             await carStore.getCars();
             if (carStore.cars.length > 0 && !carStore.car) {
                 carStore.car = carStore.cars[0];
             }
         }
    }
    await financialStore.setBalance(pendingAmount.value);
    showConfirmModal.value = false;
    showSuccessModal.value = true;
  } catch (e) {
    console.error(e);
    showConfirmModal.value = false;
  } finally {
    loading.value = false;
  }
}

function onModalClose(val: boolean) {
  if (!val) {
    router.back();
  }
}
</script>

<style scoped lang="scss">
@import '../_finances';

.confirm-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #000;
    margin: 0;
  }

  p {
    font-size: 1rem;
    color: #485159;
    margin: 0;
  }
}

.confirm-modal-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;

  button {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-confirm {
    background-color: #307714;
    color: #ffffff !important;
    border: 1px solid #307714;

    span {
      color: #ffffff !important;
    }
  }

  .btn-cancel {
    background-color: transparent;
    color: #307714 !important;
    border: 1px solid #307714;

    span {
      color: #307714 !important;
    }
  }
}

.success-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #000;
    margin: 0;
  }

  p {
    font-size: 1rem;
    color: #485159;
    margin: 0;
    line-height: 1.5;
  }
}
</style>
