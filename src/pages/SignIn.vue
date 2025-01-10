<template>
  <q-page padding>
    <div class="container">
      <div class="logo-container">
        <q-img :src="logo" class="logo" />
      </div>
      <div class="container-content">
        <div class="title">Olá, entre com e-mail e senha</div>
        <div class="form">
          <div class="inputs-wrapper">
            <div>
              <InputEmail v-model="email" :errors="errors" label="E-mail" />
              <div class="error" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <div>
              <InputPassword v-model="password" :errors="errors" />
              <div class="error" v-if="errors.password">
                {{ errors.password }}
              </div>
            </div>
          </div>
          <ButtonComponent
            label="Entrar"
            :isLoading="isLoading"
            @click="handleSubmit"
          />
          <SignInUpFooter
            message="Não possui cadastro?"
            buttonText="Cadastrar"
            :path="'/register-1'"
          />
        </div>

        <div class="maintenance-dropdown">
          <q-select
            filled
            v-model="selectedMaintenance"
            :options="maintenanceOptions"
            label="Selecione uma manutenção"
          ></q-select>
          <q-btn
            label="Ir para Manutenção"
            color="primary"
            @click="navigateToMaintenance"
            :disable="!selectedMaintenance"
          ></q-btn>
        </div>
      </div>
    </div>
    <ModalGenericoAlert
      :title="modalContent"
      :open="isOpen"
      :description="modalDescription"
      :text-button="'Fechar'"
    />
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import InputPassword from '@/components/InputPassword.vue';
import InputEmail from '@/components/InputEmail.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ModalGenericoAlert from '@/components/ModalGenericoAlert.vue';
import SignInUpFooter from '@/components/SignInUpFooter.vue';
import logo from '@/assets/logolight.svg';
import { httpClient } from '@/infra/http/httpClient';

const isLoading = ref(false);
const isValidatingForm = ref(false);

const modalContent = ref('');
const modalDescription = ref('');
const isOpen = ref(false);
const isValid = ref(true);

const email = ref('');
const password = ref('');
const errors = ref({});

const selectedMaintenance = ref(null);
const maintenanceOptions = ref([
  { label: 'Manutenção de Óleo', value: '/oil-maintenance' },
  { label: 'Manutenção de Bateria', value: '/battery-maintenance' },
  {
    label: 'Manutenção de Filtro de Combustível',
    value: '/fuel-filter-maintenance',
  },
  { label: 'Alinhamento e Balanceamento', value: '/alignment-balancing' },
  {
    label: 'Manutenção de Filtro de Ar-Condicionado',
    value: '/air-conditioner-filter-maintenance',
  },
  {
    label: 'Registrar Veiculo',
    value: '/registration-vehicle'
  },
  {
    label:'Histórico de manutenção',
    value: '/maintenance-history',
  }
]);

const router = useRouter();

const resetModal = () => {
  modalContent.value = '';
  modalDescription.value = '';
  isOpen.value = false;
};

const validateForm = () => {
  isValidatingForm.value = true;
  errors.value = {};
  isValid.value = true;

  if (!email.value) {
    errors.value.email = 'Campo obrigatório';
    isValid.value = false;
  } else if (
    email.value.length < 3 ||
    email.value.length > 50 ||
    !/\S+@\S+\.\S+/.test(email.value)
  ) {
    errors.value.email = 'E-mail inválido';
    isValid.value = false;
  }

  if (!password.value) {
    errors.value.password = 'Campo obrigatório';
    isValid.value = false;
  } else if (password.value.length < 3 || password.value.length > 15) {
    errors.value.password = 'Senha inválida';
    isValid.value = false;
  }
};

watch([email, password], () => {
  if (!isValidatingForm.value) return;
  validateForm();
});

const handleSubmit = async () => {
  resetModal();
  validateForm();

  if (!isValid.value) return;

  try {
    isLoading.value = true;
    const response = await httpClient.post('/login', {
      email: email.value,
      password: password.value,
    });
    if (response.status === 200) {
      router.push({ path: '/success' });
    }
  } catch (error) {
    handleApiError(error.response?.status);
  } finally {
    isLoading.value = false;
  }
};

const handleApiError = (statusCode) => {
  if (statusCode === 403) {
    isOpen.value = true;
    modalContent.value = 'E-mail e/ou senha incorretos';
    modalDescription.value = 'Verifique os dados informados';
  } else if (statusCode === 404) {
    isOpen.value = true;
    modalContent.value = 'E-mail não cadastrado';
    modalDescription.value = 'Faça o cadastro no App';
  } else {
    isOpen.value = true;
    modalContent.value = 'Ocorreu um erro ao tentar fazer login';
    modalDescription.value = 'Tente novamente mais tarde';
  }
};

const navigateToMaintenance = () => {
  console.log('Selecionado:', selectedMaintenance.value); // Para depuração
  if (selectedMaintenance.value) {
    router.push(selectedMaintenance.value.value); // Passando o valor da rota
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 96px;
  padding: 0 20px;
  margin-top: 24px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 230px;
}

.container-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.title {
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  padding: 0px 10px;
  color: #314b39;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.inputs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

.error {
  color: #b00020;
  font-size: 14px;
  margin-top: 5px;
  line-height: 21px;
}

.maintenance-dropdown {
  margin-top: 32px; /* Adicione um espaçamento entre a form e o dropdown */
}
</style>
