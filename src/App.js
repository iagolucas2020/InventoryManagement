import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoute from "./routes/routes";

function App() {
  return (
    <>
      <Header />
      <AppRoute />
      <Footer />
    </>
  );
}

export default App;
