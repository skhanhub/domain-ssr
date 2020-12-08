import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 8000;

const app = express();


app.use(express.static(path.resolve(__dirname, '..', 'static')))

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
