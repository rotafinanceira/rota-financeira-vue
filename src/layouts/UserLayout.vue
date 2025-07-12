<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';


const currentRoute = useRoute();
const routeName = computed(() => {
  return String(currentRoute.name);
});
const isProfileOrVehicle = computed(() => {
  return routeName.value === 'user-profile' || routeName.value ===  'user-vehicle';
});

</script>


<template>
  <div class="app-wrapper">
    <nav class="tabs" v-if='isProfileOrVehicle'>
      <RouterLink
        :to="{ name: 'user-profile' }"
        :class="{ 'is-active': routeName.includes('profile')}"
        class="tab"
      >
        Meu Perfil
      </RouterLink>
      <RouterLink
        :to="{ name: 'user-vehicle' }"
        :class="{ 'is-active': routeName.includes('vehicle')}"
        class="tab"
      >
        Meu Veículo
      </RouterLink>
    </nav>
  </div>
  <RouterView />
</template>

<style scoped lang="scss">
.tabs {
  display: flex;
  gap: .5rem;
  padding: .375rem;
  margin-bottom: 1.5rem;
  background-color: #fff;

  border: 1px solid #e0e5e7;
  border-radius: 8px;
}

.tab {
  display: flex;
  padding: 8px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  font-size: .875rem;
  color: #307714;
  font-weight: 500;

  border-radius: 4px;
}

.is-active {
  background-color: #307714;
  color: #fff;
}
</style>
