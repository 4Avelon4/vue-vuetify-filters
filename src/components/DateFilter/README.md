# Компонент для фильтрации по дате (DateFilter)

Этот компонент позволяет пользователям выбрать диапазон дат с использованием двух полей ввода для начала и конца диапазона. Пользователь может выбрать дату с помощью встроенного календаря, а также очистить выбранные фильтры.

## Структура компонента

### Основные элементы:

1. **Поле ввода даты начала** — позволяет выбрать и отобразить дату начала диапазона.
2. **Поле ввода даты конца** — позволяет выбрать и отобразить дату конца диапазона.
3. **Кнопка "Выбрать"** — применяет выбранные фильтры.
4. **Кнопка очистки** — сбрасывает выбранные фильтры.

## Структура данных

### `emits`

- **update-filters**: Событие, которое передает обновленные фильтры в родительский компонент.

### `state`

- **startDate**: Дата начала фильтра.
- **endDate**: Дата конца фильтра.
- **showDatePicker**: Указывает, какой календарь открыт (`'start'` или `'end'`).
- **datepickerPosition**: Позиция календаря для поля даты начала.
- **datepickerPositionEnd**: Позиция календаря для поля даты конца.

### `computed`

- **formattedStartDate**: Форматированная строка для отображения даты начала в формате `ДД.ММ.ГГГГ`.
- **formattedEndDate**: Форматированная строка для отображения даты конца в формате `ДД.ММ.ГГГГ`.
- **datePickerIcon**: Иконка для отображения в поле ввода даты. Меняется в зависимости от того, открыт ли календарь (иконка вверх/вниз).
- **showStartDatePicker**: Определяет, отображается ли календарь для выбора даты начала.
- **showEndDatePicker**: Определяет, отображается ли календарь для выбора даты конца.

### `methods`

- **formatDate**: Форматирует объект `Date` в строку с использованием локали `ru-RU`.
- **toggleDatePicker**: Открывает или закрывает календарь для выбора даты начала или конца.
- **setDatePickerPosition**: Устанавливает позицию календаря в зависимости от положения поля ввода.
- **onDateBlur**: Обрабатывает событие потери фокуса в полях ввода для начала и конца диапазона дат.
- **closeDatePicker**: Закрывает календарь.
- **onStartDateBlur**: Обработчик события потери фокуса для поля даты начала.
- **onEndDateBlur**: Обработчик события потери фокуса для поля даты конца.
- **formatDateFromInput**: Преобразует строку в объект `Date`.
- **onDateChange**: Отправляет событие изменения фильтров с датами.
- **applyFilters**: Применяет выбранные фильтры.
- **clearFilters**: Очищает выбранные фильтры.

## Пример использования

Для использования компонента в родительском компоненте, импортируйте его и привяжите обработчик для события `update-filters`.

```vue
<template>
  <date-filter @update-filters="updateFilters" />
</template>

<script setup>
// Components
import DateFilter from "./components/DateFilter.vue";

// Refs and Reactive Variables
const filters = ref({
  dateFrom: null,
  dateTo: null,
});

// Methods
const updateFilters = (filters) => {
  filters.value = filters;
};
</script>
```
