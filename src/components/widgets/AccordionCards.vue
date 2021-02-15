<template>
  <div class="accordion accordion-hover" id="js_demo_accordion-5">
    <div class="card">
      <div class="card-header">
        <a href="javascript:void(0);" class="card-title" data-toggle="collapse" data-target="#js_demo_accordion-5a" aria-expanded="true">
          <i class="fal fa-cog width-2 fs-xl"></i>
          Report settings
          <span class="ml-auto">
            <span class="collapsed-reveal">
              <i class="fal fa-chevron-up fs-xl"></i>
            </span>
            <span class="collapsed-hidden">
              <i class="fal fa-chevron-down fs-xl"></i>
            </span>
          </span>
        </a>
      </div>
      <div id="js_demo_accordion-5a" class="collapse show" data-parent="#js_demo_accordion-5">
        <div class="card-body">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array(),
      default: () => []
    }
  }
}
</script>