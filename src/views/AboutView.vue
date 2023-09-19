
<template>
  <VCard title="Project" class="ma-auto w-50 pa-4 d-flex flex-column align-stretch rounded-lg">
    <div class="my-4"></div>
    <VForm class="ma-2">
      <VTextField v-model="projectName" label="Project name"></VTextField>
      <VFileInput v-model="logo" label="Logo" accept="image/*"></VFileInput>
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
    projectName: '',
    logo: null,
    selectedDate: null,
  }),
}
</script>