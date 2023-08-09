import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./components/Routers.tsx";
import "./index.css";
import { persistor, store } from "./store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={Routers} />
    </PersistGate>
  </Provider>
);
