import { Button, Card } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThunkDispatch } from "hooks/index";
import { communityState, snackBarState, usersState } from "store/index";
import { VirtualScroll } from "..";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "hooks/index";

import s from "./styles.module.scss";

const CommunityControlPanel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();
  const { width } = useWindowSize();

  const VIEW_SIZE_DESKTOP = 8;
  const VIEW_SIZE_MOBILE = 5;
  const USER_COMPONENT_HEIGHT = 56;

  const users = useSelector(usersState.selectors.users);
  const communities = useSelector(communityState.selectors.communities);
  const selections = useSelector(communityState.selectors.selections);
  const usersLoaded = useSelector(usersState.selectors.usersLoaded);
  const usersLoadingFailed = useSelector(
    usersState.selectors.usersLoadingFailed
  );

  const communitiesLoaded = useSelector(
    communityState.selectors.communitiesLoaded
  );
  const communitiesLoadingFailed = useSelector(
    communityState.selectors.communitiesLoadingFailed
  );

  const addToCommunity = useCallback(() => {
    if (selections.length > 10) {
      dispatch(
        snackBarState.snackBarSlice.actions.open({
          message: t("limit_of_community"),
        })
      );
    } else {
      thunkDispatch(communityState.actionCreators.setCommunities(selections));
    }
  }, [dispatch, selections, t, thunkDispatch]);

  const usersBeyondCommunities = useMemo(() => {
    return users.filter(
      (user) =>
        !communities.find((userCommunity) => userCommunity.login === user.login)
    );
  }, [communities, users]);

  const resetAllChecks = useCallback(() => {
    dispatch(communityState.communitySlice.actions.resetAllSelections());
  }, [dispatch]);

  if (usersLoadingFailed || communitiesLoadingFailed) {
    return <div>{t("smth_went_wrong")}</div>;
  }

  return (
    <div className={s.communityControlPanel}>
      <Card className={s.virtualScroll}>
        <div className={s.title}>{t("users_list")}</div>
        {usersLoaded && (
          <VirtualScroll
            data={usersBeyondCommunities}
            viewSize={width < 768 ? VIEW_SIZE_MOBILE : VIEW_SIZE_DESKTOP}
            componentHeight={USER_COMPONENT_HEIGHT}
          />
        )}
        {selections.length ? (
          <div className={s.buttonContainer}>
            <Button
              variant="contained"
              onClick={addToCommunity}
              className={s.button}
            >
              {t("add_to_community")}
            </Button>
            <Button
              className={cn(s.button, s.resetAllChecksButton)}
              variant="contained"
              onClick={resetAllChecks}
            >
              {t("reset_all_checks")}
            </Button>
          </div>
        ) : null}
      </Card>
      <Card className={s.communityList}>
        <div className={s.title}>{t("community_list")}</div>
        {communitiesLoaded && (
          <VirtualScroll
            data={communities}
            viewSize={width < 768 ? VIEW_SIZE_MOBILE : VIEW_SIZE_DESKTOP}
            componentHeight={USER_COMPONENT_HEIGHT}
          />
        )}
      </Card>
    </div>
  );
};

export default CommunityControlPanel;
