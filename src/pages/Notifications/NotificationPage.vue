<template>
  <HeaderBar title="Notificações" path="/home" :showBackButton="true" />
  <div class="notifications">
    <AppNotification v-for="n in notifications" v-bind="n" :key="n.id" />
  </div>
</template>
<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import AppNotification from '@/shared/components/AppNotification.vue';
import { Notification } from './types';

const notifications: Notification[] = [
  {
    id: 1,
    message:
      'atenção! a vida útil da sua bateria está chegando ao fim, marque sua revisão.',
    icon: 'battery',
    status: 'danger',
    seen: false,
  },
  {
    id: 2,
    message:
      'atenção! a troca de óleo do seu veículo está atrasada. mantenha seu veículo bem cuidado!',
    icon: 'oil',
    status: 'info',
    seen: false,
  },
  {
    id: 3,
    message:
      'atenção! você trocou os pneus e precisa fazer o seu alinhamento e balanceamento.',
    icon: 'wheel',
    status: 'danger',
    seen: false,
  },
  {
    id: 4,
    message:
      'atenção! o prazo para fazer o alinhamento e balanceamento do seu carro expirou.',
    icon: 'wheel',
    status: 'info',
    seen: false,
  },
  {
    id: 5,
    message: 'não se esqueça de atualizar a sua quilometragem!',
    icon: 'wheel',
    status: 'info',
    seen: true,
  },
  {
    id: 6,
    message:
      'está chegando a hora da revisão de fábrica do seu carro! programe-se com antecedência para não ser pego de surpresa!',
    icon: 'wheel',
    status: 'warning',
    seen: true,
  },
];
</script>

<style scoped>
.notifications {
  display: grid;
  gap: 1rem;
  width: calc(100% - 2.5rem);
  margin: 0.875rem auto;
}
</style>
