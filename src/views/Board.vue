<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />
      <div class="column flex">
        <input
          class="p-2 mr-2 flex-grow"
          type="text"
          placeholder="New Column"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
    <div
      :class="activeItemRemove"
      @dragover.stop="activeRemove"
      @dragleave.self="leaveRemove"
      @drop="dropItem"
      @dragover.prevent
      @dragenter.prevent
    >
      Drag and drop items here to remove
    </div>

    <FloatOptions
      @changeInput="uploadBdJson"
      @clickDownload="downloadBdTaskColumns"
    />

    <button style="display: none" class="removeTask"></button>
    <Alert
      :value="textConfirm"
      :timeSeconds="500"
      :styleAlert="changeStyleConfirm"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BoardColumn from "@/components/BoardColumn";
import Alert from "@/components/Alert";
import FloatOptions from "@/components/FloatOptions";
export default {
  components: {
    BoardColumn,
    Alert,
    FloatOptions
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    }
  },
  data() {
    return {
      newColumnName: "",
      activeItemRemove: {
        removeTask: true,
        activeItemRemove: false
      },
      textConfirm: "",
      changeStyleConfirm: {
        opacity: 0
      }
    };
  },
  methods: {
    closeTask() {
      this.$router.push({
        name: "board"
      });
    },
    createColumn() {
      if (!this.newColumnName) return;
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName
      });
      this.newColumnName = "";
      this.alertConfirm("Column created");
    },
    activeRemove(e) {
      this.activeItemRemove.activeItemRemove = true;
    },
    leaveRemove(e) {
      this.activeItemRemove.activeItemRemove = false;
    },
    dropItem(e) {
      const transferData = JSON.parse(e.dataTransfer.getData("payload"));
      if (transferData.type === "task") {
        if (e.dataTransfer.dropEffect === "none") {
          const task = this.board.columns[transferData.fromColumnIndex].tasks;
          this.$store.commit("DELETE_TASK", {
            tasks: task,
            taskIndex: transferData.fromTaskIndex
          });
          this.alertConfirm("Task deleted!");
          this.activeItemRemove.activeItemRemove = false;
        }
      }
      if (transferData.type === "column") {
        if (e.dataTransfer.dropEffect === "none") {
          this.$store.commit("DELETE_COLUMN", {
            columnIndex: transferData.fromColumnIndex
          });
          this.alertConfirm("Column deleted!");
          this.activeItemRemove.activeItemRemove = false;
        }
      }
    },
    downloadColumnTask(exportData, exportName) {
      const dataJson =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(exportData));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataJson);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    downloadBdTaskColumns() {
      this.downloadColumnTask(this.board, "bd-task-columns");
    },
    uploadBdJson(file) {
      const fileType = file.type; // getting selected file type
      const validExtensions = "application/json"; // adding some valid image extensions in array
      if (!validExtensions.includes(fileType)) {
        this.alertConfirm("Invalid file type", 1000);
        return;
      }
      const lector = new FileReader();
      lector.readAsText(file);
      lector.onload = () => {
        const importData = JSON.parse(lector.result);
        this.$store.commit("IMPORT_DATA", {
          board: importData
        });
        this.alertConfirm("successful import!", 1500);
      };
    },
    alertConfirm(text, timeSeconds = 700) {
      this.textConfirm = text;
      this.changeStyleConfirm.opacity = 1;

      setTimeout(() => {
        this.changeStyleConfirm.opacity = 0;
      }, (timeSeconds += 1000));
    }
  },
  mounted() {}
};
</script>

<style>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
  overflow: hidden;
}

.board {
  @apply p-4 h-full overflow-auto;
  background: #3e92cc;
}
.board::-webkit-scrollbar {
  -webkit-appearance: none;
}
.board::-webkit-scrollbar:horizontal {
  height: 10px;
}

.board::-webkit-scrollbar-thumb {
  background: #0a2463;
  border-radius: 10px;
}
.board::-webkit-scrollbar-button:increment,
.board::-webkit-scrollbar-button {
  display: none;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
.removeTask {
  position: absolute;
  margin: auto;
  bottom: 2%;
  width: 50%;
  margin: 0 25%;
  padding: 40px;
  /* Border */
  border: 4px dashed #0a256362;
  border-radius: 4px;
}
.activeItemRemove {
  background-color: #3e91cc;
  color: black;
  border: 4px dashed #0a2463;
}
</style>
