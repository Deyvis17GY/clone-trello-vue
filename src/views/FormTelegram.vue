<template>
  <div class="form-view">
    <h2 class="m-auto w-100 text-center p-2">Agregar cuenta de telegram</h2>
    <form
      class="flex flex-col flex-group items-end justify-between px-4"
      @submit.prevent="onSaveData"
    >
      <input
        type="text"
        class="p-2 w-full mr-2 block text-xl font-bold outline-none"
        :value="token"
        name="token"
        @change="onChange($event, 'token')"
        placeholder="Telegram Token"
      />
      <input
        type="text"
        class="p-2 w-full mr-2 block text-xl font-bold outline-none"
        :value="chatId"
        name="chatId"
        @change="onChange($event, 'chatId')"
        placeholder="Chat ID"
      />
      <button
        class="text-white p-2 rounded"
        :class="{ 'bg-grey-dark': !isValid, 'bg-teal-dark': isValid }"
        type="submit"
        :disabled="!isValid"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      chatId: ""
    };
  },
  computed: {
    isValid() {
      return Boolean(this.token.length) && Boolean(this.chatId.length);
    }
  },
  methods: {
    onChange(e, key) {
      if (key === "token") {
        this.token = e.target.value;
      } else {
        this.chatId = e.target.value;
      }
    },
    onSaveData(event) {
      this.$emit("onSaveData", event);
    }
  }
};
</script>

<style>
.form-view {
  @apply relative flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
