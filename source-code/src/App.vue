<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";
</script>

<template>
  <router-view class="min-h-screen"> </router-view>
  <Toaster />
</template>
