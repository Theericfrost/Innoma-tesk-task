import { Router } from "router";
import { Provider } from "react-redux";
import { store } from "store";

import "assets/css/normalize.css";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
