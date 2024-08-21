import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import {useQuery} from '@tanstack/react-query'

const MainPage = () => {


    
 type Universities = {
    country: string,
    domains: string[],
    web_pages: string[],
    name: string,
    alpha_two_code: string
}

  const postsQuery = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await fetch("http://universities.hipolabs.com/search?name=middle");

      return response.json();
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if(postsQuery.isError){
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }
 



  return (

     

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
 
        <TableRow >
          <TableCell sx={{fontWeight:'bold'}}>Country</TableCell>
          <TableCell sx={{fontWeight:'bold'}} align="right">Name</TableCell>
          <TableCell sx={{fontWeight:'bold'}} align="right">Code</TableCell>
        </TableRow>

      </TableHead >
      <TableBody>
        {postsQuery.data?.map((data:Universities) => (
          <TableRow
            key={data.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
<TableCell>{data.country}</TableCell>
          <TableCell align="right">{data.name}</TableCell>
          <TableCell align="right">{data.alpha_two_code}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  )
}

export default MainPage