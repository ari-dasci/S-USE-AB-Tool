<template>
    <div class="ma-2">
        <div id="cover" class="d-flex flex-column position-relative w-100 align-center py-4 rounded my-2 bg-surface">
            <h1>Moodle usability evaluation</h1>
            <VAvatar color="surface-variant" size="128" class="mx-n6">
                <VImg
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftracker.moodle.org%2Fsecure%2Fattachment%2F62631%2Fmoodle-m-with-grid.png&f=1&nofb=1&ipt=a8e2eda9cb26ff7f0613789e5e1878e0f1fa4fc6a43fd999e1aba24b6e977534&ipo=images">
                </VImg>
            </VAvatar>
        </div>
        <RouterView />
    </div>
</template>

<script setup>
</script>

<style scoped>
div#cover {
    background: var(--v-theme-primary);
}
</style>