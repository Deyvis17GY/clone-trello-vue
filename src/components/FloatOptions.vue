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
  height: 180px;
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
.download:hover:before {
  visibility: visible;
  background: #d8315b;
}
.upload:hover:before {
  visibility: visible;
  background: #283593;
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
  left: -140px;
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
.upload:active,
.download:active {
  border: none;
  outline: none;
  transform: scale(0.9);
}
</style>
