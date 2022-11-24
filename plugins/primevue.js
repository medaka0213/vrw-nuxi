
import { defineNuxtPlugin } from "#app";
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Image from 'primevue/image';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row
import Galleria from 'primevue/galleria';
import Card from 'primevue/card';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('Checkbox', Checkbox);
    nuxtApp.vueApp.component('Calendar', Calendar);
    nuxtApp.vueApp.component('AutoComplete', AutoComplete);
    nuxtApp.vueApp.component('Dropdown', Dropdown);
    nuxtApp.vueApp.component('InputNumber', InputNumber);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('Image', Image);
    nuxtApp.vueApp.component('DataTable', DataTable);
    nuxtApp.vueApp.component('Column', Column);
    nuxtApp.vueApp.component('ColumnGroup', ColumnGroup);
    nuxtApp.vueApp.component('Row', Row);
    nuxtApp.vueApp.component('Galleria', Galleria);
    nuxtApp.vueApp.component('Card', Card);
    nuxtApp.vueApp.component('Sidebar', Sidebar);
    nuxtApp.vueApp.component('Menu', Menu);
    nuxtApp.vueApp.component('Toast', Toast);
    nuxtApp.vueApp.use(ToastService);
});