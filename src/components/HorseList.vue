<template>
  <div class="horse-list">
    <h2>Horse List (1–20)</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Condition</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.name }}</td>
          <td>{{ horse.condition }}</td>
          <td>
            <span class="color-box" :style="{ backgroundColor: horse.color }"></span>
            {{ horse.color }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const horses = computed(() => store.state.horses)
</script>

<style scoped>
.horse-list {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 6px;
  font-size: 13px;
}
.color-box {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: middle;
  border: 1px solid #000;
}
</style>
