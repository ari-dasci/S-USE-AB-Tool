<script setup lang="ts">
import { useTitle } from "@vueuse/core";

const docTitle = useTitle();
</script>

<template>
  <footer
    class="flex flex-col justify-center items-center bg-muted p-4 border-t-2"
  >
    <h4 class="text-muted-foreground p-4">{{ docTitle }}</h4>
    <div class="flex">
      <img
        class="w-96"
        src="@/assets/logo-dasci-horizontal.png"
        alt=""
        srcset=""
      />
    </div>
  </footer>
</template>
