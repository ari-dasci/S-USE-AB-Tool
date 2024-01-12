<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useCallService } from '../stores/service';
import ImgPickerComponent from './ImgPickerComponent.vue';

const emit = defineEmits(['agregado']);
const store = useCallService();

const isLoading = ref(false);

const state = reactive({
    name:'',
    role:'ADMIN',
});

const rules = {
    name: { required },
};

const itemRoles = ['ADMIN','USER','EXPERT']

const v$ = useVuelidate(rules, state);

const props = defineProps({
  mostrar: Boolean
})


const agregar = async () => {
    try {
         const result = await v$.value.$validate();
        if (!result) {
            console.log("hubo un error al validar los campos")
            // notify user form is invalid
            return;
        }
        isLoading.value = true;
        //TODO --> Agregar los atributos que se le mandaran al back para poder hacer la creacion del usuario
        const data = {
             "method": state.method,
        }
       //let response = await store.service(data);
        //correo@correo.com
        //1234
        // if(response.status == 'error') alert(`${response.message}`);
        // if(response.status == 'success') emit('agregado', response.data)
        emit('agregado', {name:"Athziri Vazquez"})
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
<v-dialog v-model="props.mostrar" persistent>

    <v-card title="Add user" class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg">
             <v-card-text>
        <v-row>
        <v-col>
        <v-text-field 
            label="Name" 
            type="text"
            v-model="state.name" 
            color="blue-grey"
            :error-messages="v$.name.$errors.map(e => e.$message)"
            >
        </v-text-field>
               </v-col>
        </v-row>
             </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <VBtn :loading="isLoading" variant="elevated" color="primary" @click="agregar()" >Add</VBtn>
        </v-card-actions>
    
    </v-card>
 </v-dialog>

</template>