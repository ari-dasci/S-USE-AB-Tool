<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WatchErrors } from "@/composables/watch-errors";
import { useAuthStore } from "@/store/auth.store";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useAuthStore();
const { user, isAuthenticated } = storeToRefs(store);

const docTitle = useTitle();

WatchErrors(store);

watch(user, () => {
  if (user != null) {
    router.replace("/");
  }
});
watch(isAuthenticated, () => {
  console.log(isAuthenticated.value);
});
</script>

<template>
  <div class="h-full container flex justify-center items-center">
    <Card class="w-1/2">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>{{ docTitle }}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs default-value="login" class="w-full">
          <TabsList class="w-full">
            <TabsTrigger class="w-1/2 text-muted-foreground" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger class="w-1/2 text-muted-foreground" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>
