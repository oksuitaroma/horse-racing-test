<template>
  <div class="horse-lane">
    <div class="horse-lane__position">{{ index + 1 }}</div>
    <div class="horse-lane__row">
      <div
        class="horse-lane__horse"
        :style="{
          left: horse.progress + '%',
          backgroundColor: horse.color,
          transition: horse.stopped ? 'none' : 'left 50ms linear'
        }"
      >
        🐎 {{ horse.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  horse: Object,
  index: Number
})
</script>

<style scoped>
.horse-lane {
  position: relative;
  height: 30px;
  border-bottom: 1px dashed #ddd;
  display: flex;
  align-items: center;
  max-width: calc(100% - 95px);
}
.horse-lane__position {
  text-align: center;
  background-color: darkgreen;
  color: white;
  transform: rotate(-90deg);
  width: 30px;
}
.horse-lane__row {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.horse-lane__horse {
  box-sizing: border-box;
  position: absolute;
  padding: 0 4px;
  width: 90px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  font-size: 14px;
  height: 24px;
  line-height: 24px;
  transition-timing-function: ease-out;
}
</style>
