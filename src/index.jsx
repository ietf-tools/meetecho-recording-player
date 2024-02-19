import { createRoot } from "react-dom/client";
import App from "~/app";
import { store } from "~/redux/store";
import { Provider } from "react-redux";

import "~/i18n";

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
