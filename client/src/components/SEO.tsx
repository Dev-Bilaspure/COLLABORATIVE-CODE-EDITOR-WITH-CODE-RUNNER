import { Helmet  as ReactHelmet} from "react-helmet-async";
import _ from "lodash";

const SEO = ({ options: { title = "" }, ...restProps }) => {
  return (
    <ReactHelmet {...restProps}>
      <title>{title}</title>
    </ReactHelmet>
  );
};

export default SEO;
