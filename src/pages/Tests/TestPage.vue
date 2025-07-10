<template>
  <div class="page">
    <!-- <CButton variant="secondary" size="default">test</CButton>
      <CButton variant="tertiary" size="default">test</CButton>
      <CButton variant="danger" size="default">test</CButton>
      <CButton variant="primary" size="default" :disabled="true">test</CButton> -->

    <CModal v-model="open" :show-close="true">
      <div>
        <div class="modal__icon">
          <img :src="CheckCircleIcon" alt="Check Icon" />
        </div>

        <div class="modal__text">
          <h1>Erro de carregamento</h1>
          <p>
            Ocorreu um erro ao carregar os Termos de Uso. Verifique sua conexão
            com a internet ou tente novamente mais tarde.
          </p>
        </div>
      </div>

      <div class="modal__buttons">
        <CButton variant="danger" size="default" @click="cancelarAcao"
          >Cancelar</CButton
        >
        <CButton variant="primary" size="default" @click="confirmarAcao"
          >Confirmar</CButton
        >
      </div>
      <div>
        <CButton variant="tertiary" size="default" @click="confirmarAcao"
          >Fechar</CButton
        >
      </div>
    </CModal>

    <CButton variant="primary" size="default" @click="showModal"
      >Primário</CButton
    >
  </div>
</template>

<script setup lang="ts">
// import ModalGenerico from '@/shared/components/ModalGenerico.vue';
// import BottomSheet from '@/shared/components/BottomSheet.vue';
import { CheckCircleIcon } from '@/shared/assets/icons';
import CButton from '@/shared/components/CButton.vue';
import CModal from '@/shared/components/CModal.vue';
import { ref } from 'vue';

const open = ref(false);

const showModal = () => (open.value = true);

function confirmarAcao() {
  console.log('Confirmado!');
  open.value = false;
}

function cancelarAcao() {
  console.log('Cancelado!');
  open.value = false;
}
</script>

<style scoped lang="scss">
.page {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal {
  &__icon {
    padding-bottom: 24px;

    display: flex;
    justify-content: center;

    img {
      width: 44px;
      height: 44px;
    }
  }

  &__text {
    text-align: center;

    h1 {
      font-weight: 600;
      font-size: 1.125rem;
    }

    p {
      padding-top: 8px;
      font-weight: 400;
      font-size: 1rem;
    }
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
