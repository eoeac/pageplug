import Widget from "./widget";
import IconSVG from "./icon.svg";

export const CONFIG = {
  type: Widget.getWidgetType(),
  name: "录音器",
  iconSVG: IconSVG,
  needsMeta: true,
  searchTags: ["sound recorder", "voice recorder", "audio recorder"],
  defaults: {
    iconColor: "white",
    isDisabled: false,
    isVisible: true,
    rows: 7,
    columns: 16,
    widgetName: "AudioRecorder",
    version: 1,
    animateLoading: true,
  },
  properties: {
    derived: Widget.getDerivedPropertiesMap(),
    default: Widget.getDefaultPropertiesMap(),
    meta: Widget.getMetaPropertiesMap(),
    config: Widget.getPropertyPaneConfig(),
    contentConfig: Widget.getPropertyPaneContentConfig(),
    styleConfig: Widget.getPropertyPaneStyleConfig(),
    stylesheetConfig: Widget.getStylesheetConfig(),
  },
};

export default Widget;
