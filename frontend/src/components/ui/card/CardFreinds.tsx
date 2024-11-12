interface CardFriendsProps {
  image?: string | null;
  name: string;
  isOnline: boolean;
}

export function CardFriends({ isOnline, name, image }: CardFriendsProps) {
  const getInitial = (name: string) => {
    // menajdikan nama menjadi sebua arraay
    const nameParts = name.split(" ");

    // mengabil huruf pertama dari setiap kata kemudian menggabungkan
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
  };
  const truncateName = (name: string, maxLength: number = 10) => {
    // jika nama kurang  dari maxLength maka retun nama
    //   jika tidak maka dipotong dan dikasih titik
    if (name.length <= maxLength) {
      return name;
    }
    return `${name.slice(0, maxLength)}.`;
  };
  return (
    <div className="flex items-center  border cursor-pointer border-gray-200 max-w-[150px] hover:border-gray-300 rounded-full relative px-2 py-1 transition-colors duration-200">
      <div className="relative flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={`${name}'s avatar`}
            className="size-8 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            {getInitial(name)}
          </div>
        )}
        {isOnline && (
          <div className="absolute -top-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
        )}
      </div>
      <p className="text-sm font-medium text-gray-700 truncate ml-2">
        {truncateName(name)}
      </p>
    </div>
  );
}
import { MoreHorizontal } from "lucide-react";
interface TeamMemberProps {
  name: string;
  role: string;
  avatar: string;
  performance: number;
}

export function TeamMemberCard({
  name,
  role,
  avatar,
  performance,
}: TeamMemberProps) {
  const truncateName = (text: string, maxLength: number = 10) => {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <div className="flex items-center justify-between border cursor-pointer border-gray-200 max-w-[250px] hover:border-gray-300 rounded-full relative px-2 py-1 transition-colors duration-200 w-full">
      <div className="flex items-center">
        <div className="relative flex-shrink-0">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="size-8 rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium text-gray-700">
            {truncateName(name)}
          </p>
          <p className="text-xs text-gray-500">{truncateName(role)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-sm font-semibold text-blue-600">{performance}%</p>
        <button className="text-gray-500 hover:bg-gray-100 rounded-full p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
