<template>
  <div
    @dragend="test"
    draggable
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="onDrag"
    @click="emitClick"
  >
    <slot />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["board"])
  },
  methods: {
    onDrag(e) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.setData("payload", JSON.stringify(this.transferData));
    },
    test(e) {
      // if (this.transferData.type === "task") {
      //   if (e.dataTransfer.dropEffect === "none") {
      //     // console.debug("board", this.board.columns, this.transferData);
      //     // eslint-disable-next-line standard/computed-property-even-spacing
      //     const t = this.board.columns[
      //       this.transferData.fromColumnIndex
      //     ].tasks.filter(
      //       (task, index) => index !== this.transferData.fromTaskIndex
      //     );
      //     const task = this.board.columns[this.transferData.fromColumnIndex]
      //       .tasks;
      //     console.debug("t", task);
      //     // this.board.columns[this.transferData.fromColumnIndex].tasks = t;
      //     this.$store.commit("DELETE_TASK", {
      //       tasks: task,
      //       taskIndex: this.transferData.fromTaskIndex
      //     });
      //   }
      // }
    },
    emitClick() {
      this.$emit("click");
    }
  }
};
</script>

<style></style>
