import React, { CSSProperties } from "react";
import { WidgetProps } from "widgets/BaseWidget";
import ContainerWidget, {
  ContainerWidgetProps,
} from "widgets/ContainerWidget/widget";
import { GridDefaults, RenderModes } from "constants/WidgetConstants";
import { getCanvasSnapRows } from "utils/WidgetPropsUtils";
import { getCanvasClassName } from "utils/generators";
import WidgetFactory, { DerivedPropertiesMap } from "utils/WidgetFactory";

class CanvasWidget extends ContainerWidget {
  static getPropertyPaneConfig() {
    return [];
  }
  static getWidgetType() {
    return "CANVAS_WIDGET";
  }

  getCanvasProps(): ContainerWidgetProps<WidgetProps> {
    return {
      ...this.props,
      parentRowSpace: 1,
      parentColumnSpace: 1,
      topRow: 0,
      leftColumn: 0,
      containerStyle: "none",
      detachFromLayout: true,
    };
  }

  renderChildWidget(childWidgetData: WidgetProps): React.ReactNode {
    if (!childWidgetData) return null;
    // For now, isVisible prop defines whether to render a detached widget
    if (
      childWidgetData.detachFromLayout &&
      !childWidgetData.isVisible &&
      childWidgetData.type !== "TARO_BOTTOM_BAR_WIDGET"
    ) {
      return null;
    }

    // We don't render invisible widgets in view mode
    if (
      this.props.renderMode === RenderModes.PAGE &&
      !childWidgetData.isVisible
    ) {
      return null;
    }

    const snapSpaces = this.getSnapSpaces();

    childWidgetData.parentColumnSpace = snapSpaces.snapColumnSpace;
    childWidgetData.parentRowSpace = snapSpaces.snapRowSpace;
    if (this.props.noPad) childWidgetData.noContainerOffset = true;
    childWidgetData.parentId = this.props.widgetId;

    // child widgets need context for connect()
    childWidgetData.context = this.props.context;

    return WidgetFactory.createWidget(childWidgetData, this.props.renderMode);
  }

  getPageView() {
    let height = 0;
    const snapRows = getCanvasSnapRows(
      this.props.bottomRow,
      this.props.canExtend
    );
    height = snapRows * GridDefaults.DEFAULT_GRID_ROW_HEIGHT;

    const style: CSSProperties = {
      width: "100%",
      height: `${height}px`,
      background: "none",
      position: "relative",
    };
    // This div is the DropTargetComponent alternative for the page view
    // DropTargetComponent and this div are responsible for the canvas height
    return (
      <div className={getCanvasClassName()} style={style}>
        {this.renderAsContainerComponent(this.getCanvasProps())}
      </div>
    );
  }

  getCanvasView() {
    return this.getPageView();
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }
  // TODO Find a way to enforce this, (dont let it be set)
  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }
}

export const CONFIG = {
  type: CanvasWidget.getWidgetType(),
  name: "Canvas",
  hideCard: true,
  defaults: {
    rows: 0,
    columns: 0,
    widgetName: "Canvas",
    version: 1,
    detachFromLayout: true,
  },
  properties: {
    derived: CanvasWidget.getDerivedPropertiesMap(),
    default: CanvasWidget.getDefaultPropertiesMap(),
    meta: CanvasWidget.getMetaPropertiesMap(),
    config: CanvasWidget.getPropertyPaneConfig(),
  },
};

export default CanvasWidget;
