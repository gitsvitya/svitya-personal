import type { ReactNode } from "react";

type LanguageLayoutProps = {
  children: ReactNode;
};

// Отдельный layout для [lang] оставлен как расширяемая точка:
// сюда удобно выносить будущие настройки, завязанные на локаль.
export default function LanguageLayout({ children }: LanguageLayoutProps) {
  return <>{children}</>;
}
