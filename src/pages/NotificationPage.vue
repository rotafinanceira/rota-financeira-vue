<template>
  <div>
    <HeaderBar
      title="Notificações"
      path="/home"
      :showBackButton="true"
    />
    <q-page class="notification-page">
      <q-item
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-item"
      >
        <q-card
          :class="['notification-card', {
              'notification-card--priority-high': notification.priority === 'high',
              'notification-card--priority-low': notification.priority === 'low',
            }]"
        >
          <q-card-section horizontal class="notification-card-section">
            <div class="notification-box-img">
              <q-img :src="notificationIcons[notification.name]" class="notification-img"/>
            </div>
            
            <p class="notification-text">{{ notification.description }}</p>
          </q-card-section>
        </q-card>
      </q-item>
    </q-page>
    <AppFooter />
  </div>
</template>
<script setup="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import AppFooter from 'components/AppFooter.vue';
import carro from '@/assets/CarroPerfil.svg';
import bateria from '@/assets/Bateria.svg';
import alinhamento from '@/assets/Alinhamento.svg';
import oleo from '@/assets/Oleo.svg';

const notifications = [
  {
    id: 1,
    description:
      'Atenção! A vida útil da sua bateria está chegando ao fim, marque sua revisão.',
    name: 'Bateria',
    priority: 'high',
  },
  {
    id: 2,
    description:
      'Atenção! A troca de óleo do seu veiculo esta atrasada. Mantenha seu veículo bem cuidado!',
    name: 'Óleo',
    priority: 'low',
  },
  {
    id: 3,
    description:
      'Atenção! Você trocou os pneus e precisa fazer o seu alinhamento e balanceamento.',
    name: 'Alinhamento',
    priority: 'high',
  },
  {
    id: 4,
    description:
      'Atenção! O prazo para fazer o alinhamento e balanceamento do seu carro expirou.',
    name: 'Alinhamento',
    priority: 'low',
  },
  {
    id: 5,
    description: 'Não se esqueça de atualizar a sua quilometragem!',
    name: 'Alinhamento',
    priority: 'low',
  },
  {
    id: 6,
    description:
      'Está chegando a hora da revisão de fábrica do seu carro! 🚗Programe-se com antecedência para não ser pego de surpresa!',
    name: 'Carro',
    priority: 'high',
  },
];

const notificationIcons = {
  Bateria: bateria,
  Carro: carro,
  Alinhamento: alinhamento,
  Óleo: oleo,
};

// function getNotification() {
//     const notification = api.get('/notification')
//         .then((response) => {
//             notifications.value = response.data;
//         })
//         .catch((error) => {
//             console.error('Erro ao obter notificações:', error);
//         });
// }
</script>

<style scoped>

.notification-page {
  background-color: #f5f5f5;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  min-height: 80px;
  width: 321;
  height: 75;
  gap: 12px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-width: 4px;
  padding-top: 14px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}

.notification-item {
  padding: 0px;
}

.notification-card-section {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 301;
  height: 51;
  gap: 8px;
}

.notification-text {
  color: #2b5e16;
  width: 255;
  height: 51;
  gap: 9px;
}

.notification-card--priority-high {
  border-top: 4px solid red;
  margin: 0 1rem;
}

.notification-card--priority-low {
  border-top: 4px solid green;
  margin: 0 1rem;
}

.notification-icon {
  font-size: 1.5em;
}

.notification-description {
  font-size: 1.5em;
}

.notification-box-img {
  width: 38px;
  height: 38px;
  gap: 10px;
  padding: 5px;
  border-radius: 8px;
  background-color: #eff3f5;
}

.notification-img {
  width: 28px;
  height: 28px;
}

</style>
