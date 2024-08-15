export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-blue-300">
      <h1>Hello Layout</h1>
      {children}
    </main>
  );
}
