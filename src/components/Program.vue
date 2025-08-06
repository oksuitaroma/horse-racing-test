<template>
  <div class="program-list">
    <h2>Program</h2>
    <div v-for="(race, index) in races" :key="index" class="program-round">
      <table>
        <thead>
          <tr>
            <th colspan="2">
              {{ index + 1 }}st Lap — {{ race.distance }}m
            </th>
          </tr>
          <tr>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, i) in race.participants" :key="horse.id">
            <td>{{ i + 1 }}</td>
            <td>{{ horse.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const races = computed(() => store.state.races)
</script>

<style scoped>
.program-list {
  margin-top: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}
th, td {
  border: 1px solid #ccc;
  padding: 4px;
  font-size: 13px;
}
</style>
