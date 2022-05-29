import { FC, useCallback, useEffect } from "react";
import { Layout } from "layouts/index";
import { useParams } from "react-router-dom";
import { useThunkDispatch } from "hooks/index";
import { userState } from "store/index";
import { UserProfile } from "components/index";

const UsersPage: FC = () => {
  const { id } = useParams();
  const thunkDispatch = useThunkDispatch();

  const getUser = useCallback(async () => {
    if (id) {
      thunkDispatch(userState.actionCreators.fetchUser(id));
    }
  }, [id, thunkDispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
};

export default UsersPage;
