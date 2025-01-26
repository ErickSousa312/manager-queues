import Routers from "./routes";
import { ToastProvider } from "./shared/context/ToastContext";

function App() {
  return (
    <div className="bg-gray-100 h-screen w-full">
      <ToastProvider>
        <Routers />
      </ToastProvider>
    </div>
  );
}

export default App;
