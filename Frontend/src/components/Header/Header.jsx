import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'About', slug: '/about', active: true },
    { name: 'Contact', slug: '/contact', active: true },
    { name: 'Build Resume', slug: '/create', active: true }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to='/'>
          <h1 className="text-xl font-bold text-slate-900">ResumeToPortfolio</h1>
        </Link>

        {/* Nav Items */}
        <ul className="flex items-center gap-6">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                {item.name === 'Build Resume' ? (
                  <button
                    onClick={() => navigate(item.slug)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-2xl text-sm shadow hover:opacity-90"
                  >
                    {item.name}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-sm hover:underline"
                  >
                    {item.name}
                  </button>
                )}
              </li>
            ) : null
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
