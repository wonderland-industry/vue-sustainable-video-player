# Vue-Sustainable-Video-Player

A sustainable video player for Vue. Loads only the first frame of video, and plays when x seconds in viewport.

# Install

#### NPM
``` bash
npm install vue-sustainable-video-player --save
```

### Mount

#### mount with global

``` javascript
import Vue from 'vue'
import SustainableVideoPlayer from 'vue-sustainable-video-player'

// require vue-sustainable-video-player style
import 'vue-sustainable-video-player/dist/vue-sustainable-video-player.css'

Vue.use(SustainableVideoPlayer, /* {
  options: global default options,
} */)
```

#### mount with component

```javascript
// require styles
import 'vue-sustainable-video-player/dist/vue-sustainable-video-player.css'

import { SustainableVideoPlayer } from 'vue-sustainable-video-player'

export default {
  components: {
    SustainableVideoPlayer
  }
}
```


### SPA

``` vue
<template>
  <sustainable-video-player  
     ref="videoPlayer"
     :options="playerOptions"
     :inViewportDuration="3000"
     width="800"
     height="400"
     :indicator="true"

     @play="onPlayerPlay($event)"
     @pause="onPlayerPause($event)"
     @ended="onPlayerEnded($event)"
     @waiting="onPlayerWaiting($event)"
     @playing="onPlayerPlaying($event)"
     @loadeddata="onPlayerLoadeddata($event)"
     @timeupdate="onPlayerTimeupdate($event)"
     @canplay="onPlayerCanplay($event)"
     @canplaythrough="onPlayerCanplaythrough($event)"
  </sustainable-video-player>
</template>

<script>
  export default {
    data() {
      return {
        playerOptions: {
          poster: "/static/images/author.jpg",
          controls: true,
          preload: "metadata",
          crossOrigin: "anonymous"
        }
      }
    },
  }
</script>
```

