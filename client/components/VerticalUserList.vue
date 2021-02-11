<template>
    <div class="vertical-menu">
        <button v-for="user of users" :key="user.user_id" @click="$nuxt.$emit('userSelected', user)">{{user.user_id}}</button>
    </div>
</template>

<script>
export default {
  props: [
    'users',
  ]
}
</script>

<style scoped>
.vertical-menu {
  width: 200px;
  height: 150px;
  overflow-y: auto;
}

.vertical-menu button {
  background-color: #eee; /* Grey background color */
  color: black; /* Black text color */
  display: block; /* Make the links appear below each other */
  padding: 12px; /* Add some padding */
  text-decoration: none; /* Remove underline from links */
}

.vertical-menu button:hover {
  background-color: #ccc; /* Dark grey background on mouse-over */
}

.vertical-menu button.active {
  background-color: #4CAF50; /* Add a green color to the "active/current" link */
  color: white;
}
</style>