<template>
    <section>
        <p>Окно менеджера</p>
        <vertical-user-list :users="drivers"></vertical-user-list>
        <div class="vif-container" v-if="selectedUser">
            <user-card :user="selectedUser"></user-card>
            <button @click="cancelButtonHandler">Отменить</button>
        </div>
        <div id="map-wrap" style="height: 100vh">
            <client-only>
                <l-map :zoom=13 :center="[47.221100, 38.914639]">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                    <div>
                        <l-marker v-for="trash of trashes" :key="trash.trash_id" :lat-lng="[trash.lat, trash.lng]" :icon="custom_icon">
                            <l-tooltip>Заполненность контейнера: {{ trash.percent }}%<br> Заряд датчика: {{ trash.battery }}%</l-tooltip>
                        </l-marker>
                    </div>
                    <div>
                        <l-marker @click="markerClickHandler(trash.trash_id)" v-for="trash of selectedUserRoute" :key="trash.trash_id" :lat-lng="[trash.lat, trash.lng]"></l-marker>
                    </div>
                </l-map>
            </client-only>
        </div>
    </section>
</template>

<script>
import VerticalUserList from '../components/VerticalUserList.vue';
export default {
  components: { VerticalUserList },
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
            selectedUserRoute: null,
            custom_icon: L.icon ({
                iconUrl: require('@/static/marker.png'),
                iconSize: [27,30],
                iconAnchor: [14, 30]
                
                
            })
        }
    },

    created() {
        this.$nuxt.$on('userSelected', (user) => {
            this.selectedUser = user;
            let token = this.$cookie.get('token');
            this.$axios.$get(`/ways/${user.user_id}`, {headers: {Authorization: token}})
            .then((res) => {
                this.selectedUserRoute = res.way;
            })
            .catch((e) => {
                console.error('Error occured '+e);
            });
            
        })
    },
    
    methods: {
        cancelButtonHandler() {
            this.selectedUser = null;
            this.selectedUserRoute = null; 
        },

        markerClickHandler(id) {
            
        }
    }
}
</script>

<style scoped>
</style>