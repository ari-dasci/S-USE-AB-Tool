<script setup>
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
const { increment, decrement } = counter
</script>

<template>
  <h1>{{ counter.count }}</h1>
  <h1>{{ counter.doubleCount }}</h1>
  <button @click="increment">+ plus</button>
  <button @click="decrement">- minus</button>
</template>
