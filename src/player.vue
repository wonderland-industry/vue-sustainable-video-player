<template>
  <div
    class="sustainable-video-player"
    v-intersection="{ callback: checkCanPlay, multiple: true }"
  >
    <div class="progress" v-show="!isPlaying" v-if="indicator">
      <div
        :class="{ isWaiting }"
        :style="`transition: ${inViewportDuration}ms transform;`"
        class="inner"
        ref="progressInner"
      ></div>
    </div>
    <video
      :height="height"
      :src="videoSrc"
      :width="width"
      muted
      ref="video"
      v-bind="boundOptions"
    />
  </div>
</template>
<script>
const DEFAULT_EVENTS = [
  "loadeddata",
  "canplay",
  "canplaythrough",
  "play",
  "pause",
  "waiting",
  "playing",
  "ended",
  "error",
];

export default {
  name: "sustainable-video-player",
  props: {
    inViewportDuration: {
      type: Number,
      default: 3000, // 3 seconds
    },
    src: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: undefined,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    globalOptions: {
      type: Object,
      default: () => ({
        controls: false,
        preload: "metadata",
        loop: true,
        crossOrigin: "anonymous",
        playsinline: true,
      }),
    },
    indicator: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    videoSrc() {
      return this.src + "#t=0.1"; // load only first 0.1 of video for poster
    },
    boundOptions() {
      return {
        ...this.globalOptions,
        ...this.options,
      };
    },
  },
  data() {
    return {
      isPlaying: false,
      isWaiting: false,
    };
  },
  methods: {
    checkCanPlay() {
      if (this.isPlaying) return;
      if (this.$refs.progressInner) {
        this.isWaiting = true;
      }

      setTimeout(() => {
        if (this.$el.isIntersecting && !this.isPlaying) {
          this.$refs.video.play();
          this.isPlaying = true;
        } else {
          if (this.$refs.progressInner) {
            this.isWaiting = false;
          }
        }
      }, this.inViewportDuration);
    },
    initEventListeners() {
      this.events = [];
      DEFAULT_EVENTS.forEach((item) => {
        const cb = ($event) => {
          this.$emit(item, $event);
        };
        this.events.push(cb);
        this.$refs.video.addEventListener(item, cb);
      });
    },
  },
  beforeDestroy() {
    DEFAULT_EVENTS.forEach((item, i) => {
      this.$refs.video.removeEventListener(item, this.events[i]);
    });
  },
  mounted() {
    this.initEventListeners();
  },
};
</script>
<style>
.sustainable-video-player {
  width: 100%;
  height: 100%;
}

.sustainable-video-player .progress {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 2px;
  transform: translate(-50%, -50%);
  background-color: black;
}
.sustainable-video-player .progress .inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  transform: scaleX(0);
  transition-timing-function: linear;
}

.sustainable-video-player .progress .inner.isWaiting {
  transform: scaleX(1);
}
</style>
