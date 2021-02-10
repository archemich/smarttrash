<template>
  <section class="container">
		<div>
			<h1 class="title">
				SmartTrash
			</h1>
			<h2 class="subtitle">
				Отслеживание уровня заполнености контейнера.
			</h2>
			<div class="links">
				<NuxtLink to="/map" class="button--green">Карта</NuxtLink>
				<NuxtLink v-if="!LoggedIn" to="/login" class="button--green">Вход</NuxtLink>
				<NuxtLink v-else to="#" @click.native="onLogout" class="button--green" id="logout">Выход</NuxtLink>

			</div>
		</div>
	</section>
</template>

<script>
export default {
	computed: {
		LoggedIn () {
		  	return this.$store.getters['auth/LoggedIn']
		}
	},
	
	
	methods: {
		onLogout: ({view:{$nuxt:{context}}}) => {
			context.store.dispatch('auth/logout')
		}
	}
	
}
</script>

<style scoped>
		html{
      font-family:"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
      font-size:16px;word-spacing:1px;-ms-text-size-adjust:100%;
      -webkit-text-size-adjust:100%;
      -moz-osx-font-smoothing:grayscale;
      -webkit-font-smoothing:antialiased;
      box-sizing:border-box
      }*,

    :before,:after{box-sizing:border-box;margin:0}
    .button--green{display:inline-block;border-radius:4px;border:1px solid #3b8070;color:#3b8070;text-decoration:none;padding:10px 30px}
    .button--green:hover{color:#fff;background-color:#3b8070}.container{min-height:100vh;display:flex;justify-content:center;align-items:center;text-align:center}
	.title{font-family:"Quicksand","Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;display:block;font-weight:300;font-size:100px;color:#35495e;letter-spacing:1px}
    .subtitle{font-weight:300;font-size:42px;color:#526488;word-spacing:5px;padding-bottom:15px}.links{padding-top:15px}


</style>