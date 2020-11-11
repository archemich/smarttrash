<template>
    <div class="container">
        <NuxtLink to="/">Home</NuxtLink>
        <yandex-map
        :coords="[47.221463, 38.914256]"
        zoom="12"
        @map-was-initialized="initHandler"
        >
            <ymap-marker v-for="trash of trashs" :key="trash.trash_id" 
            :marker-id="trash.trash_id" 
            :coords="[trash.lat, trash.lng]"
            :hint-content="'Заполненость мусорки: ' + trash.percent + '%<br />Заряд датчика: ' + trash.battery + '%'">
            </ymap-marker>


        </yandex-map>
    </div>
</template>

<script>
export default {
    async asyncData({$axios}){
        const data = await $axios.$get('http://localhost:8080/trash');
        const trashs = data.data.trashs;
        return { trashs };
    },

    data () {
        return {
            trashs : {},
            myMap : null,
        }
    },

    mounted() {
    },

    methods: {
        initHandler: function(event)
            {
                this.myMap = event
                console.log(this.myMap);
            }
    }
}
</script>

<style scoped>
    .ymap-container {
        height: 90vh;
        width: 90vw;
    }
</style>