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
  --lane-height: 30px;
  --position-width: 30px;
  --finish-offset: 95px;
  --horse-width: 90px;
  --horse-font-size: 14px;
  --horse-height: 24px;
  
  position: relative;
  height: 30px;
  border-bottom: 1px dashed #ddd;
  display: flex;
  align-items: center;
  max-width: calc(100% - var(--finish-offset));
}
.horse-lane__position {
  text-align: center;
  background-color: darkgreen;
  color: white;
  transform: rotate(-90deg);
  width: var(--position-width);
  flex-shrink: 0;
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
  width: var(--horse-width);
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  font-size: var(--horse-font-size);
  height: var(--horse-height);
  line-height: var(--horse-height);
  transition-timing-function: ease-out;
}

@media (max-width: 768px) {
  .horse-lane {
    --lane-height: 26px;
    --position-width: 24px;
    --finish-offset: 80px;
    --horse-width: 80px;
    --horse-font-size: 12px;
    --horse-height: 20px;
  }
}
</style>
