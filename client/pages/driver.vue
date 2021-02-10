<template>
    <section>
        <p>Окно водителя</p>
        <div id="map-wrap" style="height: 100vh">
            <client-only>
                <l-map :zoom=13 :center="[47.221100, 38.914639]">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                    <l-marker v-for="trash of trashes" :key="trash.trash_id" :lat-lng="[trash.lat, trash.lng]">
                    </l-marker>
                </l-map>
            </client-only>
        </div>
    </section>
</template>

<script>
export default {
    middleware: 'authdriver',
    
    async asyncData({$axios, store, $cookie}){
        let user = store.getters['auth/User'];
        let token = $cookie.get('token');
        let trashes = (await $axios.$get("/ways/me", {user: user, headers: {Authorization: token}})).way;
        return { trashes, user };
    },

    data () {
        return {
            trashes : {},
            user: undefined
            
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
