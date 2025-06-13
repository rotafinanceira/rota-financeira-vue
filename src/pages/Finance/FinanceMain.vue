<template>
  <AppHeader />
  <div v-if="!store">
    <div class="finance">
      <div class="finance__header">
        <img :src="moneyCircle" alt="Money Circle" />
        <h2>Finanças</h2>
      </div>

      <div class="finance__main">
        <div class="finance__main-container">
          <div class="finance__main-title">
            <h3>Quanto guardar por dia?</h3>
            <img
              :src="interrogationCircle"
              alt="Interrogation Circle"
              onabort="alert(0)"
            />
          </div>
          <div class="finance__main-value">
            <p>Valor Recomendado</p>
            <span>R$ 20,00</span>
          </div>
        </div>
        <button @click="usingStore">Guardar dinheiro</button>
      </div>

      <div class="finance__reserve">
        <h3>Reserva de manutenção</h3>
        <div class="finance__reserve-value">
          <h3>R$ 200,00</h3>
          <a>Editar valor</a>
        </div>
        <div class="finance__reserve-last">
          <span>Progresso da última semana:</span>
          <div>
            <img :src="arrowUp" alt="arrow up" />
            <span>100,00</span>
          </div>
        </div>
      </div>

      <div class="finance__checkin">
        <div class="finance__checkin-container">
          <h3>Check-in</h3>
          <p>
            Deposite um valor na sua reserva de manutenção para completar seu
            check-in de hoje!
          </p>
          <div class="finance__checkin-list">
            <img
              v-for="(status, index) in checkinStatus"
              :key="index"
              :src="status ? checkCircle : errorCircle"
              :alt="status ? 'check' : 'error'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="store">
      <div class="store__main">
        <h3>Quanto guardar por dia?</h3>
        <div class="store__main-value">
          <p>Valor Recomendado</p>
          <span>R$ 20,00</span>
        </div>
        <input placeholder="Ex: 20" />
      </div>
      <button @click="usingStore">Salvar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/shared/components/AppHeader.vue';
import moneyCircle from '@/shared/assets/icons/money-circle.svg';
import interrogationCircle from '@/shared/assets/icons/interrogation-circle.svg';
import arrowUp from '@/shared/assets/icons/arrow-up.svg';
import checkCircle from '@/shared/assets/icons/check-circle.svg';
import errorCircle from '@/shared/assets/icons/x-circle.svg';

const store = ref(false);
const checkinStatus = [true, false, true, false, false];

function usingStore() {
  store.value = !store.value;
}
</script>

<style scoped lang="scss">
@import './_finance';
</style>
