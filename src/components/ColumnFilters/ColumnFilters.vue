<template>
  <v-col>
    <v-row class="filter-header" align="center">
      <span v-if="!isCollapsed" class="filter-title">Фильтры</span>

      <div class="filter-control">
        <v-btn
          v-if="!isCollapsed"  
          class="filter-clear"
          icon
          @click="clearFilters"
        >
          <v-img src="@/assets/image/eraser.png" width="24" height="24" />
        </v-btn>

        <v-btn
          icon
          @click="toggleFilters"
        >
          <v-icon>{{ filterToggleIcon }}</v-icon>
        </v-btn>
      </div>
    </v-row>

    <v-expand-transition>
      <v-row v-show="!isCollapsed">
        <div class="filter-info">
          <v-text-field
            v-model="ids"
            label="IDS"
            class="filter-field"
            @input="updateFilters"
          />

          <v-text-field
            v-model="patientName"
            label="Фамилия пациента"
            class="filter-field"
            @input="updateFilters"
          />

          <v-select
            v-model="customer"
            label="Заказчик"
            :items="customerItems"
            class="filter-field"
            @update:modelValue="updateFilters"
          />
        </div>
      </v-row>
    </v-expand-transition>
  </v-col>
</template>

<script setup>
// Vue
import { ref, computed } from 'vue';

// Composable
import useResponsive from '@/composables/useResponsive';

// Emits
const emit = defineEmits(['update-filters', 'update-collapse']);

const { isSmallScreen } = useResponsive();

// Refs and Reactive Variables
const ids = ref('');
const patientName = ref('');
const customer = ref('Все');
const isCollapsed = ref(false);

const customers = [
  'Cardiologia',
  'Chirurgia',
  'Gastroenterologia',
  'Medicina',
  'Nefrologia',
  'Osp. Fatebenefratelli'
];

// Computed properties
const customerItems = computed(() => {
  const allCustomers = ['Все', ...customers];

  return allCustomers;
});

const filterToggleIcon = computed(() => {
  if (isSmallScreen.value) return isCollapsed.value ? 'mdi-chevron-up' : 'mdi-chevron-down';

  return isCollapsed.value ? 'mdi-chevron-right' : 'mdi-chevron-left';
});

const filters = computed(() => {
  const isCustomerAllSelected = customer.value === 'Все';
  const customerFilter = !isCustomerAllSelected ? customer.value : null;

  return {
    ids: ids.value,
    patientName: patientName.value,
    customer: customerFilter,
  };
});

// Methods
const updateFilters = () => {
  emit('update-filters', filters.value);
};

const clearFilters = () => {
  ids.value = '';
  patientName.value = '';
  customer.value = 'Все';

  updateFilters();
};

const toggleFilters = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update-collapse', isCollapsed.value);
};
</script>

<style scoped>
.filter-header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-control {
  display: flex;
  flex-wrap: nowrap;

  @media only screen and (max-width: 960px) {
    margin-left: auto;
  }
}

.filter-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.filter-title {
  margin-left: 10px;
  margin-right: 20px;

  font-weight: bold;
}

.filter-clear {
  margin-right: 15px;
}

</style>