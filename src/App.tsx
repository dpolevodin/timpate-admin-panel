import { Layout } from "./components/layout";
import { GenerateQr } from "./components/GenerateQr";
import { OrganizationLogoContainer } from "./components/OrganizationLogoContainer";

export const App = () => {
  return (
    <Layout>
      <GenerateQr />
      <OrganizationLogoContainer />
    </Layout>
  );
};
