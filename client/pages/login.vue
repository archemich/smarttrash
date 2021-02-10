<template>
    <section>
        <section>
            <form action="" method="POST" @submit.prevent="onSubmit">
                <div>
                    <input v-model="login" id="login" name="login" type="text" autocomplete="username">
                    <label class="active truncate" for="login">Логин</label>
                </div>
                <div>    
                    <input v-model="password" id="password" name="password" type="password" autocomplete="current-password">
                    <label for="password">Пароль</label>
                </div>
                <button class="btn-large waves-effect waves-light" type="submit" value="OK" name="action">Войти</button>
            </form>
        </section>
        <section class="container">
            <a class="waves-effect waves-light btn" href="/">Назад</a>
        </section>
    </section>
</template>

<script>
export default {
    data: ()=> {
        return {
            login: null,
            password: null,
        }
    },

    methods: {
        async onSubmit(){

            let token;
            try {
                const res = await this.$axios.$post('/auth/login', {login: this.login, password: this.password});
                token = res.token;
                let role = res.user.role;
                let user = res.user;
                this.$store.dispatch("auth/login", {token,user});
                
                if (role === 0) {
                    this.$router.push('/driver');
                }
                else if (role === 1) {
                    this.$router.push('/manager');
                }
            }
            catch(e) {
                this.$store.dispatch('auth/logout');
                console.log(e)
            }
        },
    },
}
</script>
   