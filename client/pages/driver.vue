<template>
    <div class="container">
        <NuxtLink to="/">Home</NuxtLink>
        <yandex-map
        :coords="[47.221463, 38.914256]"
        zoom="12"
        v-on:map-was-initialized="initHandler"
        />
    </div>
</template>


<script>
export default {
    data() { return {
        myMap: null
    }},

    mounted(){
        
    },

    methods: {
        inithandler: function(obj) {
            alert(obj);
        }
    }
}
</script>