import { FC, useCallback, useEffect } from "react";
import { UserList } from "components/index";
import { usersState } from "store/index";
import { useThunkDispatch } from "hooks/index";
import { Layout } from "layouts/index";

const UsersPage: FC = () => {
  const thunkDispatch = useThunkDispatch();

  const getUsers = useCallback(async () => {
    thunkDispatch(usersState.actionCreators.fetchUsers());
  }, [thunkDispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default UsersPage;
