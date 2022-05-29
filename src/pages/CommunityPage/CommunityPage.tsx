import { FC, useCallback, useEffect } from "react";
import { Layout } from "layouts/index";
import { useThunkDispatch } from "hooks/index";
import { communityState, usersState } from "store/index";
import { CommunityControlPanel } from "components/index";
import { useSelector } from "react-redux";

const CommunityPage: FC = () => {
  const thunkDispatch = useThunkDispatch();
  const usersLoaded = useSelector(usersState.selectors.usersLoaded);

  const getUsers = useCallback(async () => {
    if (usersLoaded === false) {
      thunkDispatch(usersState.actionCreators.fetchUsers());
    }
  }, [thunkDispatch, usersLoaded]);

  useEffect(() => {
    thunkDispatch(communityState.actionCreators.fetchCommunities());
  }, [thunkDispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Layout>
      <CommunityControlPanel />
    </Layout>
  );
};

export default CommunityPage;
