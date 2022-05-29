import { forwardRef, useEffect } from "react";
import { Toolbar } from "@mui/material";
import { Nullable } from "store/index";
import { useLocation, Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTranslation } from "react-i18next";

import s from "./styles.module.scss";

interface Props {
  setHeaderMounted: (value: boolean) => void;
}

const Header = forwardRef<Nullable<HTMLDivElement>, Props>(
  ({ setHeaderMounted }, ref) => {
    const { t } = useTranslation();
    const location = useLocation();
    
    useEffect(() => {
      if (setHeaderMounted) {
        setHeaderMounted(true);
      }
    }, [setHeaderMounted]);

    return (
      <div ref={ref} className={s.header}>
        <Toolbar className={s.toolbar} disableGutters>
          {location.pathname !== "/" && (
            <Link to="/" className={s.link}>
              <ArrowBackIosNewIcon className={s.icon} />
            </Link>
          )}
          <div>{t('test_task_title')}</div>
          <div className={s.community}>
            <Link to="/community" className={s.link}>
              {t('community')}
            </Link>
          </div>
        </Toolbar>
      </div>
    );
  }
);

export default Header;
