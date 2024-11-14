import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";
import TaskBoard from "./task/taskBoard";

export default function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <TaskBoard />
      </div>

      <Footer />
    </>
  );
}
