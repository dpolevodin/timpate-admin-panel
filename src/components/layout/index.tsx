import type { FC, PropsWithChildren } from "react";
import style from "./style.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className={style.container}>
    <div className={style.title}>TipMate admin panel</div>
    {children}
  </div>
);
