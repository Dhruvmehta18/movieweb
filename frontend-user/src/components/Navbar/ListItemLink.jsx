import React, {memo} from "react";
import {Link as RouterLink} from "react-router-dom";
import {ListItem, ListItemText} from "@material-ui/core";

const ListItemLink = memo((props) => {
    const {primary, to} = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to]
    );

    return (
        <li>
            <ListItem button component={renderLink} alignItems="center">
                <ListItemText primary={primary}/>
            </ListItem>
        </li>
    );
});

export default ListItemLink;
