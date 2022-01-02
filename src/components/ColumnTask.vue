<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="task"
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      @click="goToTask(task)"
    >
      <template v-if="task">
        <span class="w-full flex-no-shrink font-bold">
          {{ task.name }}
        </span>
        <p v-if="task" class="ws-full flex-no-shrink mt-1 text-sm">
          {{ task.description }}
        </p>
      </template>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingTasksAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";
import AppDrag from "./AppDrag.vue";
import AppDrop from "./AppDrop.vue";
export default {
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({
        name: "task",
        params: {
          id: task.id
        }
      });
    }
  }
};
</script>

<style></style>
