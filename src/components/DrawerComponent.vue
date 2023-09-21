<template>
    <v-navigation-drawer class="position-fixed" expand-on-hover rail>
        <v-list>
            <v-list-item
                :prepend-avatar="`https://i.pravatar.cc/150?u=${user?.id}`"
                :title="userFullName"
                :subtitle="user?.email"
                to="/sign-up"
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
                prepend-icon="inventory"
                title="Tests"
                to="/tests"
            ></v-list-item>
            <v-list-item
                variant="flat"
                color="primary"
                prepend-icon="star"
                title="Starred"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';

const { userFullName, user } = storeToRefs(useUserStore());
</script>
