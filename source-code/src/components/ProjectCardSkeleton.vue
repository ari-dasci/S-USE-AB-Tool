<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <Card class="hover:bg-muted flex flex-col justify-between h-full">
    <CardHeader
      class="h-full grid grid-cols-[60px_1fr] items-start gap-4 space-y-0"
    >
      <AspectRatio :ratio="1">
        <Skeleton class="rounded-full h-12 w-12" />
      </AspectRatio>
      <div class="space-y-1 w-full justify-center">
        <Skeleton class="w-1/4 h-8" />
        <Skeleton class="w-3/4 h-12" />
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex w-full h-2">
        <Skeleton class="flex-1 px-2 h-4" />
        <Skeleton class="flex-1 px-2 h-4" />
        <Skeleton class="flex-1 px-2 h-4" />
      </div>
    </CardContent>
  </Card>
</template>
