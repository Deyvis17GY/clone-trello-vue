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
        <div
          class="flex font-bold overflow-hidden containerTak justify-between"
        >
          <span class="flex-no-shrink nameTask overflow-hidden">{{
            task.name
          }}</span>
          <span class="text-xs text-grey-dark">{{ task.date }}</span>
        </div>
        <p
          class="ws-full flex-no-shrink mt-1 text-sm overflow-hidden descriptionTask"
        >
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

<style>
.descriptionTask {
  width: 300px;
  white-space: nowrap;
  text-overflow: "-";
}
.nameTask {
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 250px;
}
.containerTak {
  width: 100%;
  max-width: 310px;
}
</style>
