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
        <span class="card__value">
          {{ formatInput(financeStore.summary.maintenanceReserve) }}
        </span>
      </div>

      <CInput
        v-model="newValue"
        name="maintenanceValue"
        variant="money"
        placeholder="Ex: 20"
        required
      />
    </div>

    <button class="card__button" @click="save">Salvar</button>
  </div>

  <CModal icon="success" :show-close="true" v-model="showSucessAddModal">
    <div class="group">
      <h2>Valor atualizado!</h2>
      <p>
        Movimentar sua reserva é parte do hábito de cuidar bem do seu carro.
        Continue contribuindo para manter tudo em dia!
      </p>
    </div>
  </CModal>

  <CModal icon="success" :show-close="true" v-model="showSucessRemoveModal">
    <div class="group">
      <h2>Valor atualizado!</h2>
      <p>
        Você retirou {{ formatInput(diffValue) }} da sua reserva. O valor atual
        é de {{ currentFormattedValue }}
      </p>
    </div>
  </CModal>

  <CModal icon="alert" :show-close="false" v-model="showConfirmModal">
    <div class="group">
      <h2>Atenção!</h2>
      <p>
        Essa ação removerá
        {{ formatInput(diffValue) }}
        da sua reserva. Você tem certeza?
      </p>
    </div>

    <div class="group">
      <CButton variant="primary" @click="confirmSave">Confirmar</CButton>
      <CButton variant="secondary" @click="cancelSave">Cancelar</CButton>
    </div>
  </CModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { MoneyCircleIcon } from '@/shared/assets/icons';
import { useFinanceStore } from '@/stores/finances/financeStore';
import CInput from '@/shared/components/CInput.vue';
import CModal from '@/shared/components/CModal.vue';
import CButton from '@/shared/components/CButton.vue';

import {
  parseInputToNumber,
  formatInput,
} from '@/shared/helper/inputFormatHelper';

const financeStore = useFinanceStore();

const currentFormattedValue = computed(() =>
  formatInput(financeStore.summary.maintenanceReserve)
);

const newValue = ref<string>('');

const showConfirmModal = ref(false);
const showSucessAddModal = ref(false);
const showSucessRemoveModal = ref(false);
const diffValue = ref<number>(0);

function save() {
  const numericValue = parseInputToNumber(newValue.value);
  const currentValue = financeStore.summary.maintenanceReserve;

  if (numericValue < currentValue) {
    diffValue.value = currentValue - numericValue;
    showConfirmModal.value = true;
    return;
  }

  financeStore.updateMaintenanceReserve(numericValue);

  showSucessAddModal.value = true;
  newValue.value = ' ';
}

function confirmSave() {
  const numericValue = parseInputToNumber(newValue.value);

  financeStore.updateMaintenanceReserve(numericValue);

  showConfirmModal.value = false;
  showSucessRemoveModal.value = true;
  newValue.value = ' ';
}

function cancelSave() {
  showConfirmModal.value = false;
}
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
