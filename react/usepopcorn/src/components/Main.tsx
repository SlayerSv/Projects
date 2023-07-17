import { ReactElement } from "react";

export default function Main({ children } : { children: ReactElement | ReactElement[]}) {
  return (
    <main className="main">
      {children}
    </main>
  )
}