<template>
  <div class="task-view">
    <div class="flex flex-col flex-group items-start justify-between px-4">
      <input
        type="text"
        class="p-2 w-full mr-2 block text-xl font-bold outline-none"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
        placeholder="new name"
      />
      <textarea
        class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal outline-none"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        placeholder="new description"
      />
      <p class="date-no-selected">{{ task.date }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    updateTaskProperty(e, key) {
      if (!e.target.value) return;
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value
      });
    }
  }
};
</script>

<style>
.task-view {
  @apply relative flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
.date-no-selected {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
}
</style>
