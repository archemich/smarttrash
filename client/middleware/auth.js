export default function ({app, redirect, store}) {
    let token = app.$cookie.get('token');
    app.$axios.post('/auth/verify', {token: token})
    .then((res) => {
        let verified = res.data.verified;
        if(!verified)
        {
            if (!!token) {
                store.dispatch('auth/logout');
            }
           return redirect('/login');
        }
    })
    .catch((e) => {
       console.log(e);
       store.dispatch('auth/logout');
       return redirect('/login');
    });
}