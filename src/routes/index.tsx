import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "../pages";
import { AuthProvider } from "../shared/context";
import TicketGenerator from "@/pages/manager/ticketGenerator";
import Dashboard from "@/pages/dashboard";
import QueueControl from "@/pages/manager/QueueControl";
import QueueViewer from "@/pages/manager/QueueViewer";
import ProtectedRoute from "@/shared/components/ProtectedRoute";

const Routers = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/filas"
            element={
              <ProtectedRoute>
                <QueueControl />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exibir_fila"
            element={
              <ProtectedRoute>
                <QueueViewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/senhas"
            element={
              <ProtectedRoute>
                <TicketGenerator />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="orders"
            element={
              <ProtectedRoute roles={["admin", "driver", "customer"]}>
                <Orders />
              </ProtectedRoute>
            }
          />
           */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default Routers;
