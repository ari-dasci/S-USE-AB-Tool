
<template>
    <VCard title="Register" class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg">
        <div class="avatar d-flex justify-center align-end">
            <VAvatar color="surface-variant" size="128" class="mx-n6">
                <VImg src="https://i.pravatar.cc/300"></VImg>
            </VAvatar>
            <VBtn icon="add_a_photo" color="primary">
            </VBtn>
        </div>
        <div class="my-4"></div>
        <VForm class="ma-2">
            <VTextField v-model="firstName" label="First name"></VTextField>
            <VTextField v-model="lastName" label="Last name"></VTextField>
            <VTextField v-model="email" label="Email"></VTextField>
            <VTextField v-model="organization" label="Organization"></VTextField>
        </VForm>
        <div class="my-2"></div>
        <v-card-actions>
            <VBtn variant="elevated" color="primary">Next</VBtn>
        </v-card-actions>
    </VCard>
</template>

<script>

export default {
    data: () => ({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
    }),
}
</script>