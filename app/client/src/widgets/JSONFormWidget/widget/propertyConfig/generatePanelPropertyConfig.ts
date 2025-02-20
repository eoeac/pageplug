import { get, isEmpty } from "lodash";

import { PanelConfig } from "constants/PropertyControlConstants";
import { FieldType, SchemaItem } from "widgets/JSONFormWidget/constants";
import {
  getSchemaItem,
  HiddenFnParams,
  isFieldTypeArrayOrObject,
} from "./helper";
import {
  ARRAY_PROPERTIES,
  CHECKBOX_PROPERTIES,
  COMMON_PROPERTIES,
  DATE_PROPERTIES,
  INPUT_PROPERTIES,
  MULTI_SELECT_PROPERTIES,
  OBJECT_PROPERTIES,
  RADIO_GROUP_PROPERTIES,
  SELECT_PROPERTIES,
  SWITCH_PROPERTIES,
} from "./properties";
import { JSONFormWidgetProps } from "..";

function generatePanelPropertyConfig(
  nestingLevel: number,
): PanelConfig | undefined {
  if (nestingLevel === 0) return;

  return {
    editableTitle: true,
    titlePropertyName: "label",
    panelIdPropertyName: "identifier",
    contentChildren: [
      {
        sectionName: "数据",
        children: [
          ...COMMON_PROPERTIES.content.data,
          ...INPUT_PROPERTIES.content.data,
          ...SWITCH_PROPERTIES.content.data,
          ...SELECT_PROPERTIES.content.data,
          ...RADIO_GROUP_PROPERTIES.content.data,
          ...MULTI_SELECT_PROPERTIES.content.data,
          ...DATE_PROPERTIES.content.data,
          ...CHECKBOX_PROPERTIES.content.data,
          ...ARRAY_PROPERTIES.content.data,
          {
            propertyName: "children",
            label: "字段配置",
            helpText: "字段配置",
            controlType: "FIELD_CONFIGURATION",
            isBindProperty: false,
            isTriggerProperty: false,
            panelConfig: generatePanelPropertyConfig(nestingLevel - 1),
            hidden: (...args: HiddenFnParams) => {
              return getSchemaItem(...args).compute((schemaItem) => {
                return (
                  schemaItem.fieldType !== FieldType.OBJECT &&
                  isEmpty(schemaItem.children)
                );
              });
            },
            dependencies: ["schema", "childStylesheet"],
          },
        ],
      },
      {
        sectionName: "标签",
        children: [
          ...COMMON_PROPERTIES.content.label,
          ...CHECKBOX_PROPERTIES.content.label,
          ...SWITCH_PROPERTIES.content.label,
        ],
      },
      {
        sectionName: "搜索过滤",
        children: [
          ...SELECT_PROPERTIES.content.searchAndFilters,
          ...MULTI_SELECT_PROPERTIES.content.searchAndFilters,
        ],
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});
          return !(
            schemaItem.fieldType === FieldType.SELECT ||
            schemaItem.fieldType === FieldType.MULTISELECT
          );
        },
      },
      {
        sectionName: "校验",
        children: [
          ...INPUT_PROPERTIES.content.validation,
          ...DATE_PROPERTIES.content.validation,
        ],
        hidden: isFieldTypeArrayOrObject,
      },
      {
        sectionName: "属性",
        children: [
          ...COMMON_PROPERTIES.content.general,
          ...INPUT_PROPERTIES.content.general,
          ...SELECT_PROPERTIES.content.general,
          ...MULTI_SELECT_PROPERTIES.content.general,
          ...COMMON_PROPERTIES.content.generalSwitch,
          ...MULTI_SELECT_PROPERTIES.content.toggles,
          ...DATE_PROPERTIES.content.general,
          ...ARRAY_PROPERTIES.content.general,
        ],
      },
      {
        sectionName: "事件",
        children: [
          ...CHECKBOX_PROPERTIES.content.events,
          ...DATE_PROPERTIES.content.events,
          ...MULTI_SELECT_PROPERTIES.content.events,
          ...INPUT_PROPERTIES.content.events,
          ...SWITCH_PROPERTIES.content.events,
          ...SELECT_PROPERTIES.content.events,
          ...COMMON_PROPERTIES.content.events,
          ...RADIO_GROUP_PROPERTIES.content.events,
        ],
        hidden: isFieldTypeArrayOrObject,
      },
    ],
    styleChildren: [
      {
        sectionName: "标签样式",
        children: [...COMMON_PROPERTIES.style.label],
      },
      {
        sectionName: "图标配置",
        children: [...INPUT_PROPERTIES.style.icon],
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});
          return !(
            schemaItem.fieldType === FieldType.TEXT_INPUT ||
            schemaItem.fieldType === FieldType.EMAIL_INPUT ||
            schemaItem.fieldType === FieldType.PASSWORD_INPUT ||
            schemaItem.fieldType === FieldType.NUMBER_INPUT
          );
        },
      },
      {
        sectionName: "颜色配置",
        children: [...COMMON_PROPERTIES.style.color],
        hidden: isFieldTypeArrayOrObject,
      },
      {
        sectionName: "轮廓样式",
        children: [...COMMON_PROPERTIES.style.borderShadow],
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});
          return (
            schemaItem.fieldType === FieldType.ARRAY ||
            schemaItem.fieldType === FieldType.OBJECT ||
            schemaItem.fieldType === FieldType.RADIO_GROUP ||
            schemaItem.fieldType === FieldType.SWITCH
          );
        },
      },
      ...OBJECT_PROPERTIES.style.root,
      ...ARRAY_PROPERTIES.style.root,
    ],
  } as PanelConfig;
}

export default generatePanelPropertyConfig;
