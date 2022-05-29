import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Checkbox, Button } from "@mui/material";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { communityState, User } from "store/index";
import { useThunkDispatch } from "hooks/index";
import { useTranslation } from "react-i18next";

import s from "./styles.module.scss";

interface Props {
  user: User;
  isVirtualMode?: boolean;
}

const UserCard: FC<Props> = ({ user, isVirtualMode = false }) => {
  const { login, avatar_url, id } = user;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useThunkDispatch();

  const selections = useSelector(communityState.selectors.selections);
  const communities = useSelector(communityState.selectors.communities);

  const isInCommunity = useMemo(() => {
    return communities.find((comminity) => comminity.id === id);
  }, [communities, id]);

  const goToUserPage = useCallback(() => {
    if (!isVirtualMode) {
      navigate(`/user/${id}`);
    }
  }, [id, isVirtualMode, navigate]);

  const selectionHandler = useCallback(() => {
    dispatch(communityState.communitySlice.actions.collectionsToggle(user));
  }, [dispatch, user]);

  const deleteUserFromCommunity = useCallback(() => {
    thunkDispatch(communityState.actionCreators.deleteFromCommunity(id));
  }, [id, thunkDispatch]);

  return (
    <Card
      className={cn(s.card, { [s.virtualMode]: isVirtualMode })}
      onClick={goToUserPage}
    >
      <div className={s.cardInner}>
        <Avatar src={avatar_url} alt="avatar" />
        <div className={s.login}>{login}</div>
        {isVirtualMode && (
          <div className={s.checkbox}>
            {isInCommunity && (
              <Button variant="contained" onClick={deleteUserFromCommunity}>
                {t('delete')}
              </Button>
            )}
            {!isInCommunity && (
              <Checkbox
                checked={
                  !!selections.find(
                    (selectionsUser) => selectionsUser.id === user.id
                  )
                }
                onChange={selectionHandler}
              />
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserCard;
