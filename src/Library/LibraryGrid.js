import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Card,
  CardActionArea,
  CardContent,
  Container,
  InputAdornment, Pagination, Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import getCollection from "../Api/LibraryApi";
import { useEffect, useState } from "react";
import OpenLibraryCardMedia from "../Helpers/OpenLibraryCardMedia";
import ClearIcon from "@mui/icons-material/Clear";
import BookDetails from "./BookDetails";

function LibraryGrid() {
  const [libraryData, setLibraryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [authorFilterText, setAuthorFilterText] = useState("");
  const [genreFilterText, setGenreFilterText] = useState("Science and Pseudoscience");
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentModalId, setCurrentModalId] = useState(null);


  const theme = useTheme();

  useEffect(() => {
    const library = getCollection(1, searchText, '', genreFilterText, authorFilterText);
    console.log(library);
    if (library) {
      library
        .then((result) => {
          setLibraryData(result["member"]);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [searchText, genreFilterText, authorFilterText]);

  useEffect(() => {
    const authors = getCollection(1, searchText, 'author1');

    if (authors) {
      authors
        .then((result) => {
          const authorCollection = result["member"];
          const test = authorCollection.map((author) => (author.author1));
          console.log(test);
          setAuthors(authorCollection.map((author) => (author.author1)));
        })
        .catch((err) => {
          console.log("error", err);
        });
    }

    const genres = getCollection(1, searchText, 'genre');

    if (genres) {
      genres
        .then((result) => {
          const genreCollection = result["member"];
          setGenres(genreCollection.map((genre) => (genre.genre)));
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [searchText]);

  const onSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClear = () => {
    setSearchText("");
  };

  // eslint-disable-next-line no-lone-blocks
  {
    /* todo:
        1. (Working) Pagination.
        2. Reason Center Logo and Top Menu App Bar, [Done: Search clear (x) button].
        3. (Done) Filters
        4. (Done) Create a details modal.  (looking good) (fixed) - Possible refactor because of a bug. When clearing/changing a filter it doesn't clear filter on outside click.
     */
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Welcome to Reason Center Library.
      </Typography>

      { /* Search text for library grid display. */ }
      <TextField
        value={searchText}
        fullWidth
        placeholder={"Search book titles in the library"}
        onChange={onSearchChange}
        sx={{ margin: theme.spacing(2, 0) }}
        slotProps={{
          input: {
            endAdornment: searchText !== '' && (
              <InputAdornment position="end">
                <ClearIcon
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  aria-label="clear"
                  onClick={handleSearchClear}
                ></ClearIcon>
              </InputAdornment>
            ),
          },
        }}
      />

      { /* Filters for organization of data:  */ }
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', margin: theme.spacing(2, 0) }}>
        <Autocomplete
          value={authorFilterText}
          onChange={(event, newValue) => {
            setAuthorFilterText(newValue);
          }}
          openOnFocus
          options={authors}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Filter By Author..." variant="standard" />}
        />

        <Autocomplete
          value={genreFilterText}
          onChange={(event, newValue) => {
            setGenreFilterText(newValue);
          }}
          openOnFocus
          options={genres}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Filter By Genre..." variant="standard" />}
        />
      </Box>

      { /* Library Grid display. */ }
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Pagination count={4} shape="rounded" />
        </Stack>
        <Grid
          container
          justifyContent={"center"}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {libraryData &&
            libraryData.map((book, index) => (
              <Card sx={{ maxWidth: 200 }} key={index}>
                <CardActionArea onClick={() => (setCurrentModalId(index)) } >
                  <BookDetails bookInformation={book} open={currentModalId === index} openHandler={setCurrentModalId}/>
                  <OpenLibraryCardMedia bookIsbn={book.isbn10} />
                  <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                      {book.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {book.author1}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default LibraryGrid;
