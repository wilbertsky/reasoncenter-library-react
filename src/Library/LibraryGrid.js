import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container, TextField,
  Typography, useTheme
} from "@mui/material";
import getCollection from "../Api/LibraryApi";
import { useEffect, useState } from "react";
import checkUrlFor404 from "../Api/imageCheckApi";
import OpenLibraryCardMedia from "../Helpers/OpenLibraryCardMedia";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

// Get data from API.
// Get the ISBN.
// Show the image in the Grid container from Open Library.

// Add "Welcome to Reason Center Library" with a small blurb of what books we have.





function LibraryGrid() {
  const [libraryData, setLibraryData] = useState([])
  const [filterText, setFilterText] = useState('');

  const theme = useTheme();

  useEffect(() => {
    const library = getCollection(1, filterText);
    if (library) {
      library
        .then(result => {
          console.log(result);
          console.log(result["member"])
          setLibraryData(result["member"]);
          console.log(libraryData);
        })
        .catch(err => {
          console.log('error', err);
        });
    }

    // https://covers.openlibrary.org/b/isbn/0879758392-M.jpg

    console.log(library);
    console.log(libraryData);
  }, [filterText]);

  const onFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Welcome to Reason Center Library.
      </Typography>

      <TextField fullWidth placeholder={"Search book titles in the library"} onChange={onFilterChange} sx={{ margin: theme.spacing(2, 0) }}/>
      
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent={"center"} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {libraryData && libraryData.map((book, index) => (
            <Card sx={{ maxWidth: 200 }}>
              <CardActionArea>
                <OpenLibraryCardMedia bookIsbn={book.isbn10} />
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {book.author1}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Book Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Box>
    </Container>

  );

}

export default LibraryGrid;