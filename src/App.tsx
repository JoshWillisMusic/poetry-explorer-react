import Header from "@/header.tsx";
import { ThemeProvider } from "@/hooks/theme-provider.tsx";
import { Content } from "@/content.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"}>
      <Header />
      <Content />
    </ThemeProvider>
  );
}

export default App;
