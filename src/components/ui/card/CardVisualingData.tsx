import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { ProductData } from "./CardListItem";

export function CardListVisualizationData({ data }: { data: ProductData[] }) {
  return (
    <div className="bg-gray-200 rounded-xl shadow-sm p-4 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barGap={-20} // Coba nilai negatif untuk mendekatkan bar
          barCategoryGap="5%" // Tambahkan jarak antar kategori
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", fontSize: 10 }}
            interval={0} // Tampilkan semua label
          />
          <Bar
            dataKey="price"
            className="custom-bar" // Tambahkan class custom
            barSize={30} // Kurangi ukuran bar
            style={{
              margin: "0 2px", // Tambahkan margin minimal
              padding: "0 2px",
            }}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className="rounded-t-xl overflow-hidden"
                fill="#ffffff"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Optional: Custom CSS */}
    </div>
  );
}
