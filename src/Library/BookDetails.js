import * as React from "react";
import {
  Alert,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import checkUrlFor404 from "../Api/imageCheckApi";
import Grid from "@mui/material/Grid";

function BookDetails({ bookInformation, open, openHandler }) {
  const [imageUrl, setImageUrl] = useState();
  const [closeDetails, setCloseDetails] = useState(false);
  let publicationDate = bookInformation.dateOfPublication ? new Date(bookInformation.dateOfPublication) : null;
  publicationDate = publicationDate ? `${publicationDate.toLocaleString('default', { month: 'long' })} ${publicationDate.getFullYear()}` : null;
  let copyright = bookInformation.copyright ? new Date(bookInformation.copyright) : null;
  copyright = copyright ? `${copyright.toLocaleString('default', { month: 'long' })} ${copyright.getFullYear()}` : null;
  const handleClose = () => {
    setCloseDetails(!closeDetails);
  };

  useEffect(() => {
    openHandler(null);
  }, [closeDetails]);

  useEffect(() => {
    const url = `https://covers.openlibrary.org/b/isbn/${bookInformation.isbn10}-M.jpg?default=false`

    checkUrlFor404(url).then(image => {
      setImageUrl(image);
    });

  }, [bookInformation.isbn10]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="title">
            {bookInformation.title} by {bookInformation.author1}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container justifyContent="space-evenly" padding="8px 0">
            <CardMedia
              sx={{ maxWidth: "140px", padding: "0 8px 8px 0" }}
              component="img"
              image={imageUrl}
              alt="Book Image Cover"
              height="200px"
              cover="object-fit"
            />

            <Typography maxWidth="600px" variant="body1">
              {bookInformation.synopsis}
            </Typography>
          </Grid>

          <Grid container justifyContent="flex-start" spacing="8px">
            {bookInformation.bookFormat && (
              <Alert icon={false} severity="success" variant="outlined">
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Format
                </Typography>
                <Typography variant="body2">
                  {bookInformation.bookFormat}
                </Typography>
              </Alert>
            )}
            {bookInformation.bookNumber && (
              <Alert icon={false} severity="success" variant="outlined">
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Page Count
                </Typography>
                <Typography variant="body2">
                  {bookInformation.bookNumber}
                </Typography>
              </Alert>
            )}
            {bookInformation.publisher && (
              <Alert icon={false} severity="success" variant="outlined">
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Publisher
                </Typography>
                <Typography variant="body2">
                  {bookInformation.publisher}
                </Typography>
              </Alert>
            )}
            {publicationDate && (
              <Alert icon={false} severity="success" variant="outlined">
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Publication Date
                </Typography>
                <Typography variant="body2"> {publicationDate} </Typography>
              </Alert>
            )}
            {bookInformation.genre && (
              <Alert icon={false} severity="success" variant="outlined">
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Genre
                </Typography>
                <Typography variant="body2"> {bookInformation.genre} </Typography>
              </Alert>
            )}
            {copyright && (
              <Alert icon={false} severity="success" variant="outlined">
                <Typography variant="body2" sx={{ color: "#999" }}>
                  Copyright
                </Typography>
                <Typography variant="body2">
                  {bookInformation.copyright}
                </Typography>
              </Alert>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default BookDetails;
