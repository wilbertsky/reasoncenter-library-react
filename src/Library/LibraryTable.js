import { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";


function LibraryTable() {
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 30 });
  const [totalRowsFromApi, setTotalRowsFromApi] = useState(30);
  const [loading, setLoading] = useState(false);

  const handlePaginationModelChange = (newPaginationModel) => {
    console.log("newPaginationModel", newPaginationModel);
    const newPage = newPaginationModel.page + 1;
    setPaginationModel(newPaginationModel);
    console.log("page", newPage);
    setLoading(true);
    console.log("loading", loading);
    console.log("paginationModel", paginationModel);

    // const libraryData = getCollection(newPage);
    //
    // // const libraryData = <LibraryApi page={newPage} />;
    // console.log(libraryData);
    // if (libraryData !== undefined) {
    //   // console.log("entered library data", libraryData);
    //   // const libraryDataPromise = use(libraryData);
    //   setLibraryBooks(libraryData);
    //   setTotalRowsFromApi(libraryData["totalItems"]);
    //   setLoading(false);
    // }


    // Make API call to fetch data for newPaginationModel.page and newPaginationModel.pageSize
    fetch(`https://localhost/api/books?page=${newPage}`)
      .then(response => {
        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("fetching", loading);

        // Parse the response body as JSON
        return response.json();
      })
      .then(data => {
        // Handle the successful data
        console.log("Data received:", data);
        setLibraryBooks(data);
        setTotalRowsFromApi(data["totalItems"]);
        setLoading(false);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch or processing
        console.error("Fetch error:", error);
      })
      .finally(() => {
        // This block will always execute, regardless of success or failure
        console.log("Fetch operation completed (finally block executed).");
      });
  };


  const onFilterChange = useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    console.log(filterModel)
    const quickFilters = filterModel.quickFilterValues;

    // Make API call to fetch data for newPaginationModel.page and newPaginationModel.pageSize
    fetch(`https://localhost/api/books?title=${quickFilters[0]}`)
      .then(response => {
        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("fetching", loading);

        // Parse the response body as JSON
        return response.json();
      })
      .then(data => {
        // Handle the successful data
        console.log("Data received:", data);
        setLibraryBooks(data);
        setTotalRowsFromApi(data["totalItems"]);
        setLoading(false);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch or processing
        console.error("Fetch error:", error);
      })
      .finally(() => {
        // This block will always execute, regardless of success or failure
        console.log("Fetch operation completed (finally block executed).");
      });
  }, []);

  const columns: GridColDef[] = [{ field: "title", headerName: "Title", width: 500 }, {
    field: "description", headerName: "Description", width: 500
  }, { field: "author", headerName: "Author", width: 250 }, {
    field: "pages", headerName: "Print Length", width: 100
  }, { field: "publisher", headerName: "Publisher", width: 200 }, { field: "genre", headerName: "Genre", width: 200 }];

  const [rows, setRows] = useState([]);


  useEffect(() => {
    if (typeof libraryBooks["member"] !== "undefined") {
      const libraryBookMembers = libraryBooks["member"] ?? [];
      const books = libraryBookMembers.map((bookData, index) => {
        return {
          "id": index,
          "title": bookData.title,
          "description": bookData.synopsis,
          "author": bookData.author1,
          "pages": bookData.bookNumber,
          "publisher": bookData.publisher,
          "genre": bookData.genre
        };
      });

      setRows(books);
    }


  }, [libraryBooks]);

  return (<div className="App">
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        showToolbar
        filterMode="server"
        onFilterModelChange={onFilterChange}
        rows={rows}
        columns={columns}
        autosizeOnMount
        quickFilterIcon
        initialState={{ pagination: { paginationModel } }}
        sx={{ border: 0 }}
        pageSizeOptions={[30]}
        loading={loading}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        rowCount={totalRowsFromApi}
      />
    </Paper>

  </div>);
}


export default LibraryTable;