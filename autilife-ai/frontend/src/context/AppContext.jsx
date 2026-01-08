import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [quickOrder, setQuickOrder] = useState(null);

  return (
    <AppContext.Provider value={{ quickOrder, setQuickOrder }}>
      {children}
    </AppContext.Provider>
  );
}
