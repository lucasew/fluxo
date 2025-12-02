import { Link } from 'react-router-dom';
import { Plus, Moon, Sun } from 'lucide-react';
import { Suspense } from 'react';
import HeaderStats from './HeaderStats';

export default function Header() {
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

        <label className="swap swap-rotate btn btn-ghost btn-circle">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="light" />

          {/* sun icon */}
          <Sun className="swap-on fill-current w-6 h-6" />

          {/* moon icon */}
          <Moon className="swap-off fill-current w-6 h-6" />
        </label>
      </div>
    </div>
  );
}
