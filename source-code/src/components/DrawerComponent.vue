<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const store = useUserStore();

const { userFullName, user } = storeToRefs(store);
const router = useRouter();

const logout = () => {
    store.logout();
    router.replace('/signUp');
};
</script>

<template>
    <v-navigation-drawer class="position-fixed" expand-on-hover rail permanent>
        <v-list>
            <v-list-item
                :prepend-avatar="user?.avatar"
                :title="userFullName"
                :subtitle="user?.email"
            />
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item
                variant="flat"
                color="primary"
                prepend-icon="folder"
                title="Projects"
                :exact="false"
                to="/projects"
            ></v-list-item>
            <v-list-item
                variant="flat"
                color="primary"
                prepend-icon="quiz"
                title="Tests"
                to="/tests"
            ></v-list-item>
            <v-list-item
                variant="flat"
                color="primary"
                prepend-icon="people"
                title="Users"
                to="/users"
            ></v-list-item>
            <v-list-item
                variant="flat"
                color="primary"
                prepend-icon="construction"
                title="Roles"
            ></v-list-item>
            <v-list-item
                variant="flat"
                color="primary"
                prepend-icon="edit_note"
                title="Reports"
            ></v-list-item>
            <v-spacer />
        </v-list>
        <template #append>
            <v-list-item
                variant="flat"
                color="primary"
                prepend-icon="logout"
                title="Logout"
                @click="logout"
            ></v-list-item>
        </template>
    </v-navigation-drawer>
</template>
