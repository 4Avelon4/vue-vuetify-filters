<template>
  <v-row align="center" wrap>
    <v-col cols="12" lg="2" md="12">
      <h3>Дата регистрации</h3>
    </v-col>

    <v-col cols="12" lg="4" md="12">
      <v-text-field
        ref="startDateInput"
        :modelValue="formattedStartDate"
        :append-icon="datePickerIcon"
        :placeholder="'ДД.ММ.ГГГГ'"
        label="С:"
        readonly
        hide-details
        @click:append="toggleDatePicker('start')"
        @blur="onStartDateBlur"
      />
      <v-date-picker
        v-if="showStartDatePicker"
        v-model="startDate"
        :max="endDate"
        :locale="'ru'"
        :style="datepickerPosition"
        v-click-outside="closeDatePicker"
        class="datepicker-dropdown"
        @input="onDateChange"
      />
    </v-col>

    <v-col cols="12" lg="4" md="12">
      <v-text-field
        :modelValue="formattedEndDate"
        :append-icon="datePickerIcon"
        :placeholder="'ДД.ММ.ГГГГ'"
        ref="endDateInput"
        label="По:"
        readonly
        hide-details
        @click:append="toggleDatePicker('end')"
        @blur="onEndDateBlur"
      />
      <v-date-picker
        v-if="showEndDatePicker"
        v-model="endDate"
        :min="startDate"
        :locale="'ru'"
        :style="datepickerPositionEnd"
        v-click-outside="closeDatePicker"
        class="datepicker-dropdown"
        @input="onDateChange"
      />
    </v-col>

    <v-col cols="12" lg="2" md="12" class="button-container">
      <v-btn
        class="filter-submit-btn"
        @click="applyFilters"
      >Выбрать</v-btn>

      <v-btn @click="clearFilters" icon>
        <v-img src="@/assets/eraser.png" width="24" height="24" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      showDatePicker: null,
      datepickerPosition: {},
      datepickerPositionEnd: {},
    };
  },
  computed: {
    formattedStartDate() {
      return this.formatDate(this.startDate);
    },
    formattedEndDate() {
      return this.formatDate(this.endDate);
    },
    datePickerIcon() {
      const datePickerIconClass = this.showDatePicker ? 'mdi-chevron-up' : 'mdi-chevron-down';

      return datePickerIconClass;
    },
    showStartDatePicker() {
      return this.showDatePicker === 'start';
    },
    showEndDatePicker() {
      return this.showDatePicker === 'end';
    }
  },
  methods: {
    formatDate(date) {
      const isValidDate = date instanceof Date;

      if (!isValidDate) return '';

      return date.toLocaleDateString('ru-RU');
    },

    toggleDatePicker(type) {
      if (this.showDatePicker === type) {
        this.showDatePicker = null;

        return;
      }

      this.showDatePicker = type;

      const isStartDatePicker = type === 'start';
      const positionVar = isStartDatePicker ? 'datepickerPosition' : 'datepickerPositionEnd';
      this.setDatePickerPosition(`${type}DateInput`, positionVar);
    },

    setDatePickerPosition(inputRef, positionVar) {
      const inputElement = this.$refs[inputRef];
      const rect = inputElement.getBoundingClientRect();

      this[positionVar] = {
        ...this[positionVar],
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`
      };
    },

    onDateBlur(type) {
      const dateString = this[`${type}DateString`];

      if (!dateString) return;

      const formattedDate = this.formatDateFromInput(dateString);

      if (!formattedDate) return;

      this[`${type}Date`] = formattedDate;
    },

    closeDatePicker() {
      this.showDatePicker = null;
    },

    onStartDateBlur() {
      const newStartDate = this.formatDateFromInput(this.startDateString);

      if (!newStartDate) return;

      this.startDate = newStartDate;
    },

    onEndDateBlur() {
      const newEndDate = this.formatDateFromInput(this.endDateString);

      if (!newEndDate) return;

      this.endDate = newEndDate;
    },

    formatDateFromInput(inputValue) {
      const val = !inputValue || typeof inputValue !== 'string';
      
      if (val) return null;

      const dateParts = inputValue.split('.');

      if (dateParts.length !== 3) return null;

      const [day, month, year] = dateParts.map(num => parseInt(num, 10));

      const formattedDate = new Date(year, month - 1, day);

      return formattedDate;
    },

    onDateChange() {
      this.$emit('update-filters', {
        dateFrom: this.startDate,
        dateTo: this.endDate,
      });
    },

    applyFilters() {
      this.$emit('update-filters', {
        dateFrom: this.startDate,
        dateTo: this.endDate,
      });
    },

    clearFilters() {
      this.startDate = null;
      this.endDate = null;
      
      this.$emit('update-filters', {
        dateFrom: this.startDate,
        dateTo: this.endDate,
      });
    },
  },
};
</script>

<style scoped>
.filter-submit-btn {
  margin-right: 15px;
}

.datepicker-dropdown {
  position: absolute;
  z-index: 1000;

  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}
</style>