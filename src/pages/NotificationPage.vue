<template>
    <div>
        <AppHeader title="Notificações" path="/home" />
        <q-page class="q-pa-md notification-page">
            <q-item v-for="notification in notifications" :key="notification.id" >
                <q-card 
                    :class="{
                        'notification-card--priority-alta': notification.priority === 'alta', 
                        'notification-card--priority-baixa': notification.priority === 'baixa' 
                        }"
                    >
                    <q-card-section horizontal class="notification-card-section">
                        <div class="notification-img">
                            <q-img :src="getNotificationIcon(notification.name)" alt="Notification Icon" />
                        </div>
                        <q-card-section>
                            <span class="notification-letter">{{ notification.description }}</span>
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </q-item>
        </q-page>
        <AppFooter />
    </div>
</template>
<script setup="ts">

import AppHeader from 'components/HeaderBarNotification.vue';
import AppFooter from 'components/AppFooter.vue';
import carro from '@/assets/CarroPerfil.svg';
import bateria from '@/assets/Bateria.svg';
import alinhamento from '@/assets/Alinhamento.svg';
import oleo from '@/assets/Oleo.svg';

const notifications = [
    {
        id: 1,
        description: 'Atenção! A vida útil da sua bateria está chegando ao fim, marque sua revisão.',
        name: 'Bateria',
        priority: 'alta'
    },
    {
        id: 2,
        description: 'Atenção! A troca de óleo do seu veiculo esta atrasada. Mantenha seu veículo bem cuidado!',
        name: 'Óleo',
        priority: 'baixa'
    },
    {
        id: 3,
        description: 'Atenção! Você trocou os pneus e precisa fazer o seu alinhamento e balanceamento.',
        name: 'Alinhamento',
        priority: 'alta'
    },    
    {
        id: 4,
        description: 'Atenção! O prazo para fazer o alinhamento e balanceamento do seu carro expirou.',
        name: 'Alinhamento',
        priority: 'baixa'
    },
    {
        id: 5,
        description: 'Não se esqueça de atualizar a sua quilometragem!',
        name: 'Alinhamento',
        priority: 'baixa'
    },
    {
        id: 6,
        description: 'Está chegando a hora da revisão de fábrica do seu carro! 🚗Programe-se com antecedência para não ser pego de surpresa!',
        name: 'Carro',
        priority: 'alta'
    },
];


const notificationIcons = {    
    'Bateria': bateria,
    'Carro': carro,
    'Alinhamento': alinhamento,
    'Óleo': oleo,
};

function getNotificationIcon(name) {
    return notificationIcons[name] || null;
}


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
    background-color: #F5F5F5;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    min-height: 80px; /* Ajuste este valor conforme necessário */
    min-width: 100%; /* Para que todos os cards ocupem a largura total do q-item */
}

.notification-letter {
    color: var(--Botes-Preenchidos-Ativado-Texto, #2b5e16);
}

.notification-card--priority-alta {
    border-top: 4px solid red;
}

.notification-card--priority-baixa {
    border-top: 4px solid green;
}

.notification-icon {    
    font-size: 1.5em;
}

.notification-card-section {
    display: flex; 
    align-items: center;
}

.notification-description {    
    font-size: 1.5em;
}

.notification-img {
    width: 28px;
    height: 28px;
    margin-left: 10px;
    background-color: #EFF3F5;
}

</style>