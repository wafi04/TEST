import { Construction } from "lucide-react";
//  defainiition progress layout
export function LayoutProgress() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        {/* Icon   prgresss */}
        <div className="animate-bounce">
          <Construction className="w-16 h-16 text-blue-500 mx-auto" />
        </div>

        {/* title   */}
        <h1 className="text-4xl font-bold text-gray-900">
          Halaman Dalam Pengembangan
        </h1>

        {/* sub title */}
        <p className="text-xl text-gray-600">
          Kami sedang bekerja keras untuk menghadirkan fitur baru yang luar
          biasa
        </p>

        {/* indicator proses */}
        <div className="w-full max-w-md mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-3/4 animate-pulse" />
          </div>
        </div>

        {/* info  progresss */}
        <div className="text-gray-500 space-y-2">
          <p>Fitur-fitur yang akan datang:</p>
          <ul className="list-disc list-inside">
            <li>Antarmuka yang lebih baik</li>
            <li>Pengalaman pengguna yang ditingkatkan</li>
            <li>Fungsionalitas baru yang menarik</li>
          </ul>
        </div>

        {/* lama waktu untuk ekseskusi */}
        <p className="text-sm text-gray-400">
          Perkiraan waktu penyelesaian: Segera
        </p>
      </div>
    </div>
  );
}

export default LayoutProgress;
