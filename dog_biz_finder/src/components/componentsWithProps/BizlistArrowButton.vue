<template>
  <div>
    <button class="btn" @click='showNewItem'>
    <img
      class="icon"
      :src="require(`@/assets/${arrowType}.svg`)"
      :alt="arrowType + ' arrow'"
    />
  </button>
</div>
  
</template>

<script>
export default {
  name: "BizlistArrowButton",
  props: {
    arrowType: String,
    onSelected: Function
  },
  methods: {
    showNewItem() {
      this.$emit('show-new-item');
    }
  }
};
</script>

<style scoped>
.btn {
  height: 90px;
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.5;
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (max-width: 768px) {
  .btn {
    display: none;
  }
}

.btn:focus {
  outline: none;
}

.btn:hover {
  opacity: 0.7;
}

.btn:disabled {
  opacity: 0.2;
  cursor: default;
}

.icon {
  height: 90px;
  width: auto;
}
</style>
