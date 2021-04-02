import React, { useEffect, useState } from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { history } from '../redux/configureStore';

const NotificationBadge = (props) => {
  return (
    <React.Fragment>
      <Badge color="secondary" variant="dot">
        <NotificationsIcon
          style={{
            fontSize: "35px",
            color: "#4e8d7c",
            cursor: "pointer",
            margin: "0 8px 0 0",
          }}
          onClick={() => {
            history.push("/notification");
            props.setTrigger(false);
          }}
        />
      </Badge>
    </React.Fragment>
  );
};

export default NotificationBadge;