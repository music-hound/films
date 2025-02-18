import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import { Form } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userStatusChange } from '../state/actions';

export default function Account(){
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const user_status = useSelector(state => state.userStatusChange);
    const dispatch = useDispatch();


    function getAccountId(token){
        const url = 'https://api.themoviedb.org/3/account/account_id';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: token,
            }
        };
        fetch(url, options)
        .then(res => res.json())
        .then(json => setCookie('accountId',json.id))
        .catch(err => console.error(err));
    }

    const viewportHeight = window.innerHeight;


    let height = viewportHeight-146-60;

    return (
    <Box
    sx={{
        boxSizing:'border-box',
        padding: '64px 20px',
        height:`${height}px`,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    }}
    >
        <Typography
        variant='h5'
        sx={{
            textAlign:'center',
        }}
        >
            {(user_status ==='logged_out') && 'Вы не вошли в аккаунт'}
            {(user_status ==='waiting_token') && `Проверьте почту,`}
            {(user_status ==='logged_in') && `Добро пожаловать ${cookies.name}!`}
        </Typography>

        <Typography
        sx={{
            wordBreak:'break-all',
            mt:2,
            width:'300px',
            textAlign:'center',
        }}
        >
            {(user_status ==='logged_out') && 'Введите почту на который отправить токен.'}
            {(user_status ==='waiting_token') && `токен ждет вас в письме.`}
        </Typography>
        <Box
            sx={{
                width:'300px'
            }}>
            
        {user_status ==='logged_out' &&
            <Form
            onSubmit={(event)=>{
                event.preventDefault()
                setCookie('isLogged', 'waiting_token', {
                        path: '/',
                    })
                setCookie('name', event.target.elements.name.value, {
                    path: '/',
                })
                dispatch(userStatusChange('waiting_token'))
            }}>
                <TextField
                required
                sx={{
                    mt:6
                }}
                fullWidth
                id="outlined-basic"
                label="Введите имя"
                name='name'
                variant="outlined" 
                />
                <TextField
                required
                sx={{
                    mt:2
                }}
                fullWidth
                id="outlined-basic"
                label="Введите почту"
                name='email'
                variant="outlined" 
                />

                <Button
                type='submit'
                size='large'
                sx={{
                    mt:2
                }}
                fullWidth
                variant="contained"
                >
                    Получить ссылку
                </Button>
                
            </Form>
        }

        {user_status ==='waiting_token' &&
            <Form
            onSubmit={(event)=>{
                event.preventDefault()
                setCookie('isLogged', 'logged_in', {
                        path: '/',
                    })
                setCookie('token', event.target.elements.token.value, {
                    path: '/',
                })
                getAccountId(event.target.elements.token.value)
                dispatch(userStatusChange('logged_in'))
            }}>
                <TextField
                required
                sx={{
                    mt:6
                }}
                fullWidth
                id="outlined-basic"
                label="Введите токен"
                name='token'
                variant="outlined" 
                />

                <Button
                type='submit'
                size='large'
                sx={{
                    mt:2
                }}
                fullWidth
                variant="contained"
                >
                    Войти
                </Button>

                <Button
            onClick={()=>{
                removeCookie('isLogged')
                dispatch(userStatusChange('logged_out'))
            }}
            size='large'
                sx={{
                    mt:1
                }}
                fullWidth
                variant="contained"
            >
                Отмена
            </Button>
                
            </Form>
        }

        {user_status ==='logged_in' && 
            <Button
            onClick={()=>{
                removeCookie('token')
                removeCookie('accountId')
                removeCookie('name')
                removeCookie('isLogged')
                dispatch(userStatusChange('logged_out'))
            }}
            size='large'
                sx={{
                    mt:2
                }}
                fullWidth
                variant="contained"
            >
                Выйти
            </Button>
        }
        </Box>

    </Box>
    )
}