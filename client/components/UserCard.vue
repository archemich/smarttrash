<template>
    <div class="card">
        <div class="container">
            <h1>User Id: {{user.user_id}}</h1>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'user',
    ] 
}
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  height: 200px;
  width: 150px;
}
/* On mouse-over, add a deeper shadow */

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
</style>