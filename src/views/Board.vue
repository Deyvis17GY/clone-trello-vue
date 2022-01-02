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
    <div class="container-float">
      <button title="Import" @click="activeInputUpload" class="upload">
        <input @change="uploadBdJson" ref="inputUpload" type="file" hidden />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-file-upload"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
          <path
            d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
          ></path>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <polyline points="9 14 12 11 15 14"></polyline>
        </svg>
      </button>
      <button title="Download" @click="downloadBdTaskColumns" class="download">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-download"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <polyline points="7 11 12 16 17 11" />
          <line x1="12" y1="4" x2="12" y2="16" />
        </svg>
      </button>
    </div>
    <button style="display:none" class="removeTask"></button>
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
export default {
  components: {
    BoardColumn,
    Alert
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
    activeInputUpload() {
      this.$refs.inputUpload.click();
    },
    uploadBdJson(e) {
      const file = e.target.files[0];
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
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
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
  border: 4px dashed rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
.activeItemRemove {
  background-color: #56958f;
  color: black;
  border: 4px dashed hsl(207, 94%, 20%);
}
.container-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 100000;
}
.container-float:hover {
  height: 105px;
  cursor: pointer;
}
.download {
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1px solid hsl(207, 94%, 20%);
  background: hsl(207, 94%, 20%);
  color: #ffffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 90090;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.upload {
  border: 1px solid hsl(207, 94%, 20%);
  background: hsl(207, 94%, 20%);
  color: #ffffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 90090;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.upload:hover,
.download:hover {
  background: #ffffff;
  color: hsl(207, 94%, 20%);
  border: #ffffff;
}
</style>
