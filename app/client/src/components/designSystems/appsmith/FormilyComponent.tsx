import React, { useMemo, useEffect } from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
  FormButtonGroup,
  FormDrawer,
  FormDialog,
} from "@formily/antd";
import { Card, Slider, Rate, Button } from "antd";
import { FormType } from "../../../widgets/FormilyWidget";
import styled from "styled-components";
import _ from "lodash";

interface FormilyComponentProps {
  formType: FormType;
  title?: string;
  triggerLabel?: string;
  submitLabel?: string;
  showReset?: boolean;
  resetLabel?: string;
  schema: string;
  onFormSubmit: (data: any) => void;
}

const EmptyForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background: #eee;
  min-height: 300px;
  margin-bottom: 24px;
  background-color: #fff;
  border-radius: 6px;
  opacity: 0.4;
  border: 1px dashed #2cbba6;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #ffffff 10px
    ),
    repeating-linear-gradient(#8af3c655, #8af3c6);
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% + 12px);
`;

const ScrollContent = styled.div`
  flex: 1;
  overflow: auto;
`;

const ScrollFooter = styled.div`
  border-top: 1px solid #f0f0f0;
  margin: 0 -24px;
  padding: 12px 24px 0;
`;

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
});

const FormilyComponent = (props: FormilyComponentProps) => {
  const {
    title,
    formType,
    triggerLabel,
    submitLabel,
    showReset,
    resetLabel,
    onFormSubmit,
  } = props;
  const schema: {
    form?: any;
    schema?: any;
  } = useMemo(() => {
    try {
      return JSON.parse(props.schema);
    } catch (e) {
      console.log("schema json parse failed", e);
      return {};
    }
  }, [props.schema]);
  const form = useMemo(() => createForm(), [props.schema]);
  const formProps = schema.form || {};
  const isVertical = formProps.layout === "vertical";
  const submitText = submitLabel || "提交";
  const resetText = resetLabel || "重置";
  const triggerText = triggerLabel || "打开表单";

  const formContent = _.isUndefined(schema.schema) ? (
    <EmptyForm>开始设计表单吧 😉</EmptyForm>
  ) : (
    <SchemaField schema={schema.schema} />
  );

  const showDrawer = () => {
    FormDrawer({ title }, () => {
      return (
        <FormLayout {...formProps}>
          {formContent}
          <FormDrawer.Footer>
            <FormButtonGroup align="left">
              <Submit
                onSubmit={() => {
                  return Promise.resolve();
                }}
              >
                {submitText}
              </Submit>
              {showReset ? <Reset>{resetText}</Reset> : null}
            </FormButtonGroup>
          </FormDrawer.Footer>
        </FormLayout>
      );
    })
      .open({
        initialValues: {},
      })
      .then(onFormSubmit);
  };

  const showModal = () => {
    FormDialog({ title, okText: submitText }, () => {
      return (
        <FormLayout {...formProps}>
          {formContent}
          <FormDialog.Footer>
            {showReset ? <Reset>{resetText}</Reset> : null}
          </FormDialog.Footer>
        </FormLayout>
      );
    })
      .open({
        initialValues: {},
      })
      .then(onFormSubmit);
  };

  if (formType === "MODAL" || formType === "DRAWER") {
    return (
      <Button
        type="primary"
        block
        onClick={formType === "DRAWER" ? showDrawer : showModal}
      >
        {triggerText}
      </Button>
    );
  }

  return (
    <Card
      title={title}
      bodyStyle={{ height: title ? "calc(100% - 58px)" : "100%" }}
    >
      <Form
        form={form}
        {...formProps}
        onAutoSubmit={onFormSubmit}
        className="full-height-form"
      >
        <ScrollContainer>
          <ScrollContent>{formContent}</ScrollContent>
          <ScrollFooter>
            {isVertical ? (
              <>
                <Submit block={!showReset}>{submitText}</Submit>
                {showReset ? (
                  <Reset style={{ marginLeft: 8 }}>{resetText}</Reset>
                ) : null}
              </>
            ) : showReset ? (
              <FormButtonGroup.FormItem>
                <Submit>{submitText}</Submit>
                <Reset>{resetText}</Reset>
              </FormButtonGroup.FormItem>
            ) : (
              <FormButtonGroup.FormItem>
                <Submit block>{submitText}</Submit>
              </FormButtonGroup.FormItem>
            )}
          </ScrollFooter>
        </ScrollContainer>
      </Form>
    </Card>
  );
};

export default FormilyComponent;
