import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { RootState } from "../../redux";

export default function Breadcrumb() {
  const items = useSelector((state: RootState) => state.breadcrumbSlice.items);

  if (items.length <= 1) return null;

  return (
    <nav className="flex items-center text-gray-400 text-sm space-x-1 mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && <ChevronRight size={16} className="mx-1" />}

          {item.link ? (
            <Link to={item.link} className="text-blue-500 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-500">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
