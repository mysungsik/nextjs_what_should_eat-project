import { Fragment } from "react";
import LayoutFooter from "./layout-footer";
import LayoutHeader from "./layout-header";

function Layout(props) {
  return (
    <Fragment>
      <LayoutHeader />
      {props.children}
      <LayoutFooter />
    </Fragment>
  );
}

export default Layout;
