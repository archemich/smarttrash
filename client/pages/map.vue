<template>
    <div id="map-wrap" style="height: 100vh">
        <client-only>
            <l-map :zoom=13 :center="[47.221100, 38.914639]">
                <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                <l-marker v-for="trash of trashes" :key="trash.trash_id" :lat-lng="[trash.lat, trash.lng]">
                    <l-tooltip>Заполненность контейнера: {{ trash.percent }}%<br> Заряд датчика: {{ trash.battery }}%</l-tooltip>
                </l-marker>
            </l-map>
        </client-only>
    </div>
</template>

<script>
export default {
    async asyncData({$axios}){
        let data = await $axios.$get('/trashes');
        const trashes = data.trashes;
        return { trashes };
    },

    data () {
        return {
            trashes : {},
        }
    },

    mounted() {
    },

    methods: {
    }
}
</script>

<style scoped>
</style>
