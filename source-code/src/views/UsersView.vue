<script setup>
import AddUserComponent from '../components/AddUserComponent.vue'
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useCallService } from '../stores/service';

const store = useCallService();
const isLoading = ref(false);
const agregar = ref(false);


const state = reactive({
    method:'system.login',
    username:'',
    password:'',
    // items:[
    //     'Athziri Vazquez'
    // ]
});

const items = [
    {
      name: 'African Elephant',
    },
    {
      name: 'African Elephant',
     
    },
     {
      name: 'African Elephant',
     
    },
     {
      name: 'African Elephant',
     
    },
      {
      name: 'African Elephant',
    },
    {
      name: 'African Elephant',
     
    },
     {
      name: 'African Elephant',
     
    },
     {
      name: 'African Elephant',
     
    },
     
    // ... more items
  ]

const headers =[
      { title: 'Name', align: 'start', sortable: false, key: 'name' },
     
    ]

const rules = {
    username: { required, email },
    password: { required }
};

const v$ = useVuelidate(rules, state);

const enviar = async () => {
    try {
        const result = await v$.value.$validate();
        if (!result) {
            console.log("hubo un error")
            // notify user form is invalid
            return;
        }
        isLoading.value = true;

        const data = {
            "method": state.method,
            "username": state.username,
            "password": state.password
        }

        let response = await store.service(data);
        //correo@correo.com
        //1234
        if(response.status == 'error') alert(`${response.message}`);
        if(response.status == 'success') router.push('/Home');
    } finally {
        isLoading.value = false;
    }
};

const agregado = (nuevoItem) =>{
  console.log("hola", nuevoItem)
    this.agregar=false
    items.push(nuevoItem)
}

</script>

<template>
<div>
    <v-card class="w-100 ma-2">
        <v-toolbar flat>
            <v-toolbar-title>Users</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn @click="agregar=true" prepend-icon="add" color="primary">ADD USER</v-btn>
        </v-toolbar>
        <v-data-table
            :headers="headers"
            :items="items"
            density="compact"
            item-key="name"
        ></v-data-table>
    </v-card>
    <div>

    <AddUserComponent :mostrar="agregar" @agregado="agregado()"/>

    </div>
</div>
</template>