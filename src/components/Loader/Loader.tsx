import { CircularProgress } from "@mui/material";

import s from "./styles.module.scss";

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
