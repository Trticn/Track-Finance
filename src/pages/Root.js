import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Glavni sadržaj raste i gura footer dole */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}


export default Root;