export function Button({ children, ...props }) {
  return (
    <button className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition" {...props}>
      {children}
    </button>
  );
}
