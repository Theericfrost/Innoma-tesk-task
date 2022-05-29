import React, { FC, useMemo, useRef, useState } from "react";
import { Container } from "@mui/material";
import { Header, SnackBar } from "components/index";
import { Nullable } from "store/index";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const headerRef = useRef<Nullable<HTMLDivElement>>(null);
  const [headerMounted, setHeaderMounted] = useState(false);

  const paddingTop = useMemo(() => {
    if (headerRef.current?.clientHeight) {
      return headerRef.current?.clientHeight + 24;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerRef.current]);

  return (
    <>
      <header>
        <Header ref={headerRef} setHeaderMounted={setHeaderMounted} />
      </header>
      {headerMounted && (
        <main>
          <div style={{ paddingTop: `${paddingTop}px` }}>
            <Container>{children}</Container>
          </div>
        </main>
      )}
      <SnackBar />
    </>
  );
};

export default Layout;
