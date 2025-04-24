
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Index from "./pages/Index";
import Hermanos from "./pages/Hermanos";
import Cuotas from "./pages/Cuotas";
import Eventos from "./pages/Eventos";
import Donaciones from "./pages/Donaciones";
import Estadisticas from "./pages/Estadisticas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hermanos" element={<Hermanos />} />
          <Route path="/cuotas" element={<Cuotas />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
