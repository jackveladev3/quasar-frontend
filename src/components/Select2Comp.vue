<template>
    <select :id="id" class="select2 form-control w-100" v-model="item_selected">
        <template v-for="item in items">
            <option :value="item" v-bind:key="item">{{ item }}</option>
        </template>
    </select>
</template>

<script>
import $ from 'jquery';

export default {
    name: 'Select2Component',
    props: {
        id: String,
        items: Array,
    },
    data() {
        return {
            item_selected: ''
        }
    },
    mounted: function() {
        // var self = this;
        $(".select2").select2();
    },
    methods: function () {
        
    }
}
</script>