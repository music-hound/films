import { Box, CardMedia, Typography } from "@mui/material";

export default function StackItem( { title, image } ){
    return (
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <CardMedia
        sx={{
          width:'30px',
          height:'30px'
        }}
        image={image}
        />

        <Typography
        fontSize={'12px'}
      color='#888'>
        {title}
        </Typography>

        </Box>
    )
}