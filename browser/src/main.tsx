import { injectGlobal } from "@emotion/css"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "./comps/App"

injectGlobal({
  body: {
    padding: "50px 100px",
    fontFamily: "Barlow Semi Condensed",
  },
  "#root": {
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
})

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
