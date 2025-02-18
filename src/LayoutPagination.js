import { Pagination } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "./state/actions";

export default function LayoutPagination({sx}){

    const page = useSelector(state => state.changePage);
    const dispatch = useDispatch();

    return (
        <Pagination
          page={page}
          size="small"
          siblingCount={1}
          boundaryCount={1}
          onChange={(event, value)=>{
            dispatch(changePage(value))
          }}
            sx={{
              ...sx,
            }}
            count={50} 
            color="prismary"
          />
    )
}