<template>
  <ul class="indicators">
    <li
      v-for="(item, index) in items"
      class="dot"
      :key="index"
      :class="{ 'dot-selected': currentItemIndex === index }"
    >
      <button
        class="indicator-btn"
        @click="showItem(index)"
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
    currentItemIndex: Number
  },
  methods: {
    showItem(index) {
      this.$emit('show-item', index);
    }
  }
};
</script>

<style scoped>
.indicators {
  display: flex;
  justify-content: center;
}

.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: black;
  opacity: 0.2;
  cursor: pointer;
  position: relative;
  margin: -17px 4px;
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

@media screen and (max-width: 959px) {
  .dot {
    height: 8px;    
    width: 8px;
  }
}


    
</style>
