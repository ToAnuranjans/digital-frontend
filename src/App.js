import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from "./AppRouter";
export default function App() {
    const [quueryClient] = useState(() => new QueryClient());
    return <QueryClientProvider client={quueryClient}>
        <AppRouter />
    </QueryClientProvider>
}
