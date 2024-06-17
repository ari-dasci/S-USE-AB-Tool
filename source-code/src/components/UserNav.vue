<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth.store";
import { LogOut as LogOutIcon, User2 as UserIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useAuthStore();

const { user } = storeToRefs(store);

const logout = async (): Promise<void> => {
  await store.logout();
  router.replace("/login");
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage v-if="user?.profileImage" :src="user.profileImage" />
          <AvatarFallback v-if="user">{{
            `${user!.firstname[0]}${user!.lastname[0]}`
          }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ user?.firstname }} {{ user?.lastname }}
          </p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ user?.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup> </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="">
        <UserIcon /> <span class="px-2"> Profile </span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="logout">
        <LogOutIcon /> <span class="px-2"> Log out </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
