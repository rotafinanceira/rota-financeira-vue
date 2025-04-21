<template>
    <q-page class="q-pa-md" style="background-color: #F5F5F5;">
        <q-toolbar>
            <q-btn
                flat
                round
                icon="chevron_left" 
                :to="{path: 'home'}" 
            />
            <q-toolbar-title class="toolbar-title">Notificações</q-toolbar-title>
        </q-toolbar>
        
        <q-list bordered separator class="q-mt-md">
            <div class="notification-card">
                <q-item
                    v-for="notification in notifications" :key="notification.id"
                    class="q-mb-md"
                >
                    <q-card
                        :class="{
                            'notification-card--priority-alta': notification.priority === 'alta',
                            'notification-card--priority-baixa': notification.priority === 'baixa'
                        }"
                        class="full-width"
                    >
                        <q-card-section horizontal> 
                            <q-icon
                                class="col-2"
                                :name="notification.icon"
                                size="2.5em"
                                color="primary" 
                            />
                            <q-card-section 
                                class="col-10"
                                style="padding-left: 0px; padding-right: 0px;"
                            >
                                <p>{{ notification.description }}</p>
                            </q-card-section>
                        </q-card-section>
                    </q-card>
                </q-item>
            </div>
        </q-list>
        <AppFooter />
    </q-page>
</template>
<script setup>

import AppFooter from 'components/AppFooter.vue';

const notifications = [
    {
        id: 1,
        description: 'Atenção! A vida útil da sua bateria está chegando ao fim, marque sua revisão.',
        icon: 'train',
        priority: 'alta'
    },
    {
        id: 2,
        description: 'Atenção! A troca de óleo de seu veículo está atrasada. Mantenha seu veículo bem cuidado!',
        icon: 'alarm',
        priority: 'baixa'
    },
    {
        id: 3,
        description: 'Atenção! Você trocou os pneus e precisa fazer o seu alinhamento e balanceamento!',
        icon: 'watch',
        priority: 'alta'
    },
    {
        id: 4,
        description: 'Atenção! O prazo para fazer o alinhamento e balanceamento do seu carro expirou.',
        icon: 'timer',
        priority: 'baixa'
    },
    {
        id: 5,
        description: 'Não se esqueça de atualizar a sua quilometragem!',
        icon: 'devices',
        priority: 'alta'
    },
];

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
.notification-card--priority-alta {
  border-top: 4px solid red;
}

.notification-card--priority-baixa {
  border-top: 4px solid green;
}

p {
  margin: 0;
  font-size: 1.2em;
}

.toolbar-title {
  font-size: 1.5em;
  font-weight: bold;
  color: #2B5E16;
  text-align: center;

}
</style>