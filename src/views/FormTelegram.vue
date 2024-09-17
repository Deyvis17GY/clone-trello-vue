<template>
  <div class="form-view">
    <div class="flex items-center p-2">
      <h2 class="m-auto w-100">Agregar chat de telegram</h2>
      <AppIcon
        class="cursor-pointer question-icon"
        icon="question-circle"
        @click="goTutorial"
      />
      <span class="question block sm:inline">Ver Tutorial (click)</span>
    </div>
    <form
      class="flex flex-col flex-group items-end justify-between px-4"
      @submit.prevent="onSaveData"
    >
      <input
        type="text"
        class="p-2 w-full mr-2 block text-lg outline-none text-grey-darkest"
        :value="telegramInfo?.token || ''"
        name="token"
        @change="onChange($event, 'token')"
        placeholder="Telegram Token"
      />
      <input
        type="text"
        class="p-2 w-full mr-2 block text-lg outline-none text-grey-darkest"
        :value="telegramInfo?.chatId || ''"
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      test: "AA"
    };
  },
  computed: {
    ...mapGetters(["getTelegramInfo"]),
    telegramInfo() {
      return this.getTelegramInfo;
    },
    isValid() {
      return (
        Boolean(this.telegramInfo?.token.length) &&
        Boolean(this.telegramInfo?.chatId.length)
      );
    }
  },
  methods: {
    onChange(e, key) {
      this.$store.commit("UPDATE_TELEGRAM_INFO_BY_KEY", {
        key,
        value: e.target.value
      });
    },
    onSaveData(event) {
      this.$emit("onSaveData", event);
    },
    goTutorial() {
      window.open("https://youtu.be/Qg5BaKTW1Uw?si=R4-LvIMCEibUw-RR", "_blank");
    }
  }
};
</script>

<style>
.form-view {
  @apply relative flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
.question {
  @apply absolute bg-grey-darkest text-white rounded-sm py-1  px-2 text-xs z-50 opacity-0;
  right: 6%;
}
.question-icon:hover ~ .question {
  opacity: 1;
}
</style>
