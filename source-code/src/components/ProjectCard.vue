<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/models/project.model";
import { format, isSameDay } from "date-fns";
import { CalendarIcon, GraduationCapIcon, UsersIcon } from "lucide-vue-next";

const { project } = defineProps<{ project: Project }>();
</script>

<template>
  <Card
    class="hover:bg-muted hover:cursor-pointer flex flex-col justify-between h-full"
  >
    <CardHeader
      class="h-full grid grid-cols-[60px_1fr] items-start gap-4 space-y-0"
    >
      <AspectRatio :ratio="1">
        <Avatar>
          <AvatarImage
            v-if="project.pic"
            :src="project.pic!.toString()"
            :alt="project.name"
          />
          <AvatarFallback>{{
            project.name
              .split(" ")
              .map((e) => e[0])
              .join("")
          }}</AvatarFallback>
        </Avatar>
      </AspectRatio>
      <div class="space-y-1 w-full">
        <CardTitle>{{ project.name }}</CardTitle>
        <!-- <CardDescription class="w-full overflow-ellipsis">
          {{ project.description }}
        </CardDescription> -->
      </div>
      <div
        class="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground"
      ></div>
    </CardHeader>
    <CardContent>
      <div class="flex space-x-4 text-sm text-muted-foreground">
        <div v-if="project.experts" class="flex items-center">
          <GraduationCapIcon class="mr-1 h-3 w-3" />
          <span>{{ project.experts }}</span>
        </div>
        <div v-if="project.users" class="flex items-center">
          <UsersIcon class="mr-1 h-3 w-3" />
          <span>{{ project.users }}</span>
        </div>
        <div v-if="project.begin || project.end" class="flex items-center">
          <CalendarIcon class="mr-1 h-3 w-3" />
          <div v-if="project.begin != null">
            <span>
              {{ `${format(project.begin, "LLL dd, y")}` }}
            </span>
            <span
              v-if="
                project.end != null && !isSameDay(project.begin, project.end)
              "
            >
              {{ ` - ${format(project.end, "LLL dd, y")}` }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
