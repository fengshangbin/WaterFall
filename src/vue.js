
import { builder } from './utils';

const waterFallComponent = {
  name: "waterfall",

  inheritAttrs: false,

  props:{
    options: Object
  },

  data() {
    return {
      waterfall: null
    };
  },

  render(createElement) {
    return createElement('div', {
      attrs: {}
    }, this.$slots.default)
  },

  created() {
    if (this.options == null) {
      console.error(
        "waterfall need to set options"
      );
    }
  },

  mounted() {
    this.waterFall = WaterFall.builder(this.$el, this.options);
    this.waterFall.addEventListener("touchtop", this.touchtop);
    this.waterFall.addEventListener("touchbottom", this.touchbottom);
  },

  beforeDestroy() {
    if (this.waterFall !== undefined){
      this.waterFall.destroy();
      this.waterFall.removeEventListener("touchtop", this.touchtop);
      this.waterFall.removeEventListener("touchbottom", this.touchbottom);
    }
  },

  computed: {
    
  },

  watch: {
    options: {
      handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    }
  },

  methods: {
    touchtop() {
      this.$emit("touchtop");
    },
    touchbottom() {
      this.$emit("touchbottom");
    },
    update(){
      if (this.waterFall !== undefined) this.waterFall.update();
    }
  }
};

if (typeof window !== "undefined" && "Vue" in window) {
  window.Vue.component("waterfall", waterFallComponent);
}

export default waterFallComponent;
