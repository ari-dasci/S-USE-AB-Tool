<script setup lang="ts">
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  defaultValue?: string;
  modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: props.defaultValue,
});

const pickFile = () => {
  document.querySelector<HTMLInputElement>("#file-picker")?.click();
};

type InputEvent = Event & { target: HTMLInputElement };

const filePicked = async ({ target }: InputEvent) => {
  const { files } = target;
  if (!files) return;
  const [file] = files;
  const img = await getImgData(file);
  if (img) {
    data.value = img;
  }
};

const getImgData = (file: File): Promise<string | undefined> => {
  if (!file) return Promise.resolve(undefined);

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    const timer = setTimeout(reject, 5000);
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", function (): void {
      clearTimeout(timer);
      resolve(this.result?.toString());
    });
  });
};
</script>

<template>
  <div :class="$attrs.class">
    <Avatar size="base" @click="pickFile">
      <AvatarImage v-if="data" :src="data.toString()"> </AvatarImage>
    </Avatar>
    <input
      id="file-picker"
      type="file"
      accept="image/png, image/jpeg, image/bmp"
      class="hidden"
      @change="(event)=> filePicked(event as InputEvent)"
    />
  </div>
</template>
