<template>
  <section class="vehicle">
    <div class="vehicle__wrapper" v-if="!isEditing">
      <div>
        <h2 class="vehicle__header">Informações do Veículo</h2>
        <div class="vehicle__info">
          <div
            class="vehicle__image"
            :style="{ backgroundImage: `url(${vehicle.photo || picVehicle})` }"
          ></div>
          <div class="vehicle__tag">{{ vehicle.plate }}</div>
          <p class="vehicle__title">{{ vehicle.model }}</p>
          <div class="vehicle__info-data">
            <p>Modelo {{ vehicle.year }}</p>
            <p>{{ vehicle.color }}</p>
          </div>
        </div>
        <h2 class="vehicle__header">Manutenções</h2>
        <div class="maintenances">
          <div class="maintenances__icon__wrapper">
            <svg
              class="maintenances__icon"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_9347_36226)">
                <path
                  d="M16.2058 7.20045C15.9993 6.78436 15.6804 6.4344 15.2853 6.19021C14.8901 5.94602 14.4345 5.81735 13.97 5.81878H6.02999C5.56545 5.81726 5.10978 5.94588 4.71461 6.19008C4.31944 6.43429 4.00058 6.7843 3.79415 7.20045L1.88915 11.0104C1.19611 12.4005 0.834703 13.9322 0.83332 15.4854V18.3188H2.49999V19.9854H6.66665V18.3188H13.3333V19.9854H17.5V18.3188H19.1667V15.4854C19.1649 13.9331 18.8035 12.4022 18.1108 11.0129L16.2058 7.20045ZM5.28915 7.95045C5.35695 7.81154 5.46227 7.69437 5.59319 7.61219C5.72411 7.53002 5.87541 7.48611 6.02999 7.48545H13.97C14.1248 7.48486 14.2768 7.52773 14.4085 7.6092C14.5402 7.69066 14.6464 7.80745 14.715 7.94628L16.5683 11.6521H3.43165L5.28915 7.95045ZM17.5 16.6521H2.49999V15.4854C2.50028 14.7537 2.59695 14.0252 2.78749 13.3188H4.16665V14.1521C4.16665 14.3731 4.25445 14.5851 4.41073 14.7414C4.56701 14.8977 4.77897 14.9854 4.99999 14.9854C5.221 14.9854 5.43296 14.8977 5.58924 14.7414C5.74552 14.5851 5.83332 14.3731 5.83332 14.1521V13.3188H14.1667V14.1521C14.1667 14.3731 14.2545 14.5851 14.4107 14.7414C14.567 14.8977 14.779 14.9854 15 14.9854C15.221 14.9854 15.433 14.8977 15.5892 14.7414C15.7455 14.5851 15.8333 14.3731 15.8333 14.1521V13.3188H17.2125C17.403 14.0252 17.4997 14.7537 17.5 15.4854V16.6521ZM17.5 3.31878H19.8467C19.669 3.79952 19.3484 4.21429 18.9278 4.50724C18.5073 4.80018 18.0071 4.95722 17.4946 4.95722C16.9821 4.95722 16.4819 4.80018 16.0613 4.50724C15.6408 4.21429 15.3201 3.79952 15.1425 3.31878H4.85749C4.67986 3.79952 4.35919 4.21429 3.93865 4.50724C3.51811 4.80018 3.01791 4.95722 2.5054 4.95722C1.99289 4.95722 1.49269 4.80018 1.07216 4.50724C0.65162 4.21429 0.330947 3.79952 0.15332 3.31878H2.49999V1.65211H0.15332C0.330947 1.17137 0.65162 0.756601 1.07216 0.463659C1.49269 0.170717 1.99289 0.0136719 2.5054 0.0136719C3.01791 0.0136719 3.51811 0.170717 3.93865 0.463659C4.35919 0.756601 4.67986 1.17137 4.85749 1.65211H15.1425C15.3201 1.17137 15.6408 0.756601 16.0613 0.463659C16.4819 0.170717 16.9821 0.0136719 17.4946 0.0136719C18.0071 0.0136719 18.5073 0.170717 18.9278 0.463659C19.3484 0.756601 19.669 1.17137 19.8467 1.65211H17.5V3.31878Z"
                  fill="#5B6871"
                />
              </g>
              <defs>
                <clipPath id="clip0_9347_36226">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p class="maintenances__text">
            {{ maintenanceCount }} {{ maintenanceText }}
          </p>
        </div>
      </div>

      <button class="vehicle__button" @click="isEditing = true">
        Editar veículo
      </button>
    </div>

    <div v-else>
      <div class="edit-card">
        <div class="edit-info">
          <h2 class="vehicle__header">Informações do Veículo</h2>
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
                @click="navigateTo('/vehicle/edit-color')"
                class="full-width-button"
              >
                <span>Cor</span>
                <img src="@/assets/arrowR.svg" alt="Arrow Right" class="icon" />
              </button>
            </div>
          </div>
        </div>
        <div class="edit-account">
          <div class="flex-between vehicle__header">
            <h2 class="vehicle__header">Manutenções Cadastradas</h2>
            <p>{{ maintenanceCount }}<span class="total">/10</span></p>
          </div>
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
        <h2 class="vehicle__header">Notificações</h2>
        <div class="notificacao-revisao">
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
          class="vehicle__button register"
          @click="navigateTo('/vehicle/add-maintenance')"
        >
          Cadastrar Manutenções
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import picVehicle from '@/assets/picVehicle.svg';
import CustomToggle from '@/components/CustomToggle.vue';

interface Vehicle {
  model: string;
  plate: string;
  year: number;
  color: string;
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
const maintenanceText = computed(() =>
  maintenanceCount.value === 1
    ? 'manutenção cadastrada'
    : 'manutenções cadastradas'
);
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

<style scoped lang="scss">
$header-margin: 1.5rem 0 0.5rem;

.vehicle {
  font-family: 'Inter';
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  background-color: var(--Cores-Cinza-Branco, #ffffff);

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100svh - 72px - 93px - 49px);
  }

  &__header {
    color: #0c0d0f;
    font-size: 0.875rem;
    line-height: 120%;
    margin: $header-margin;
    font-weight: 500;
  }

  &__info {
    display: flex;
    padding: 16px;
    gap: 0.725rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 4px;
    border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
    background: var(--Cores-Cinza-Branco, #fff);
  }

  &__image {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    background: lightgray 50% / cover no-repeat;
  }

  &__tag {
    padding: 0.25rem 0.725rem;
    border-radius: 99px;
    background: #d3f0ff;
    color: #1450b7;
    font-size: var(--Tipo-Tamanho-Xs, 12px);
    font-style: normal;
    font-weight: 500;
    line-height: 120%;
  }

  &__title {
    color: var(--Cores-Cinza-900, #0c0d0f);
    text-align: center;
    font-size: var(--Tipo-Tamanho-Lg, 18px);
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
  }

  &__info-data {
    display: flex;
    flex-direction: column;
    place-items: center;
    color: #76828b;
  }
}

.maintenances {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.725rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid var(--Cores-Cinza-100, #e0e5e7);
  background: var(--Cores-Cinza-Branco, #fff);

  &__info {
    color: var(--Cores-Cinza-700, #3c4349);
    font-size: var(--Tipo-Tamanho-Sm, 14px);
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    text-align: center;
  }

  &__icon {
    --size: 20px;

    width: var(--size);
    height: var(--size);

    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eff3f5;
      padding: 0.625rem;
      border-radius: 8px;
    }
  }

  &__text {
    font-size: 1rem;
    font-weight: 500;
    color: #2b5e16;
  }
}

.vehicle__button {
  display: flex;
  width: 100%;
  padding: 0.75rem;
  margin: 1.5rem 0;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  background: #8ce95f;
  color: #2b5e16;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 120%;
  cursor: pointer;

  &.register {
    margin-top: 1.5rem;
  }
}

.flex-between {
  display: flex;
  justify-content: space-between;
  margin: $header-margin;

  > h2 {
    margin: 0;
  }

  .total {
    color: #76828b;
  }
}

.edit-account h4 {
  color: var(--Cores-Cinza-900, #0c0d0f);
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
  font-size: var(--Tipo-Tamanho-Lg, 18px);
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  cursor: pointer;
}

.edit-info h4 {
  color: var(--Cores-Cinza-900, #0c0d0f);
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
