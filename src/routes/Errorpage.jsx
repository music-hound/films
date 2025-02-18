import { useRouteError } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const viewportHeight = window.innerHeight;
  let height = viewportHeight-146-60;

  return (
    <div 
    id="error-page" 
    style={{
      height:height,
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      }}>
        <ErrorOutlineIcon
        sx={{
          fontSize:'80px',
          color:'#bb0000',
        }} />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i style={{color:'#bb0000'}}>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}