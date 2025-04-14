<template>
  <section class="veiculo-content">
    <div v-if="!isEditing">
      <div class="notificacoes-header">Informações do Veículo</div>

      <div class="info-veiculo">
        <div class="foto-veiculo">
          <div
            class="foto"
            :style="{ backgroundImage: `url(${vehicle.photo || picVehicle})` }"
          ></div>
        </div>
        <div class="dados-veiculo">
          <div class="ano">{{ vehicle.year }} ano</div>
          <h2 class="modelo">{{ vehicle.model }}</h2>
          <p class="contact-info">Placa: {{ vehicle.plate }}</p>
        </div>
      </div>

      <div class="notificacoes-header">Manutenções</div>

      <div class="manutencoes">
        <p class="manutencoes-info">
          Número de manutenções cadastradas:
          <strong>{{ maintenanceCount }}</strong>
        </p>
      </div>

      <button class="btn-editar" @click="isEditing = true">
        Editar veículo
      </button>
    </div>

    <div v-else>
      <div class="edit-card">
        <div class="edit-info">
          <h4>Informações do Veículo</h4>
          <div class="vehicle-info-buttons">
            <div class="horizontal-layout">
              <button
                @click="navigateTo('/vehicle/edit-model')"
                class="full-width-button"
              >
                <span>Modelo</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
            <div class="horizontal-layout">
              <button
                @click="navigateTo('/vehicle/edit-plate')"
                class="full-width-button"
              >
                <span>Placa</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
            <div class="horizontal-layout">
              <button
                @click="navigateTo('/vehicle/edit-year')"
                class="full-width-button"
              >
                <span>Ano</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
          </div>
        </div>
        <div class="edit-account">
          <h4>Manutenções Cadastradas</h4>
          <div class="manutencoes-list">
            <div
              v-for="maintenance in maintenances"
              :key="maintenance.id"
              class="manutencao-item"
            >
              <p>{{ maintenance.description }}</p>
            </div>
          </div>
        </div>
        <div class="notificacao-revisao">
          <h4>Notificações</h4>
          <div class="notificacoes">
            <label class="switch-label">
              <span>Habilitar notificações sobre revisão do meu veículo</span>
              <CustomToggle
                v-model="localMaintenanceNotificationsEnabled"
                @update:model-value="updateMaintenanceNotifications"
              />
            </label>
          </div>
        </div>
        <button
          class="btn-cadastrar"
          @click="navigateTo('/vehicle/add-maintenance')"
        >
          Cadastrar Manutenções
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import picVehicle from '@/assets/picVehicle.svg';
import CustomToggle from '@/components/CustomToggle.vue';

interface Vehicle {
  model: string;
  plate: string;
  year: number;
  photo: string;
}

interface Maintenance {
  id: number;
  description: string;
  date: string;
  cost: number;
}

const props = defineProps<{
  vehicle: Vehicle;
  maintenanceNotificationsEnabled: boolean;
}>();

const router = useRouter();
const isEditing = ref(false);
const localMaintenanceNotificationsEnabled = ref(
  props.maintenanceNotificationsEnabled
);

const maintenanceCount = ref(5); // Número de manutenções cadastradas (exemplo)

const maintenances = ref<Maintenance[]>([
  { id: 1, description: 'Troca de óleo', date: '2023-09-01', cost: 150 },
  {
    id: 2,
    description: 'Alinhamento e balanceamento',
    date: '2023-08-15',
    cost: 200,
  },
  {
    id: 3,
    description: 'Substituição de pastilhas de freio',
    date: '2023-07-20',
    cost: 300,
  },
]);

watch(
  () => props.maintenanceNotificationsEnabled,
  (newVal) => {
    localMaintenanceNotificationsEnabled.value = newVal;
  }
);


function navigateTo(path: string) {
  router.push(path);
}

function updateMaintenanceNotifications(value: boolean) {
  console.log('Notificações de revisão:', value);
}
</script>

<style scoped>
.veiculo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: var(--Cores-Cinza-Branco, #ffffff);
}

.info-veiculo {
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

.foto-veiculo {
  margin-bottom: 12px;
}

.foto {
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background: lightgray 50% / cover no-repeat;
}

.dados-veiculo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ano {
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

.modelo {
  color: var(--Cores-Cinza-900, #0c0d0f);
  text-align: center;
  font-family: var(--Tipo-Familia-Button, Inter);
  font-size: var(--Tipo-Tamanho-Lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 12px;
}

.contact-info {
  color: var(--Cores-Cinza-400, #76828b);
  width: 288px;
  height: 21px;
  margin-bottom: 4px;
  text-align: center;
}

.manutencoes {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);
}

.manutencoes-info {
  color: var(--Cores-Cinza-700, #3c4349);
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  text-align: center;
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

.edit-account h4 {
  color: var(--Cores-Cinza-900, #0c0d0f);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-align: left;
  width: 100%;
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

.btn-cadastrar {
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

.edit-info h4 {
  color: var(--Cores-Cinza-900, #0c0d0f);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  text-align: left;
  width: 100%;
}

.vehicle-info-buttons {
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

.full-width-button {
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  background: none;
  border: none;
  padding: 0;
  color: var(--Cores-Cinza-700, #3c4349);
  font-family: var (--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  cursor: pointer;
  width: 100%;
}

.full-width-button .icon {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 0;
}

.manutencoes-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);
}

.manutencao-item {
  padding: 8px;
  border-radius: 4px;
  background: var(--Cores-Cinza-Branco, #fff);
}

.manutencao-item p {
  margin: 0;
  color: var(--Cores-Cinza-700, #3c4349);
  font-family: var(--Tipo-Familia-Paragrafh, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}

.notificacao-revisao {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);
  margin-bottom: 16px;
}

.notificacao-revisao h4 {
  color: var(--Cores-Cinza-900, #0c0d0f);
  font-family: var(--Tipo-Familia-Tag, Inter);
  font-size: var(--Tipo-Tamanho-Sm, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  margin-bottom: 8px;
}

.notificacoes {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  width: 100%;
}

.switch-label span {
  flex: 1;
}

.switch-label CustomToggle {
  flex-shrink: 0;
}
</style>
