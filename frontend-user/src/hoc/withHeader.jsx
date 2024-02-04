import React, {Fragment} from "react";
import Header from "../components/Header";

const withHeader = (Component) => {
    return class extends React.Component {
        render() {
            //return original react component with additional props
            return (
                <Fragment>
                    <Header/>
                    <Component {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withHeader;
