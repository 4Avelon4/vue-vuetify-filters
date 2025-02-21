<template>
  <v-col>
    <v-row class="filter-header" align="center">
      <span v-if="!isCollapsed" class="filter-title">Фильтры</span>

      <div class="filter-field">
        <v-btn
          v-if="!isCollapsed"  
          class="filter-clear"
          icon
          @click="clearFilters"
        >
          <v-img src="@/assets/eraser.png" width="24" height="24" />
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
            @input="applyFilters"
          />

          <v-text-field
            v-model="patientName"
            label="Фамилия пациента"
            class="filter-field"
            @input="applyFilters"
          />

          <v-select
            v-model="customer"
            label="Заказчик"
            :items="customerItems"
            class="filter-field"
            @update:modelValue="applyFilters"
          />
        </div>
      </v-row>
    </v-expand-transition>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      ids: '',
      patientName: '',
      customer: 'Все',
      isCollapsed: false,
      customers: [
        'Cardiologia',
        'Chirurgia',
        'Gastroenterologia',
        'Medicina',
        'Nefrologia',
        'Osp. Fatebenefratelli'
      ]
    };
  },
  computed: {
    customerItems() {
      const allCustomers = ['Все', ...this.customers];
      return allCustomers;
    },

    filterToggleIcon() {
      return this.isCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left';
    },

    filters() {
      const isCustomerAllSelected = this.customer === 'Все';
      const customerFilter = !isCustomerAllSelected ? this.customer : null;

      return {
        ids: this.ids,
        patientName: this.patientName,
        customer: customerFilter,
      };
    }
  },
  methods: {
    applyFilters() {
      this.$emit('update-filters', this.filters);
    },

    clearFilters() {
      this.ids = '';
      this.patientName = '';
      this.customer = 'Все';
      this.applyFilters();
    },

    toggleFilters() {
      this.isCollapsed = !this.isCollapsed;
      this.$emit('update-collapse', this.isCollapsed);
    }
  }
};
</script>

<style scoped>
.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.filter-title {
  margin-left: 10px;
  font-weight: bold;
}

.filter-clear {
  margin-right: 15px;
}

</style>