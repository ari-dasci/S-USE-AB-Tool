<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import MainFooter from "@/components/MainFooter.vue";
</script>

<template>
  <div class="flex flex-col">
    <div class="min-h-screen">
      <HeaderNav />
      <div class="flex-1 bg-background">
        <router-view />
      </div>
    </div>
    <MainFooter />
  </div>
</template>
