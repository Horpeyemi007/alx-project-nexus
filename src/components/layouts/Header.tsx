import Link from "next/link";

const Header: React.FC = () => {
  const navClass: string =
    "hover:text-foreground hover:bg-background px-3 py-3 rounded-xl";
  return (
    <header className="bg-gray-800 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="flex items-center" href="/">
          <h1 className="text-2xl font-bold">Media Feeds</h1>
        </Link>
        <nav className="space-x-4">
          <Link href="/" className={navClass}>
            Home
          </Link>
          <Link href="#features" className={navClass}>
            Features
          </Link>
          <Link href="#about" className={navClass}>
            About
          </Link>
          <Link href="#contact" className={navClass}>
            Contact
          </Link>
        </nav>
        {/* auth */}
        <div className="space-x-4">
          <Link href="/auth/login" className={navClass}>
            Login
          </Link>
          <Link href="/auth/signup" className={navClass}>
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
