import AppRouter from "./routes/router";
import { Buffer } from "buffer";

if (!window.Buffer) {
  window.Buffer = Buffer;
}

export const App = () => {
  return <AppRouter />;
};
