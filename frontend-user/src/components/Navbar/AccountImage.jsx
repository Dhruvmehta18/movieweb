import React, {memo} from "react";
import {Avatar} from "@material-ui/core";

const AccountImage = memo(({photoURL = "", displayName = "", email = ""}) => {
    let ProfileImage;
    if (photoURL) {
        if (displayName) {
            ProfileImage = <Avatar alt={displayName} src={photoURL}/>;
        } else {
            ProfileImage = <Avatar alt={email} src={photoURL}/>;
        }
    } else {
        if (displayName) {
            ProfileImage = <Avatar alt={displayName}>{displayName.slice(0, 1)}</Avatar>;
        } else {
            ProfileImage = <Avatar alt={email}>{email.slice(0, 1)}</Avatar>;
        }
    }

    return (
        <React.Fragment>
            {ProfileImage}
        </React.Fragment>
    )
})

export default AccountImage;
