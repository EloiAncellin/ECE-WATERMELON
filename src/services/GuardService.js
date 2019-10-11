export function redirectIfNotAuth(props){
        const user = localStorage.getItem('user');
        console.log(user);
        if(user === null || user=== undefined){
                props.history.push('/login');

        }else{
                return true;
        }
}
