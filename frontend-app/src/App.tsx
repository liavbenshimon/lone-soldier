import Landing from "./pages/Landing";

import HomePage from "./pages/HomePage"; // Importa a HomePage

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewPost from "./pages/NewPost";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<Landing />} />

          {/* Rota para a HomePage */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/new-post" element={<NewPost />} />

          {/* Outras rotas */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}

          {/* Rota para 404 (página não encontrada) */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />

          {/* <Route path="/Login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/home" element={<HomePage />} />  */}

        </Routes>
      </BrowserRouter>
    </>
  );
}
