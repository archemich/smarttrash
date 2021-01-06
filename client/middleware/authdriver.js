export default function ({app, redirect}) {
    let token = app.$cookie.get('token');
    app.$axios.post('http://localhost:8080/auth/verify', {token: token})
    .then((res) => {
        let verified = res.data.verified;
        if(!verified)
        {
            if (!!token) {
                app.$cookie.remove('token');
            }
           return redirect('/login');
        }
        let role = res.data.role;
        if (role !== 0)
        {
            return redirect('/login');
        }
    })
    .catch((e) => {
       return redirect('/login');
    });
}