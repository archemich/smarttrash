<template>
    <section>
        <p>Окно менеджера</p>
        <vertical-list :users="drivers"></vertical-list>
        <user-card v-if="selectedUser" :user="selectedUser"></user-card>
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
    </section>
</template>

<script>
import VerticalList from '../components/VerticalList.vue';
export default {
  components: { VerticalList },
    middleware: 'authmanager',
    
    async asyncData({$axios, $cookie}){
        let data = await $axios.$get('/trashes');
        const trashes = data.trashes;
        let token = $cookie.get('token');
        let data2 = await $axios.$get('/users', {headers: {Authorization: token}});
        const drivers = data2.users;
        return { trashes, drivers };
    },

    data () {
        return {
            trashes : {},
            drivers: {},
            selectedUser: null,
            selectedUserRoute: {}
        }
    },

    created() {
        this.$nuxt.$on('userSelected', async (user) => {
            this.selectedUser = user;
            selectedUserRoute = await (this.$axios.$get(`/ways/${user.user_id}`));
            console.log(selectedUserRoute);
        })
    }
}
</script>

<style scoped>
</style>