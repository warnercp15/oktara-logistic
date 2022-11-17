import Footer from "./Footer";
import Header from "./Header";

export default function PageWrapper({ children }) {
  return (
    <div className="root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}