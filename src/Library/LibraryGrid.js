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
  const [totalLibraryItems, setTotalLibraryItems] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const theme = useTheme();

  useEffect(() => {
    setTotalPages((Math.ceil(totalLibraryItems / 30)));
  }, [totalLibraryItems]);

  useEffect(() => {
    const library = getCollection(currentPage, searchText, '', genreFilterText, authorFilterText);

    if (library) {
      library
        .then((result) => {
          setLibraryData(result["member"]);
          setTotalLibraryItems(result["totalItems"])
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [currentPage, searchText, genreFilterText, authorFilterText]);

  useEffect(() => {
    const authors = getCollection(currentPage, searchText, 'author1');

    if (authors) {
      authors
        .then((result) => {
          const authorCollection = result["member"];
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
    setCurrentPage(1);
    setSearchText(event.target.value);
  };

  const handleSearchClear = () => {
    setCurrentPage(1);
    setSearchText("");
  };

  const onPaginationChange = (event, page) => {
    setCurrentPage(page);
  }

  // eslint-disable-next-line no-lone-blocks
  {
    /* todo:
        1. Reason Center Logo and Top Menu App Bar and bottom page bar.
        2. (done) Pagination.
        3. (Done) Filters
        4. (Done) Create a details modal.  (looking good) (fixed) - Possible refactor because of a bug. When clearing/changing a filter it doesn't clear filter on outside click.

        todo: Polishing:
        1. Refactor to more components (pagination).
        2. (Done) Have a skelton effect for the images. e.g. <Skeleton variant="rectangular" width={210} height={118} />
        3. Consider center the pagination since this has a centering look to the whole entire page.



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
            setCurrentPage(1);
            setGenreFilterText("");
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
            setCurrentPage(1);
            setAuthorFilterText("");
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
          <Pagination count={totalPages} shape="rounded" color="secondary" page={currentPage} onChange={onPaginationChange} />
        </Stack>
        <Grid
          container
          justifyContent={"center"}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          padding={theme.spacing(2, 0)}
        >
          {libraryData &&
            libraryData.map((book, index) => (
              <Card sx={{ width: 200, maxWidth: 200 }} key={index}>
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
        <Stack spacing={2} >
          <Pagination count={totalPages} shape="rounded" color="secondary" page={currentPage} onChange={onPaginationChange} />
        </Stack>
      </Box>
    </Container>
  );
}

export default LibraryGrid;
