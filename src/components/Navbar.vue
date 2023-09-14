<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="main-header navbar navbar-expand">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/">home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/about">about</RouterLink>
            </li>
        </ul>
    </nav>
</template>