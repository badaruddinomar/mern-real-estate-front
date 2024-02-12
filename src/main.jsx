import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
