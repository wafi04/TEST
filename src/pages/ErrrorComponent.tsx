import { Button } from "../components/ui/button";

//  layout error data
export function ErrorComponent() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="bg-red-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-red-500">
          Unable to load product details. Please try again later.
        </p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
