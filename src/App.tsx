import { Layout } from "./components/layout";
import { GenerateQr } from "./components/GenerateQr";
import { OrganizationLogoContainer } from "./components/OrganizationLogoContainer";
import { GenerateHltnQr } from "./components/GenerateHltnQr";

import "@fontsource/playfair-display/500.css";
import "@fontsource/inter/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

export const App = () => {
  return (
    <Layout>
      <GenerateQr />
      <OrganizationLogoContainer />
      <GenerateHltnQr />
    </Layout>
  );
};
