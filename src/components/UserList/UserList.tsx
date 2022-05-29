import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { User, usersState } from "store/index";
import { UserCard, Loader } from "..";
import { Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";

import s from "./styles.module.scss";

const UserList = () => {
  const { t } = useTranslation();

  const users = useSelector(usersState.selectors.users);
  const usersLoaded = useSelector(usersState.selectors.usersLoaded);
  const usersLoading = useSelector(usersState.selectors.usersLoading);
  const usersLoadingFailed = useSelector(
    usersState.selectors.usersLoadingFailed
  );

  const [page, setPage] = useState(1);
  
  const OFFSET = 9;
  const pagesCount = Math.ceil(users.length / OFFSET);

  const userSliced = useMemo(() => {
    return users.slice((page - 1) * OFFSET, page * OFFSET);
  }, [page, users]);

  const changePage = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const usersList = useMemo(() => {
    return users.length ? (
      <div className={s.usersContainer}>
        {userSliced.map((user: User) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    ) : (
      <div>{t('user_list_empty')}</div>
    );
  }, [t, userSliced, users.length]);

  if (usersLoading) {
    return <Loader />;
  }

  if (usersLoadingFailed) {
    return <div>{t('smth_went_wrong')}</div>;
  }

  return (
    <div>
      {usersLoaded && usersList}
      {usersLoaded && users.length && (
        <div className={s.pagination}>
          <Pagination page={page} onChange={changePage} count={pagesCount} />
        </div>
      )}
    </div>
  );
};

export default UserList;
