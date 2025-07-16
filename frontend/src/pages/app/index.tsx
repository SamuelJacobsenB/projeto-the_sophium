import { Footer, Navbar } from "../../components";

import { Main } from "./main";
import { Courses } from "./courses";

function App() {
  return (
    <>
      <Navbar />
      <Main />
      <hr />
      <Courses />
      <Footer />
    </>
  );
}

export { App };
