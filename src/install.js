/*
 * Sustainable Video Player
 * Author: maarten@wonderlandams.com
 * Github:
 */
import intersectionDirective from "./intersectionDirective.js";
import videoPlayer from "./player.vue";

const install = function (Vue, config) {
  Vue.directive("intersection", intersectionDirective);
  if (config) {
    if (config.options) {
      videoPlayer.props.globalOptions.default = () => config.options;
    }
  }
  Vue.component("SustainableVideoPlayer", videoPlayer);
};

const SustainableVideoPlayer = { videoPlayer, install };

export default SustainableVideoPlayer;
export { videoPlayer, install };
