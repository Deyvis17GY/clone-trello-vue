<template>
  <div :style="this.styleAlert" class="container-alert" role="alert">
    <span class="block sm:inline">{{ value }}</span>
    <span class="absolute pin-b pin-r px-4 py-3"> </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "deleted task",
      required: true
    },
    timeSeconds: {
      type: Number,
      required: true
    },
    styleAlert: {
      type: Object,
      default: () => ({
        opacity: 0
      })
    }
  }
};
</script>

<style lang="css">
.container-alert {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 14px 18px;
  min-width: 250px;
  z-index: 999999;
  border-radius: 10px;
  color: #fff;
  font-weight: 300;
  white-space: nowrap;
  user-select: none;
  opacity: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  box-sizing: border-box;
  transform: scale(0.7);
  transition: all 0.4s ease-out;
  background-color: #323232;
  font-size: 20px;
}
</style>
