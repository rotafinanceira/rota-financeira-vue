<template>
  <div class="edit">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="Ícone de Finanças" />
      <h1>Guardar dinheiro</h1>
    </div>

    <div class="edit__card">
      <h2 class="card__title">
        Qual valor deseja guardar na reserva de manutenção?
      </h2>

      <div class="card__info">
        <span class="card__text">Valor Recomendado</span>
        <span class="card__value">
          {{ formatInput(financeStore.summary.recommendedDailyValue) }}
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

  <CModal icon="success" :show-close="true" v-model="showSucessModal">
    <div class="group">
      <h2>Ótimo trabalho!</h2>
      <p>
        Você está no caminho certo para manter seu veículo sempre em ótimas
        condições. Continue assim!
      </p>
    </div>
  </CModal>

  <CModal icon="alert" :show-close="true" v-model="showAlertModal">
    <div class="group">
      <h2>Atenção!</h2>
      <p>
        O valor para guardar deve ser maior que zero. Caso deseje retirar algum
        valor edite o saldo de reserva.
      </p>
    </div>
  </CModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MoneyCircleIcon } from '@/shared/assets/icons';
import { useFinanceStore } from '@/stores/finances/financeStore';
import CInput from '@/shared/components/CInput.vue';
import CModal from '@/shared/components/CModal.vue';
import {
  formatInput,
  parseInputToNumber,
} from '@/shared/helper/inputFormatHelper';

const financeStore = useFinanceStore();
const newValue = ref<string>('');
const showSucessModal = ref(false);
const showAlertModal = ref(false);

function save() {
  const numericValue = parseInputToNumber(newValue.value);

  if (numericValue <= 0) {
    showAlertModal.value = true;
    return;
  }

  financeStore.storeMoney(numericValue);

  newValue.value = '';
  showSucessModal.value = true;
}
</script>

<style scoped lang="scss">
@import '../_finances';
</style>
