<template>
  <div class="data-table-wrapper">
    <v-data-table
      v-if="filteredItems.length > 0"
      :headers="headers"
      :items="filteredItems"
      :items-per-page="-1"
      class="elevation-1 data-table--sm"
      item-value="ids"
      hide-default-footer
    >
      <template v-slot:item="props">
        <tr :style="getRowStyle(props.index)">
          <td>{{ props.item.ids }}</td>
          <td>{{ props.item.registrationDate }}</td>
          <td>{{ props.item.cardId }}</td>
          <td>{{ props.item.patient }}</td>
          <td>{{ props.item.customer }}</td>
        </tr>
      </template>
    </v-data-table>

    <div
      v-else
      class="table-empty"
    >Нет данных для отображения. Примените фильтры.</div>
  </div>
</template>

<script setup>
// Vue
import { computed } from 'vue';

// Constants
import { items } from '@/constants/data';

// Props
const props = defineProps({
  filters: Object,
});

// State
const headers = [
  { title: 'IDS', align: 'start', key: 'ids' },
  { title: 'Дата регистрации', align: 'start', key: 'registrationDate' },
  { title: 'Номер карты', align: 'start', key: 'cardId' },
  { title: 'Пациент', align: 'start', key: 'patient' },
  { title: 'Заказчик', align: 'start', key: 'customer' },
];

const lightColors = ['#FFEB3B', '#C8E6C9', '#FFCDD2', '#9AC7FA'];

// Computed properties
const filteredItems = computed(() => {
  const { dateFrom, dateTo, ids, patientName, customer } = props.filters;

  const startDate = dateFrom ? new Date(dateFrom) : null;
  const endDate = dateTo ? new Date(dateTo) : null;

  const filteredItems = items
    .filter(item => isItemValid(item, startDate, endDate, ids, patientName, customer))
    .map(item => ({
      ...item,
      registrationDate: formatDate(item.registrationDate),
    }));

  return filteredItems;
});

// Methods
const isItemValid = (item, startDate, endDate, ids, patientName, customer) => {
  const isValid = (
    isDateValid(item.registrationDate, startDate, endDate) &&
    isIdsValid(item.ids, ids) &&
    isPatientNameValid(item.patient, patientName) &&
    isCustomerValid(item.customer, customer)
  );

  return isValid;
};

const isDateValid = (registrationDate, startDate, endDate) => {
  const date = new Date(registrationDate);

  const isAfterStartDate = date >= startDate;
  const isStartDateValid = startDate ? isAfterStartDate : true;

  const isBeforeEndDate = date <= endDate;
  const isEndDateValid = endDate ? isBeforeEndDate : true;

  return isStartDateValid && isEndDateValid;
};

const isIdsValid = (itemIds, ids) => {
  const isIdMatched = itemIds.includes(ids);
  const isValid = ids ? isIdMatched : true;

  return isValid;
};

const isPatientNameValid = (itemPatient, patientName) => {
  const isPatientNameMatch = itemPatient.toLowerCase().includes(patientName.toLowerCase());
  const isValid = patientName ? isPatientNameMatch : true;

  return isValid;
};

const isCustomerValid = (itemCustomer, customer) => {
  const isCustomerMatch = itemCustomer === customer;
  const isValid = customer ? isCustomerMatch : true;

  return isValid;
};

const formatDate = (dateString) => {
  const date = parseDate(dateString);

  if (!date) return '';

  const day = formatDayOrMonth(date.getDate());
  const month = formatDayOrMonth(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = formatDayOrMonth(date.getHours());
  const minutes = formatDayOrMonth(date.getMinutes());

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
};

const parseDate = (dateString) => {
  const date = new Date(dateString);
  const validDate = isNaN(date.getTime()) ? null : date;

  return validDate;
};

const formatDayOrMonth = (value) => {
  return String(value).padStart(2, '0');
};

const getRowStyle = (index) => {
  const isRowHighlighted = index % 3 === 0;

  if (!isRowHighlighted) return {};

  const colorIndex = Math.floor((index / 3) % lightColors.length);

  return {
    backgroundColor: lightColors[colorIndex],
  };
};
</script>

<style scoped>
.data-table-wrapper {
  width: 100%;
  height: 90vh;
}

.data-table--sm {
  height: 100%;
  overflow-y: auto;
}

@media only screen and (max-width: 960px) {
  .data-table--sm {
    overflow-x: scroll;
  }
}
</style>