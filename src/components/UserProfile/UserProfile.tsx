import { Card, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { userState } from "store/index";
import { Loader } from "..";
import { useTranslation } from "react-i18next";

import s from "./styles.module.scss";

const UserProfile = () => {
  const { t } = useTranslation();
  
  const currentUser = useSelector(userState.selectors.currentUser);
  const currentUserLoading = useSelector(
    userState.selectors.currentUserLoading
  );
  const currentUserLoaded = useSelector(userState.selectors.currentUserLoaded);
  const currentUserLoadingFailed = useSelector(
    userState.selectors.currentUserLoadingFailed
  );

  const { avatar_url, login, id, site_admin, type } = currentUser || {};

  const data = useMemo(() => {
    if (currentUser) {
      return [
        { title: t('id'), value: id },
        { title: t('site_admin'), value: String(site_admin) },
        { title: t("role"), value: type },
      ];
    }
  }, [currentUser, id, site_admin, t, type]);

  if (currentUserLoading) {
    return <Loader />;
  }

  if (currentUserLoadingFailed) {
    return <div>{t('smth_went_wrong')}</div>;
  }

  return (
    <div>
      {currentUserLoaded && (
        <div className={s.profile}>
          <Card className={s.avatarContainer}>
            <img src={avatar_url} alt="avatar" />
          </Card>
          <Card className={s.infoContainer}>
            <div className={s.login}>{login}</div>
            <hr />
            <Table>
              <TableBody>
                {data?.map(({ value, title }) => (
                  <TableRow key={title}>
                    <TableCell>{title}:</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
