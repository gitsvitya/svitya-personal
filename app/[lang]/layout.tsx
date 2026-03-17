import type { ReactNode } from "react";

type LanguageLayoutProps = {
  children: ReactNode;
};

// Возвращает дочерний контент для языкового сегмента маршрутов.
export default function LanguageLayout({ children }: LanguageLayoutProps) {
  return <>{children}</>;
}
