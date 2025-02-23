<template>
  <v-container>
    <date-filter @update-filters="updateFilters" />

    <v-row class="data-info">
      <v-col 
        :style="getColumnMaxWidth" 
        class="column-filter__wrapper"
      >
        <column-filters 
          :is-collapsed="isCollapsed"
          @update-filters="updateFilters" 
          @update-collapse="updateCollapse"
        />
      </v-col>

      <v-col class="data-table__col">
        <data-table v-if="hasFilters" :filters="filters" />
        <div
          v-else
          class="table-empty"
        >
          Таблица пустая, примените фильтры для отображения данных.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Vue
import { ref, computed } from 'vue';

// Components
import DateFilter from '@/components/DateFilter/DateFilter.vue';
import ColumnFilters from '@/components/ColumnFilters/ColumnFilters.vue';
import DataTable from '@/components/DataTable/DataTable.vue';

// Composables
import useResponsive from '@/composables/useResponsive';

const { isSmallScreen } = useResponsive();

// Refs and Reactive Variables
const filters = ref({
  dateFrom: null,
  dateTo: null,
  ids: '',
  patientName: '',
  customer: ''
});

const isCollapsed = ref(false);

// Computed properties
const hasFilters = computed(() => {
  const { dateFrom, dateTo, ids, patientName, customer } = filters.value;
  const hasActiveFilters = dateFrom || dateTo || ids || patientName || customer;
  
  return hasActiveFilters;
});

const getColumnMaxWidth = computed(() => {
  if (isCollapsed.value) return isSmallScreen.value ? 'max-width: 100%' : 'max-width: 70px;';

  return isSmallScreen.value ? 'max-width: 100%' : 'max-width: 27%';
});

// Methods
const updateFilters = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters };
};

const updateCollapse = (newState) => {
  isCollapsed.value = newState;
};
</script>

<style scoped>
.column-filter__wrapper {
  transition: max-width .3s;
}

.data-table__col {
  position: relative;
}

@media only screen and (max-width: 960px) {
  .data-info {
    display: flex;
    flex-direction: column;
  }
}
</style>