import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--popover)",
          "--success-text": "var(--accent)",
          "--success-border": "var(--accent)",
          "--error-bg": "var(--popover)",
          "--error-text": "var(--destructive)",
          "--error-border": "var(--destructive)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "rounded-xl shadow-lg font-sans mt-12",
          title: "text-sm font-medium",
          description: "text-sm text-muted-foreground",
        },
      }}
    />
  );
}
