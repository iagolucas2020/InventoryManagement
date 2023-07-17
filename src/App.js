import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoute from "./routes/routes";

function App() {
  return (
    <>
      <Header />
      <div className="panel">
        <AppRoute />
      </div>
      <Footer />
    </>
  );
}

export default App;
