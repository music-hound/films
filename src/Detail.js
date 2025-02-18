import { Box } from "@mui/material";

export default function Detail({ title, children}){
    return (
        <Box sx={{
            mt:2,
            pr:2,
            display:'flex',
            justifyContent:"space-between",
            }}>
            <Box sx={{alignSelf:'center'}}>{title}</Box>
            <Box sx={{width:'70%', textAlign:'right'}}>{children}</Box>
        </Box>
    )
}