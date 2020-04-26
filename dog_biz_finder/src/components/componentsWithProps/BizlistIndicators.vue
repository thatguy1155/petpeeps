<template>
  <ul>
    <li
      v-for="(item, index) in items"
      class="dot"
      :key="index"
      :class="{ 'dot-selected': currentItemIndex === index }"
    >
      <button
        class="indicator-btn"
        @click="showElement(index)"
        :disabled="currentItemIndex === index"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: "BizlistIndicators",
  props: {
    items: Array,
    currentItemIndex: Number,
    showElement: Function,
  },
};
</script>

<style scoped>
.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: black;
  opacity: 0.2;
  cursor: pointer;
  position: relative;
}

.dot-selected {
  opacity: 0.7;
  cursor: default;
}

.indicator-btn {
  position: absolute;
  left: 0px;
  padding: 0px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: transparent;
  border: none;
}
</style>
