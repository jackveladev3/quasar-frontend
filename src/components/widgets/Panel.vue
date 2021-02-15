<template>
  <div :class="outer_class" >
    <div :id="id" class="panel">
      <div class="panel-hdr" v-show="show_header">
        <h2>
          {{ title }} <span class="fw-300"><i>{{ subtitle }}</i></span>
        </h2>
        <div class="panel-toolbar">
          <button class="btn btn-panel" data-action="panel-collapse" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse"></button>
          <button class="btn btn-panel" data-action="panel-fullscreen" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen"></button>
        </div>
      </div>
      <div :class="['panel-container', (show_container === true ? 'show' : '')]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panel',

  props: {
    outer_class: {
      type: String,
      default: 'col-xs-12'
    },
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Title'
    },
    subtitle: {
      type: String,
      default: 'Subtitle'
    },
    show_container: {
      type: Boolean,
      default: true
    },
    show_header: {
      type: Boolean,
      default: true
    }
  }
}
</script>