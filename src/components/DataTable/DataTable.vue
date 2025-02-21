<template>
  <div class="data-table-wrapper">
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      item-value="ids"
      class="elevation-1 data-table--sm"
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
  </div>
</template>

<script>
export default {
  props: {
    filters: Object
  },
  data() {
    return {
      headers: [
        { title: 'IDS', align: 'start', key: 'ids' },
        { title: 'Дата регистрации', align: 'start', key: 'registrationDate' },
        { title: 'Номер карты', align: 'start', key: 'cardId' },
        { title: 'Пациент', align: 'start', key: 'patient' },
        { title: 'Заказчик', align: 'start', key: 'customer' }
      ],
      items: [
        { ids: '987654', registrationDate: '2022-04-07T09:02', cardId: 54, patient: 'Тёст Тестер 150122', customer: '' },
        { ids: '992261', registrationDate: '2022-07-20T13:25', cardId: 10, patient: 'Тест Тестер Тестович', customer: '' },
        { ids: '123445', registrationDate: '2022-04-26T17:37', cardId: 73, patient: 'Тёст Тестер Тестович', customer: '' },
        { ids: '123446', registrationDate: '2022-04-26T17:57', cardId: 73, patient: 'Тёст Тестер Тестович', customer: '' },
        { ids: '21091704', registrationDate: '2021-09-17T14:09', cardId: 47, patient: 'Медичи Лаврентий (Лаб)', customer: 'Cardiologia' },
        { ids: '151111', registrationDate: '2023-11-02T13:32', cardId: 10, patient: 'Тест Тестер Тестович', customer: 'Cardiologia' },
        { ids: '151110', registrationDate: '2023-11-02T13:23', cardId: 10, patient: 'Тест Тестер Тестович', customer: 'Chirurgia' },
        { ids: '21032301', registrationDate: '2021-03-23T16:49', cardId: 47, patient: 'Медичи Лаврентий (Лаб)', customer: 'Gastroenterologia' },
        { ids: '151113', registrationDate: '2023-11-02T14:21', cardId: 10, patient: 'Тёст Тестер Тестович', customer: 'Gastroenterologia' },
        { ids: '20081001', registrationDate: '2020-08-10T15:05', cardId: 46, patient: 'Роуз Эмили (Лаб)', customer: 'Medicina' },
        { ids: '22050403', registrationDate: '2022-05-04T16:37', cardId: 45, patient: 'Геккель Эрнст (Лаб)', customer: 'Medicina' },
        { ids: '22052503', registrationDate: '2022-05-25T17:15', cardId: 45, patient: 'Геккель Эрнст (Лаб)', customer: 'Medicina' },
        { ids: '22032902', registrationDate: '2022-03-29T16:18', cardId: 45, patient: 'Геккель Эрнст (Лаб)', customer: 'Nefrologia' },
        { ids: '22021401', registrationDate: '2022-02-14T19:16', cardId: 48, patient: 'Марля Анатомий (Лаб)', customer: 'Osp. Fatebenefratelli' },
      ],
      lightColors: ['#FFEB3B', '#C8E6C9', '#FFCDD2', '#9AC7FA'],
    };
  },
  computed: {
    filteredItems() {
      const { dateFrom, dateTo, ids, patientName, customer } = this.filters;

      const startDate = dateFrom ? new Date(dateFrom) : null;
      const endDate = dateTo ? new Date(dateTo) : null;

      const filteredItems = this.items
        .filter(item => this.isItemValid(item, startDate, endDate, ids, patientName, customer))
        .map(item => ({
          ...item,
          registrationDate: this.formatDate(item.registrationDate) // Форматируем дату
        }));

      return filteredItems;
    }
  },
  methods: {
    isItemValid(item, startDate, endDate, ids, patientName, customer) {
      const isValid = (
        this.isDateValid(item.registrationDate, startDate, endDate) &&
        this.isIdsValid(item.ids, ids) &&
        this.isPatientNameValid(item.patient, patientName) &&
        this.isCustomerValid(item.customer, customer)
      );

      return isValid;
    },

    isDateValid(registrationDate, startDate, endDate) {
      const date = new Date(registrationDate);

      const isAfterStartDate = date >= startDate;
      const isStartDateValid = startDate ? isAfterStartDate : true;

      const isBeforeEndDate = date <= endDate;
      const isEndDateValid = endDate ? isBeforeEndDate : true;

      return isStartDateValid && isEndDateValid;
    },

    isIdsValid(itemIds, ids) {
      const isIdMatched = itemIds.includes(ids);
      const isValid = ids ? isIdMatched : true;

      return isValid;
    },

    isPatientNameValid(itemPatient, patientName) {
      const isPatientNameMatch = itemPatient.toLowerCase().includes(patientName.toLowerCase());
      const isValid = patientName ? isPatientNameMatch : true;

      return isValid;
    },

    isCustomerValid(itemCustomer, customer) {
      const isCustomerMatch = itemCustomer === customer;
      const isValid = customer ? isCustomerMatch : true;

      return isValid;
    },

    formatDate(dateString) {
      const date = this.parseDate(dateString);

      if (!date) return '';

      const day = this.formatDayOrMonth(date.getDate());
      const month = this.formatDayOrMonth(date.getMonth() + 1);
      const year = date.getFullYear();
      const hours = this.formatDayOrMonth(date.getHours());
      const minutes = this.formatDayOrMonth(date.getMinutes());

      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

      return formattedDate;
    },

    parseDate(dateString) {
      const date = new Date(dateString);
      const validDate = isNaN(date.getTime()) ? null : date;
      
      return validDate;
    },

    formatDayOrMonth(value) {
      return String(value).padStart(2, '0');
    },

    getRowStyle(index) {
      const isRowHighlighted = index % 3 === 0;

      if (!isRowHighlighted) return {};

      const colorIndex = Math.floor((index / 3) % this.lightColors.length);

      return {
        backgroundColor: this.lightColors[colorIndex]
      };
    },
  }
};
</script>

<style scoped>
.data-table-wrapper {
  width: 100%;
}

@media only screen and (max-width: 756px) {
  .data-table--sm {
    overflow-x: scroll;
  }
}
</style>