<template>
  <section class="perfil-content">
    <div v-if="!isEditing">
      <div class="notificacoes-header">Informações Pessoais</div>

      <div class="info-pessoais">
        <div class="foto-perfil">
          <div
            class="foto"
            :style="{ backgroundImage: `url(${user.photo || picProfile})` }"
          ></div>
        </div>
        <div class="dados-perfil">
          <div class="idade">{{ user.age }} anos</div>
          <h2 class="nome">{{ user.name }}</h2>
          <p class="contact-info">{{ user.email }}</p>
          <p class="contact-info">{{ user.phone }}</p>
        </div>
      </div>

      <div class="notificacoes-header">Notificações</div>

      <div class="notificacoes">
        <label class="switch-label">
          <span>Receber notificações por e-mail</span>
          <CustomToggle
            v-model="localEmailNotificationsEnabled"
            @update:model-value="updateEmailNotifications"
          />
        </label>
        <label class="switch-label">
          <span>Receber notificações no celular</span>
          <CustomToggle
            v-model="localPhoneNotificationsEnabled"
            @update:model-value="updatePhoneNotifications"
          />
        </label>
      </div>

      <button class="btn-editar" @click="isEditing = true">
        Editar perfil
      </button>
    </div>

    <div v-else>
      <div class="edit-card">
        <div class="foto-perfil">
          <div
            class="foto"
            :style="{ backgroundImage: `url(${user.photo || picProfile})` }"
          ></div>
        </div>
        <button @click="mudarFoto" class="mudar-foto">Mudar Foto</button>
        <div class="edit-info">
          <h4>Informações Pessoais</h4>
          <div class="personal-info-buttons">
            <div class="horizontal-layout">
              <button
                @click="navigateTo('/profile/edit-name')"
                class="full-width-button"
              >
                <span>Nome completo</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
            <div class="horizontal-layout">
              <button
                @click="navigateTo('/profile/edit-birthdate')"
                class="full-width-button"
              >
                <span>Data de nascimento</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
          </div>
        </div>
        <div class="edit-account">
          <h4>Conta</h4>
          <div class="account-info-buttons">
            <div class="horizontal-layout">
              <button
                @click="navigateTo('/profile/edit-email')"
                class="full-width-button"
              >
                <span>E-mail</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
            <div class="horizontal-layout">
              <button
                @click="navigateTo('/profile/edit-password')"
                class="full-width-button"
              >
                <span>Senha</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
            <div class="horizontal-layout">
              <button
                @click="excluirConta"
                class="full-width-button excluir-conta"
              >
                <span>Excluir Conta</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import picProfile from '@/assets/picProfile.svg';
import CustomToggle from '@/components/CustomToggle.vue';

interface User {
  name: string;
  email: string;
  phone: string;
  age: number;
  photo: string;
}

const props = defineProps<{
  user: User;
  emailNotificationsEnabled: boolean;
  phoneNotificationsEnabled: boolean;
}>();

const emit = defineEmits([
  'update:emailNotificationsEnabled',
  'update:phoneNotificationsEnabled',
  'editarPerfil',
]);

const router = useRouter();
const isEditing = ref(false);
const localEmailNotificationsEnabled = ref(props.emailNotificationsEnabled);
const localPhoneNotificationsEnabled = ref(props.phoneNotificationsEnabled);

watch(
  () => props.emailNotificationsEnabled,
  (newVal) => {
    localEmailNotificationsEnabled.value = newVal;
  }
);

watch(
  () => props.phoneNotificationsEnabled,
  (newVal) => {
    localPhoneNotificationsEnabled.value = newVal;
  }
);

function updateEmailNotifications(value: boolean) {
  emit('update:emailNotificationsEnabled', value);
}

function updatePhoneNotifications(value: boolean) {
  emit('update:phoneNotificationsEnabled', value);
}

function mudarFoto() {
  console.log('Mudar Foto');
}

function excluirConta() {
  console.log('Excluir Conta');
}

function navigateTo(path: string) {
  router.push(path);
}
</script>

<style scoped>
.perfil-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: var(--Cores-Cinza-Branco, #ffffff);
}

.card,
.edit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.info-pessoais {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);
}

.foto-perfil {
  margin-bottom: 12px;
}

.foto {
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background: lightgray 50% / cover no-repeat;
}

.dados-perfil,
.edit-info,
.edit-account {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.idade {
  display: flex;
  width: 80px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 54px;
  background: var(--Cores-Informao-50, #d3f0ff);
  color: var(--Cores-Informao-600, #1450b7);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Xs, 12px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin-bottom: 12px;
}

.nome {
  color: var(--Cores-Cinza-900, #0c0d0f);
  text-align: center;
  font-family: var(--Tipo-Familia-Button, Inter);
  font-size: var(--Tipo-Tamanho-Lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  flex: 1 0 0;
  margin-bottom: 12px;
}

.contact-info {
  color: var(--Cores-Cinza-400, #76828b);
  width: 288px;
  height: 21px;
  margin-bottom: 4px;
  text-align: center;
}

.notificacoes-header {
  color: var(--Cores-Cinza-900, #0c0d0f);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  flex: 1 0 0;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
}

.notificacoes {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 46px;
  border-radius: 4px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);
}

.switch-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--Cores-Cinza-700, #3c4349);
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  flex: 1 0 0;
  gap: 16px;
}

.toggle-icon {
  width: 24px;
  height: 24px;
}

.btn-editar {
  display: flex;
  width: 320px;
  height: 48px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid #8ce95f;
  background: #8ce95f;
  color: var(--Botes-Preenchidos-Ativado-Texto, #2b5e16);
  font-family: var(--Tipo-Familia-Button, Inter);
  font-size: var(--Tipo-Tamanho-Lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  cursor: pointer;
}

.btn-cancelar {
  margin: 1rem;
  padding: 0.75rem 1rem;
  background-color: #f44336;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.mudar-foto {
  display: flex;
  height: 40px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  color: var(--Botes-Preenchidos-Ativado-Texto, #2b5e16);
  font-family: var(--Tipo-Familia-Button, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  background-color: var(
    --Cores-Cinza-Branco,
    #ffffff
  ); /* Match page background */
  border: none;
  border-radius: 4px;
}

.edit-info h4 {
  width: 320px;
  height: 17px;
  color: var(--Cores-Cinza-900, #0c0d0f);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
}

.edit-account h4 {
  color: var(--Cores-Cinza-900, #0c0d0f);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  text-align: left; /* Align to the left */
  width: 100%; /* Ensure it spans the full width */
}

.personal-info-buttons {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);
}

.account-info-buttons {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);
}

.horizontal-layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
}

.horizontal-layout span {
  flex: 1;
}

.horizontal-layout button {
  flex: 0;
}

.horizontal-layout .icon {
  position: absolute;
  right: 0;
  width: 16px;
  height: 16px;
}

.personal-info-buttons button:nth-child(2) {
  flex: 1 0 0;
  color: var(--Cores-Cinza-700, #3c4349);
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.personal-info-buttons .icon {
  margin-left: auto;
}

.full-width-button {
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  background: none;
  border: none;
  padding: 0;
  color: var(--Cores-Cinza-700, #3c4349);
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  cursor: pointer;
  width: 288px;
  height: 21px;
  white-space: nowrap;
}

.full-width-button .icon {
  width: 16px;
  height: 16px;
}

.full-width-button.excluir-conta {
  color: var(--Cores-Error-600, #b72a3e);
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}

.account-buttons-container {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
}
</style>
