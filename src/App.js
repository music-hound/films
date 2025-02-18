import Root from './routes/Root.jsx';
import Home from './routes/Home.jsx'
import Movie from './routes/Movie.jsx'
import ErrorPage from './routes/Errorpage.jsx';
import Account from './routes/Account.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import { useSelector } from 'react-redux';
import createAppTheme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const App = () => {

  const isLight = useSelector((state)=>state.isLight)

  const theme = createAppTheme(isLight);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement:<ErrorPage />,
      children:[
        {
        errorElement:<ErrorPage />,
        children:[
          {
            path:'/',
            element: <Home />,
          },
          {
            path:'movie/:movieId',
            element: <Movie />,
          },
          {
            path:'account',
            element: <Account />,
          },
      ],
    }]
    },
  ],{
    future:{
      v7_fetcherPersist:true,
      v7_normalizeFormMethod:true,
      v7_partialHydration:true,
      v7_skipActionErrorRevalidation:true,
    }
  });

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
    
    <div style={{
        paddingTop:'60px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
      }}>
        
        <RouterProvider
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath:true,
        }}
        router={router} />
    </div>
    
    </ThemeProvider>
  );
}

export default App;
