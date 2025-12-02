import { Link } from 'react-router-dom';
import { Plus, Moon, Sun } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import HeaderStats from './HeaderStats';

export default function Header() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="flex-1 gap-2">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">Fluxo</Link>

        {/* Desktop Stats */}
        <div className="hidden md:flex gap-4 ml-4 text-xs font-mono opacity-70">
            <Suspense fallback={<span className="loading loading-dots loading-xs"></span>}>
                <HeaderStats />
            </Suspense>
        </div>
      </div>
      <div className="flex-none gap-2">
        {/* Mobile Stats */}
        <div className="md:hidden flex gap-2 text-xs font-mono opacity-70 mr-2">
             <Suspense fallback={<span className="loading loading-dots loading-xs"></span>}>
                <HeaderStats />
            </Suspense>
        </div>

        <Link to="/add" className="btn btn-primary btn-sm md:btn-md gap-2">
          <Plus size={18} />
          <span className="hidden md:inline">Add Torrent</span>
        </Link>

        <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
