import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { App } from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  
  <BrowserRouter>
	<App />
  </BrowserRouter>

); 

 if (module.hot) {
    module.hot.accept();
 }