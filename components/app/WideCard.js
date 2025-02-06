export default function WideCard({ title, children }) {
  return (
    <div className="w-full md:w-[calc(50%-2rem)] bg-white border border-gray-200 rounded-lg shadow-md flex justify-center">
      {children}
    </div>
  );
}