import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Header from "./pages/Header";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Header />
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
