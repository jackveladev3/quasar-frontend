<template>
    <q-scroll-area style="overflow: hidden;" class="bottom-reaching-div">
      <div style="overflow: auto;">
        <slot></slot>
      </div>
    </q-scroll-area>
</template>

<script>
export default {
  name: 'BottomReachingScrollArea',
  data(){
    return {
      minimum_height: 280
    }
  },
  mounted() {
    // console.log("BottomReachingDiv Created");
    this.update_size(this.$el);
    window.addEventListener("resize", this.update_size);
    // this.$el.addEventListener("change", this.update_size(this.$el));
  },
  methods:{
    update_size(){
      // console.log("BottomReachingDiv Size Updated");
      let parent_rect = this.visible_parent_rect(this.$el)
      let window_height = window.innerHeight;  // This could probably be put into a store

      // console.log("window_height:\t" + window_height.toString());
      // console.log("parent_rect");
      // console.log(parent_rect);

      if ((window_height - parent_rect.top)*.8 > this.minimum_height){
        //Ok, so, this .8 thing is a hack.  Really I should look up recursively (something like parent_bottom_space) at each parent until I hit on with a border (maybe?) and sum all the padding & margin and include that in the height calculation above
        let remaining_bottom_space = (window_height - parent_rect.top)*.8;
        // console.log("Will try to set this.$el.style.height to " + remaining_bottom_space.toString() + "px");
        this.$el.style.height = remaining_bottom_space.toString() + "px";
        // console.log("Bottom reaching div height set to (T):\t'" + this.$el.style.height + "'\t" + remaining_bottom_space.toString());
      } else {
        this.$el.style.height = this.minimum_height.toString() + "px";
        // console.log("Bottom reaching div height set to (F):\t" + this.$el.style.height);
      }
      this.$el.style.width = "100%";
      // console.log("Bottom reaching div width set to:\t" + this.$el.style.width);
    },
    parent_bottom_space(space_so_far){
      if (this.$el.parentElement){
        if (this.$el.parentElement.style.border != ""){
          return space_so_far + this.$el.parentElement.style.border;
        } else {
          return this.parent_bottom_space(this.$el.parentElement, space_so_far + this.$el.parentElement.style.border);
        }
      } else {
        return space_so_far
      }
    },
    visible_parent_rect(element){
      let parent = element.parentElement;
      let parent_rect = parent.getBoundingClientRect();

      if (parent_rect.height == 0 || !parent.classList.contains("panel-content")){  //this too is a hack, perhaps it should be made a parameter for the component
        return this.visible_parent_rect(parent);
      } else {
        // console.log("panel-content");
        // console.log(this.$el);
        return parent_rect;
      }
    }
  }
}
</script>