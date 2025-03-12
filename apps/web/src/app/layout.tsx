import { TrpcClientProvider } from "~/components/core/trpc-provider";
import { LocalizationProvider } from "~/components/core/localization-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TrpcClientProvider>
        <LocalizationProvider>
          <body>{children}</body>
        </LocalizationProvider>
      </TrpcClientProvider>
    </html>
  );
}
