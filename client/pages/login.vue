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
                const res = await this.$axios.$post('http://localhost:8080/auth/login', {login: this.login, password: this.password});
                token = res.token;
                let role = res.user.role;
                this.$cookie.set('token', token, {path: '/', maxAge: 3600});
                if (role === 0) {
                    this.$router.push('/driver');
                }
                else if (role === 1) {
                    this.$router.push('/manager');
                }
            }
            catch(e) {
                if (this.$cookie.get('token')) {
                    this.$cookie.remove('token');
                }
                console.log(e)
            }
        },
    },
}
</script>
   