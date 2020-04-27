<template>
  <div>
    <button 
      class="btn" 
      @click='showNewItem'
      :disabled="disabled"
    >
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
    disabled: Boolean
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
  cursor: pointer;
  opacity: 0.5;
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
