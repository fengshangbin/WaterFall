
import {builder as waterfall} from 'easy-waterfall/src/index';

//console.log(waterfall);

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
    //console.log(this.$el, this.options);
    this.waterFall = new waterfall(this.$el, this.options);
    //console.log(this.waterFall);
    this.waterFall.addEventListener("touchtop", this.touchtop);
    this.waterFall.addEventListener("touchbottom", this.touchbottom);
  },

  beforeDestroy() {
    if (this.waterFall !== undefined){
      this.waterFall.destroy();
      this.waterFall.removeEventListener("touchtop", this.touchtop);
      this.waterFall.removeEventListener("touchbottom", this.touchbottom);
      this.waterFall = null;
    }
  },

  computed: {
    
  },

  watch: {
    options: {
      handler(newOptionValue) {
        if (this.waterFall !== undefined){
          //console.log(newOptionValue);
          this.waterFall.updateOptions(newOptionValue);
        }
      },
      deep: true
    }
  },

  methods: {
    touchtop() {
      this.$emit("touchtop");
    },
    touchbottom() {
      //console.log("touchbottom");
      this.$emit("touchbottom");
    },
    update(){
      if (this.waterFall !== undefined) this.waterFall.update();
    },
    showLoading(){
      if (this.waterFall !== undefined) this.waterFall.showLoading();
    },
    hideLoading(){
      if (this.waterFall !== undefined) this.waterFall.hideLoading();
    }
  }
};

if (typeof window !== "undefined" && "Vue" in window) {
  window.Vue.component("waterfall", waterFallComponent);
}

export default waterFallComponent;
