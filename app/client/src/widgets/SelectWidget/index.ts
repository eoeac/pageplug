import Widget from "./widget";
import IconSVG from "./icon.svg";
import { LabelPosition } from "components/constants";
import { Alignment } from "@blueprintjs/core";
import { DynamicHeight } from "utils/WidgetFeatures";

export const CONFIG = {
  features: {
    dynamicHeight: {
      sectionIndex: 4,
      defaultValue: DynamicHeight.FIXED,
      active: true,
    },
  },
  type: Widget.getWidgetType(),
  name: "下拉单选",
  iconSVG: IconSVG,
  needsMeta: true,
  searchTags: ["dropdown", "select"],
  defaults: {
    rows: 7,
    columns: 20,
    placeholderText: "请选择",
    labelText: "标签",
    labelPosition: LabelPosition.Top,
    labelAlignment: Alignment.LEFT,
    labelWidth: 5,
    options: [
      { label: "蓝", value: "BLUE" },
      { label: "绿", value: "GREEN" },
      { label: "红", value: "RED" },
    ],
    serverSideFiltering: false,
    widgetName: "Select",
    defaultOptionValue: "GREEN",
    version: 1,
    isFilterable: true,
    isRequired: false,
    isDisabled: false,
    animateLoading: true,
    labelTextSize: "0.875rem",
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
