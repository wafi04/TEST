import { Search, ShoppingBag } from "lucide-react";
import { useLogout } from "../../api/auth/auth.logout";
import { useProfile } from "../../hooks/auth/useProfile";
import { UserData } from "../../types/user";
import SearchInput from "../ui/search/SearchInput";
import { Separator } from "../ui/separator";

const ANIMATION_DURATION = 0.3;

// Navbar Component
export function Navbar({ user }: { user: UserData | null }) {
  const logout = useLogout();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white">
      <div className="mx-auto">
        {user && (
          <div className="text-end font-bold text-sm py-1 bg-gray-200 px-4 md:px-10 space-x-4 flex justify-end">
            <p className="">Help</p>
            <Separator
              orientation="vertical"
              className="mx-4 h-[10px] my-1 bg-black"
            />
            <p className="">{`Welcome, ${user?.name}`}</p>
            <Separator
              orientation="vertical"
              className="mx-4 h-[10px] my-1 bg-black"
            />
            <div className="">
              {user ? (
                <p onClick={() => logout.mutate()}> Logout</p>
              ) : (
                <a href={"/auth/login"}>Sign In</a>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center px-4 py-2 md:px-10">
          <a
            href={"/"}
            className="font-bebas text-3xl md:text-4xl font-semibold">
            NextStore
          </a>

          <nav className="hidden md:flex space-x-6 justify-center flex-grow font-bebas text-xl">
            <a
              href={"/dashboard"}
              className="hover:border-black border-b-2 py-2 border-transparent">
              Dashboard
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <SearchInput />
            <a href="/cart">
              <ShoppingBag />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
