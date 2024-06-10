import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import img from "../assets/landing.svg";
const Landing = () => {
  return (
    <div>
      <nav className="flex items-center justify-center h-[4rem] bg-primary">
        <h1 className="text-4xl font-semibold tracking-widest text-primary-foreground">
          POS
        </h1>
      </nav>
      <section className="container min-h-[calc(100vh-4rem)] grid items-center md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-semibold tracking-wide text-primary">
            Point of Sale
          </h1>
          <p className="max-w-[30em] mt-8 leading-8 tracking-wide">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
            voluptate laborum porro rem eligendi blanditiis odio expedita quas
            esse similique veniam quam magni optio, voluptas distinctio adipisci
            iure debitis iste.
          </p>
          <div className="mt-4 flex gap-x-2">
            <Button asChild size="lg">
              <Link to="/register" className="text-base tracking-widest">
                Register
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/login" className="text-base tracking-widest">
                Login
              </Link>
            </Button>
          </div>
        </div>
        <img src={img} alt="landing img" className="" />
      </section>
    </div>
  );
};
export default Landing;
