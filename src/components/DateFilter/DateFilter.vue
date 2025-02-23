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
        @click="updateFilters"
      >Выбрать</v-btn>

      <v-btn @click="clearFilters" icon>
        <v-img src="@/assets/image/eraser.png" width="24" height="24" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
// Vue
import { ref, computed, nextTick } from 'vue';

// Emits
const emit = defineEmits(['update-filters']);

// Refs and Reactive Variables
const startDate = ref(null);
const endDate = ref(null);
const showDatePicker = ref(null);
const datepickerPosition = ref({});
const datepickerPositionEnd = ref({});

const startDateInput = ref(null);
const endDateInput = ref(null);

// Computed properties
const formattedStartDate = computed(() => formatDate(startDate.value));
const formattedEndDate = computed(() => formatDate(endDate.value));

const datePickerIcon = computed(() => {
  const datePickerIconClass = showDatePicker.value ? 'mdi-chevron-up' : 'mdi-chevron-down';

  return datePickerIconClass;
});

const showStartDatePicker = computed(() => showDatePicker.value === 'start');
const showEndDatePicker = computed(() => showDatePicker.value === 'end');

// Methods
const formatDate = (date) => {
  const isValidDate = date instanceof Date;

  if (!isValidDate) return '';

  return date.toLocaleDateString('ru-RU');
};

const toggleDatePicker = (type) => {
  if (showDatePicker.value === type) {
    showDatePicker.value = null;

    return;
  }

  showDatePicker.value = type;

  const isStartDatePicker = type === 'start';
  const positionVar = isStartDatePicker ? 'datepickerPosition' : 'datepickerPositionEnd';

  nextTick(() => setDatePickerPosition(type, positionVar));
};

const getElementPosition = (element) => {
  const rect = element.getBoundingClientRect();

  return {
    top: `${rect.bottom + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`
  };
};

const updateDatePickerPosition = (positionVar, position) => {
  if (positionVar === 'datepickerPosition') {
    datepickerPosition.value = position;

    return;
  }

  datepickerPositionEnd.value = position;
};

const setDatePickerPosition = (type, positionVar) => {
  const inputElement = type === 'start' ? startDateInput.value : endDateInput.value;

  if (inputElement) {
    const position = getElementPosition(inputElement);

    updateDatePickerPosition(positionVar, position);
  }
};

const closeDatePicker = () => {
  showDatePicker.value = null;
};

const onStartDateBlur = () => {
  const newStartDate = formatDateFromInput(startDate.value);

  if (!newStartDate) return;
  
  startDate.value = newStartDate;
};

const onEndDateBlur = () => {
  const newEndDate = formatDateFromInput(endDate.value);

  if (!newEndDate) return;

  endDate.value = newEndDate;
};

const formatDateFromInput = (inputValue) => {
  const val = !inputValue || typeof inputValue !== 'string';

  if (val) return null;

  const dateParts = inputValue.split('.');

  if (dateParts.length !== 3) return null;

  const [day, month, year] = dateParts.map(num => parseInt(num, 10));
  const formattedDate = new Date(year, month - 1, day);

  return formattedDate;
};

const onDateChange = () => {
  emit('update-filters', {
    dateFrom: startDate.value,
    dateTo: endDate.value,
  });
};

const updateFilters = () => {
  emit('update-filters', {
    dateFrom: startDate.value,
    dateTo: endDate.value,
  });
};

const clearFilters = () => {
  startDate.value = null;
  endDate.value = null;

  emit('update-filters', {
    dateFrom: startDate.value,
    dateTo: endDate.value,
  });
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