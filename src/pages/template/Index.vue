<template>
    <div id="app">
       
            <div class="item">
                <div class="player" style="width:400px">
                <video-player  class="vjs-custom-skin"
                    ref="videoPlayer"
                    :options="playerOptions"
                >
                </video-player>
                </div>
            </div>
    </div>  
</template>

<script>
  // custom skin css
  import '../../../node_modules/vue-video-player/src/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  export default {
    data() {
      return {
        // videojs options
        playerOptions: {
          width: '784',
          autoplay: false,
          muted: false,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            // mp4
            src: "http://vjs.zencdn.net/v/oceans.mp4",
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
        }
      }
    },
    mounted() {
      // console.log('this is current player instance object', this.player)
     
    },
    computed: {
      
    },
    methods: {
      
    },
    components:{
        videoPlayer
    }
  }
</script>

