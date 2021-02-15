<template>
  <div class="row pb-2 mb-3 border-faded border-top-0 border-right-0 border-left-0">
    <div class="col-12 fs-sm mb-2">
      <a :href="data.link">
        <span class="fw-500">{{ data.title }}</span>
      </a>
    </div>

    <div class="col-6 fs-nano text-muted text-uppercase">
      {{ data.source_name }}
    </div>
    <div class="col-6 fs-nano text-muted text-truncate text-truncate-sm">
      {{ data.published_date }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        title: 'This is a title',
        link: '#',
        source_name: 'Source',
        published_date: 'hh:mm mm/dd/yyyy'
      })
    }
  }
}
</script>