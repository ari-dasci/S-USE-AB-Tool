<script setup lang="ts">
import RegisterForm from "@/components/RegisterForm.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <Card :class="cn('w-1/2', $attrs.class ?? '')">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Hola</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  </div>
</template>
