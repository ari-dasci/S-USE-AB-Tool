<template>
    <v-navigation-drawer class="position-fixed" expand-on-hover rail>
        <v-list>
            <v-list-item :prepend-avatar="props.userAvatar" :title="props.userName" :subtitle="props.userEmail" />
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item variant="flat" color="primary" prepend-icon="folder" title="My Files"
                value="myfiles"></v-list-item>
            <v-list-item variant="flat" color="primary" prepend-icon="people" title="Shared with me"
                value="shared"></v-list-item>
            <v-list-item variant="flat" color="primary" prepend-icon="star" title="Starred" value="starred"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
const props = defineProps({
    userName: String,
    userEmail: String,
    userAvatar: String,
});
</script>