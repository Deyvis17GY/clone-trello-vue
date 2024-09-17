<template>
  <div class="container-float">
    <button title="Import" @click="activeInputUpload" class="upload">
      <input
        @change="$emit('changeInput', $event.target.files[0])"
        ref="inputUpload"
        type="file"
        hidden
      />
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
    <button title="Download" @click="$emit('clickDownload')" class="download">
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
    <button
      title="Save Telegram"
      @click="$emit('telegramSave')"
      class="telegram"
    >
      <svg
        width="54"
        height="54"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)" />
        <path
          d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_87_7225"
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#37BBFE" />
            <stop offset="1" stop-color="#007DBB" />
          </linearGradient>
        </defs>
      </svg>
    </button>
    <button class="active-float">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-plus"
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
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    activeInputUpload() {
      this.$refs.inputUpload.click();
    }
  }
};
</script>

<style>
.container-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 100000;
}
.container-float:hover {
  height: 240px;
  cursor: pointer;
}
.active-float {
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1px solid #0a2463;
  background: #0a2463;
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
.container-float:hover .download {
  visibility: visible;
  bottom: 60px;
}
.container-float:hover .upload {
  visibility: visible;
  bottom: 120px;
}
.container-float:hover .telegram {
  visibility: visible;
  bottom: 180px;
}
.download:hover:before {
  visibility: visible;
  background: #d8315b;
}
.upload:hover:before {
  visibility: visible;
  background: #283593;
}
.telegram:hover:before {
  visibility: visible;
  background: #1c6a97;
}
.download::before {
  content: "Download data";
  background: #d8315b;
  border: 1px solid #d8315b;
  position: absolute;
  left: -140px;
  padding: 0.5em;
  visibility: hidden;
}
.upload::before {
  content: "Import data";
  background: #283593;
  border: 1px solid #283593;
  position: absolute;
  left: -120px;
  padding: 0.5em;
  visibility: hidden;
}
.telegram::before {
  content: "Save Telegram data";
  background: #1c6a97;
  border: 1px solid #1c6a97;
  position: absolute;
  left: -180px;
  padding: 0.5em;
  visibility: hidden;
}
.download {
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1px solid #d8315b;
  background: #d8315b;
  color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 90080;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  align-items: center;
  transition: all 0.5s;
  visibility: hidden;
}
.upload {
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1px solid #283593;
  background: #283593;
  color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 9070;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  align-items: center;
  visibility: hidden;
  transition: all 1s;
}
.telegram {
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  z-index: 9070;
  display: flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  align-items: center;
  visibility: hidden;
  transition: all 1s;
}
.upload:active,
.download:active,
.telegram:active {
  border: none;
  outline: none;
  transform: scale(0.9);
}
</style>
