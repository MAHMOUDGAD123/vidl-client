import { Link } from "react-router-dom";
import Page from "../components/layout/Page";
import { linkIcons } from "../../public/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage = () => {
  return (
    <Page pageTitle="VIDL Downloader">
      <h3>Choose from the next resources</h3>
      <div className="resources">
        {linkIcons.map(({ name, icon }) => (
          <Link
            key={name}
            to={`/${name}`}
            children={
              <>
                <span>{name}</span>
                <FontAwesomeIcon icon={icon} />
              </>
            }
          />
        ))}
      </div>
    </Page>
  );
};

export default HomePage;
