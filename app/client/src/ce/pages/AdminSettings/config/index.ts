import { ConfigFactory } from "pages/Settings/config/ConfigFactory";

import { config as GeneralConfig } from "@appsmith/pages/AdminSettings/config/general";
import { config as EmailConfig } from "pages/Settings/config/email";
import { config as MiniConfig } from "pages/Settings/config/mini";
import { config as MapsConfig } from "pages/Settings/config/googleMaps";
import { config as BaiduMapsConfig } from "pages/Settings/config/baiduMaps";
import { config as VersionConfig } from "pages/Settings/config/version";
import { config as AdvancedConfig } from "pages/Settings/config/advanced";
import { config as Authentication } from "@appsmith/pages/AdminSettings/config/authentication";
import { config as BrandingConfig } from "@appsmith/pages/AdminSettings/config/branding";

ConfigFactory.register(GeneralConfig);
ConfigFactory.register(EmailConfig);
ConfigFactory.register(MiniConfig);
ConfigFactory.register(MapsConfig);
ConfigFactory.register(BaiduMapsConfig);
ConfigFactory.register(Authentication);
ConfigFactory.register(AdvancedConfig);
ConfigFactory.register(VersionConfig);
ConfigFactory.register(BrandingConfig);

export default ConfigFactory;
