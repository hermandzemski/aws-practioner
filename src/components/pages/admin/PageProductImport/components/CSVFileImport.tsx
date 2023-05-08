import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { getAuthToken } from "./auth.service";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);

    if (!file) {
      return;
    }

    // Get the presigned URL
    const token = getAuthToken();
    const authHeaher = token 
      ? {
          Authorization: token
        } 
      : undefined;

    const fileUrl = await axios({
      method: "GET",
      url: `${url}/${encodeURIComponent(file.name)}`,
      headers: authHeaher
    }).then(response => response.data.url);

    console.log("File to upload: ", file.name);
    console.log("Uploading to: ", fileUrl);

    try {
      const result = await fetch(fileUrl, {
        method: "PUT",
        body: file,
      });

      console.log("Result: ", result);
      setFile(undefined);
    } finally {
      
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
