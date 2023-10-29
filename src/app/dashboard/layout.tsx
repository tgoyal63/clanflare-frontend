import ProtectedRoute from "@/components/wrappers/ProtectedRote";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
