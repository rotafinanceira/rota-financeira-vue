<template>
  <div class="finances app-wrapper">
    <div class="finances__header">
      <img :src="MoneyCircleIcon" alt="" />
      <h1>Finanças</h1>
    </div>

    <div>
      <div class="finances__card">
        <div class="card__container">
          <h2 class="card__title">
            Quanto guardar por dia?
            <div @click="showHelpModal">
              <img :src="helpIcon" alt="Help Icon" />
            </div>
          </h2>
          <div class="card__info">
            <span class="card__text">Valor Recomendado</span>
            <span class="card__value">
              {{ formatInput(financeStore.summary.recommendedDailyValue) }}
            </span>
          </div>
        </div>
      </div>
      <RouterLink class="card__button" :to="{ name: 'finances-store-money' }">
        Guardar dinheiro
      </RouterLink>
    </div>

    <div class="finances__card">
      <div class="card__container">
        <h2 class="card__title">Reserva de manutenção</h2>
        <div class="card__info">
          <span class="card__value-medium">
            {{ formatInput(financeStore.summary.maintenanceReserve) }}
          </span>
          <RouterLink class="card__link" :to="{ name: 'finances-edit-value' }"
            >Editar valor</RouterLink
          >
        </div>
        <div>
          <div>
            <hr class="separator" />
            <div class="card__info">
              <span class="card__text light">Progresso da última semana: </span>
              <div>
                <span class="card__arrow">↑</span>
                <span class="card__text light">
                  {{ formatInput(financeStore.summary.lastWeekProgress) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="finances__card card">
      <div class="card__container">
        <h2 class="card__title">Check-in</h2>
        <p class="card__description">
          Deposite um valor na sua reserva de manutenção para completar seu
          check-in de hoje!
        </p>
        <div>
          <hr />
        </div>
        <div class="card__circles">
          <div
            v-for="(status, index) in financeStore.checkinStatus"
            :key="index"
            class="circle"
            :class="{
              positive: status === true,
              negative: status === false,
              empty: status === null || status === undefined,
            }"
          >
            <img
              v-if="status !== null && status !== undefined"
              :src="status ? CheckIcon : XIcon"
              alt=""
              class="circle__icon"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <CModal v-model="isOpen" variant="info">
    <h2>Como funciona?</h2>
    <p>
      O sistema calcula automaticamente quanto você deve guardar por dia com
      base na média dos seus custos de manutenção — seja a partir de dados
      históricos ou estimativas informadas. Esse valor é dividido ao longo do
      período definido, criando um valor diário recomendado.
    </p>
    <ul>
      <li>
        Importante: O cálculo é dinâmico. Se você pular um dia sem fazer o
        check-in (ou seja, sem adicionar o valor à reserva), o sistema
        redistribui o valor restante entre os dias seguintes, o que pode
        aumentar o valor diário dos próximos check-ins.
      </li>
    </ul>
    <p>
      Manter a regularidade ajuda a evitar surpresas e facilita atingir sua meta
      com mais tranquilidade.
    </p>
  </CModal>
</template>

<script setup lang="ts">
import { MoneyCircleIcon, CheckIcon, XIcon } from '@/shared/assets/icons';
import { RouterLink } from 'vue-router';
import { useFinanceStore } from '@/stores/finances/financeStore';
import CModal from '@/shared/components/CModal.vue';
import helpIcon from '@/shared/assets/helpIcon.svg';
import { ref } from 'vue';
import { formatInput } from '@/shared/helper/inputFormatHelper';
const isOpen = ref(false);
const financeStore = useFinanceStore();

function showHelpModal() {
  isOpen.value = true;
}
</script>

<style scoped lang="scss">
@import './_finances';
</style>
