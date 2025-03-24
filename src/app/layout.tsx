// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'My Supabase App',
  description: 'A Next.js app with Supabase GitHub Authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
}
