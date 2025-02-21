<template>
  <v-container>
    <date-filter @update-filters="updateFilters" />

    <v-row>
      <v-col cols="12" md="3">
        <column-filters @update-filters="updateFilters" />
      </v-col>

      <v-col cols="12" md="9">
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
      }
    };
  },
  methods: {
    updateFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
    }
  }
};
</script>
