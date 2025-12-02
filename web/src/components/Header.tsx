import { Link } from 'react-router-dom';
import { Plus, Moon, Sun } from 'lucide-react';
import { Suspense } from 'react';
import HeaderStats from './HeaderStats';

export default function Header() {
  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary px-2">Fluxo</Link>
      </div>

      <div className="flex-none flex items-center gap-3 md:gap-4">
        {/* Stats - RX below TX, showing on all screens but compact */}
        <div className="opacity-80">
            <Suspense fallback={<div className="w-20 h-8 bg-base-200 rounded animate-pulse"></div>}>
                <HeaderStats />
            </Suspense>
        </div>

        {/* Add Torrent Button */}
        <Link to="/add" className="btn btn-primary btn-sm md:btn-md btn-circle md:btn-wide md:px-4 md:w-auto" aria-label="Add Torrent">
          <Plus size={20} />
          <span className="hidden md:inline ml-2">Add Torrent</span>
        </Link>

        {/* Theme Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm md:btn-md">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="light" />

          {/* sun icon */}
          <Sun className="swap-on fill-current w-5 h-5 md:w-6 md:h-6" />

          {/* moon icon */}
          <Moon className="swap-off fill-current w-5 h-5 md:w-6 md:h-6" />
        </label>
      </div>
    </div>
  );
}
