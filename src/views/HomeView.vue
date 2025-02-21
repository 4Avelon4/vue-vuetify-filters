<template>
  <v-container>
    <date-filter @update-filters="updateFilters" />

    <v-row class="data-info">
      <v-col 
        :style="getColumnMaxWidth()" 
        class="column-filter__wrapper"
      >
        <column-filters 
          :is-collapsed="isCollapsed"
          @update-filters="updateFilters" 
          @update-collapse="updateCollapse"
        />
      </v-col>

      <v-col>
        <data-table :filters="filters" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateFilter from '@/components/DateFilter/DateFilter.vue';
import ColumnFilters from '@/components/ColumnFilters/ColumnFilters.vue';
import DataTable from '@/components/DataTable/DataTable.vue';

export default {
  components: {
    DateFilter,
    ColumnFilters,
    DataTable
  },
  data() {
    return {
      filters: {
        dateFrom: null,
        dateTo: null,
        ids: '',
        patientName: '',
        customer: ''
      },
      isCollapsed: false,
      isSmallScreen: false
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  unmounted() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    getColumnMaxWidth() {
      if (this.isCollapsed) return 'max-width: 70px;';

      const maxWidth = this.isSmallScreen ? 'max-width: 100%;' : 'max-width: 30%;';

      return maxWidth;
    },
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
    },
    updateCollapse(newState) {
      this.isCollapsed = newState;
    },
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth <= 960;
    }
  }
};
</script>

<style scoped>
.column-filter__wrapper {
  transition: max-width 0.7s;
}

@media only screen and (max-width: 960px) {
  .data-info {
    flex-direction: column;
  }

  .column-filter__wrapper {
    transition: none;
  }
}
</style>