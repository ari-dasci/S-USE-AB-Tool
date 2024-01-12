<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useProjectsStore } from '../stores/projects';
import ImgPickerComponent from './ImgPickerComponent.vue';

const emit = defineEmits(['submitted']);
const store = useProjectsStore();

const isLoading = ref(false);
const menu = ref(false)

const state = reactive({
    logo: {img: null},
    title: '',
    date: '',
    menu:false,
    selectDate:null
    // menu:false,
    //  date: new Date().toISOString().substr(0, 10),
    //   menu: false,
});

const rules = {
    title: { required },
  
};

const v$ = useVuelidate(rules, state);

const onPicked = async img => {
    state.logo = img;
};

const guardar = async () => {
    try {
        const result = await v$.value.$validate();
        if (!result) {
            console.log("hubo un error")
            // notify user form is invalid
            return;
        }
        isLoading.value = true;
        const { title, logo, date } = state;
        const [start, end] = date;
        await store.createProject({ title, logo, start: new Date(start), end: new Date(end) });
        emit('submitted');
    } finally {
        isLoading.value = false;
    }
};
// const save = (date) => {
//         this.$refs.menu.save(date)
//       }

const getDate=()=> {
  const date = this.input ? new Date(this.input) : new Date()
  return [date]
}

const dateSelected=()=>{
  console.log();
}
</script>

<template>

   <v-container>
        <ImgPickerComponent :avatar="state.logo.img" @change="onPicked" />
        <v-text-field  v-model="state.title" label="Project name" :error-messages="v$.title.$errors.map(e => e.$message)"></v-text-field >

        <v-menu :close-on-content-click="false" persistent>
          <template v-slot:activator="{ props }">
            <v-text-field
              v-bind="props"
              :value="state.selectedDate"
              prepend-icon="event"
              label="Dates">
            </v-text-field>
          </template>
          <v-date-picker 
            v-model="state.selectedDate"
            locale="es"
            @change="dateSelected">
          </v-date-picker>
        </v-menu>

        <!-- <v-menu>
        <template v-slot:activator="{ props }">
          <v-text-field
            v-bind="props"
            v-model="state.selectedDate"
            prepend-icon="event"
            label="Dates">
          </v-text-field>
          <v-btn v-on="on" color="primary">
            Seleccionar Fecha
          </v-btn>
        </template>
        <v-date-picker 
          v-model="state.selectedDate"
          locale="es"
          @change="menu = false">
        </v-date-picker>
      </v-menu> -->
        <!-- :no-buttons="true" -->
        <!-- <v-date-picker color="primary" v-model="state.date" locale="es-MX" >
             <template v-slot:actions>
              <v-row class="justify-center">
                <v-btn
                  color="primary"
                >
                  Aceptar
                </v-btn>
                <v-btn
                  color="error"
                >
                  Cancelar
                </v-btn>
              </v-row>
            </template>

        </v-date-picker> -->
 
        <!-- <v-menu v-model="state.menu" persistent :return-value.sync="state.date">
            <template v-slot:activator="{ props }">
                <v-text-field v-model="state.date" prepend-icon="event"  v-bind="props" label="Dates"></v-text-field>
            </template>
            <v-date-picker
                color="primary" 
                  :modelValue="getDate"
                @update:modelValue="updateDate"
                locale="es-MX">
                <template v-slot:actions>
                <v-row class="justify-center">
                <v-btn
                  color="primary"
                >
                  Aceptar
                </v-btn>
                <v-btn
                  color="error"
                >
                  Cancelar
                </v-btn>
              </v-row>
            </template>
            </v-date-picker>
        </v-menu> -->
        <div class="my-2"></div>
        <v-card-actions>
            <VBtn :loading="isLoading"  variant="elevated" color="primary" @click="guardar()" >Next</VBtn>
        </v-card-actions>
   </v-container>
</template>