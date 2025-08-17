import { CardMedia } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import checkUrlFor404 from "../Api/imageCheckApi";


function OpenLibraryCardMedia({bookIsbn}) {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const url = `https://covers.openlibrary.org/b/isbn/${bookIsbn}-M.jpg?default=false`

    checkUrlFor404(url).then(image => {
      setImageUrl(image);
    });
  }, [bookIsbn]);

  return <CardMedia
    component="img"
    height="300"
    image={imageUrl}
    alt="Book Image Cover"
    sx={{ objectFit: 'cover' }}
  />
}

export default OpenLibraryCardMedia;