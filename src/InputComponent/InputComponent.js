import React from "react";
import {
  AutoComplete,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  TimePicker,
  Checkbox
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const InputComponent = ({
  hasFeedback,
  hidden,
  label,
  required,
  rules,
  name,
  tooltip,
  type,
  options,
  initialValue,
  extra,
  note,
  inBody,
  ...rest
}) => {
  switch (type) {
    case "date":
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
          >
            <DatePicker {...rest} />
          </Form.Item>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="ml-10" />
            </Tooltip>
          )}
        </Form.Item>
      );

    case "date_range":
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
          >
            <DatePicker.RangePicker {...rest} />
          </Form.Item>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="ml-10" />
            </Tooltip>
          )}
        </Form.Item>
      );

    case "time":
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
          >
            <TimePicker {...rest} />
          </Form.Item>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="ml-10" />
            </Tooltip>
          )}
        </Form.Item>
      );

    case "number":
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
            onChange={rest.onChange}
            initialValue={initialValue}
          >
            <InputNumber {...rest} />
          </Form.Item>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="ml-10" />
            </Tooltip>
          )}
        </Form.Item>
      );

    case "textarea":
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
          >
            <Input.TextArea rows={3} {...rest} />
          </Form.Item>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="ml-10" />
            </Tooltip>
          )}
        </Form.Item>
      );

    case "select":
      if (options) {
        return (
          <Form.Item
            label={label}
            extra={note}
            required={required ? true : false}
            hidden={hidden}
            tooltip={
              tooltip && {
                title: tooltip,
                icon: <InfoCircleOutlined className="ml-10" />
              }
            }
          >
            <Form.Item
              hasFeedback={hasFeedback}
              name={name}
              noStyle
              rules={rules}
              initialValue={initialValue}
            >
              <Select
                className={options.className}
                showSearch
                optionFilterProp="children"
                // getPopupContainer={(triggerNode) => {
                // 	return ((inBody === true) ? document.body : ((triggerNode?.parentNode) || document.body))
                // }}
                filterOption={(input, option) =>
                  option.children &&
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                {...rest}
              >
                {options.values &&
                  options.values.map((item, index) => {
                    if (item) {
                      if (
                        (options.accepted_keys &&
                          options.accepted_keys.includes(
                            options.value_key
                              ? item[options.value_key]
                              : item.value
                          )) ||
                        (options.rejected_keys &&
                          !options.rejected_keys.includes(
                            options.value_key
                              ? item[options.value_key]
                              : item.value
                          )) ||
                        !options.rejected_keys
                      ) {
                        var text = item.text;
                        var data_attr = options.data_attr;
                        let disabled_val = false;
                        if (options.disabled_keys) {
                          disabled_val = options.disabled_keys.includes(
                            options.value_key
                              ? item[options.value_key]
                              : item.value
                          )
                            ? true
                            : false;
                        }
                        if (options.text_key) {
                          if (typeof options.text_key === "object") {
                            text = "";
                            options.text_key.key.map(
                              (key, index) =>
                                (text += item[key] ? item[key] : key)
                            );
                          } else {
                            text = item[options.text_key];
                          }
                        }
                        return data_attr ? (
                          <Select.Option
                            key={index}
                            value={
                              options.value_key
                                ? item[options.value_key]
                                : item.value
                            }
                            className={
                              disabled_val
                                ? item.is_deleted
                                  ? `disabled-field danger-field`
                                  : `disabled-field`
                                : ``
                            }
                            disabled={disabled_val ? true : false}
                            extra_params={
                              options.data_attr
                                ? item[options.data_attr]
                                : item.value
                            }
                          >
                            {text}
                          </Select.Option>
                        ) : (
                          <Select.Option
                            key={index}
                            value={
                              options.value_key
                                ? item[options.value_key]
                                : item.value
                            }
                            className={
                              disabled_val
                                ? item.is_deleted
                                  ? `disabled-field danger-field`
                                  : `disabled-field`
                                : ``
                            }
                            disabled={disabled_val ? true : false}
                          >
                            {text}
                          </Select.Option>
                        );
                      }
                    }
                    return null;
                  })}
              </Select>
            </Form.Item>
            {extra}
            {/* {tooltip && (
							<Tooltip title={tooltip}>
								<InfoCircleOutlined className="ml-10" />
							</Tooltip>
						)} */}
          </Form.Item>
        );
      }
      return null;

    case "autocomplete":
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
            initialValue={initialValue}
          >
            <AutoComplete
              options={options}
              filterOption={(inputValue, option) =>
                option.value &&
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              {...rest}
            />
          </Form.Item>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="ml-10" />
            </Tooltip>
          )}
        </Form.Item>
      );

    case "radio_button":
      if (options) {
        return (
          <Form.Item
            label={label}
            extra={note}
            required={required ? true : false}
            hidden={hidden}
            tooltip={tooltip}
          >
            <Form.Item
              hasFeedback={hasFeedback}
              name={name}
              noStyle
              rules={rules}
              initialValue={initialValue}
            >
              <Radio.Group
                buttonStyle="solid"
                {...rest}
                className={options.className}
              >
                {options.values &&
                  options.values.map((item, index) => {
                    if (item) {
                      if (
                        (options.accepted_keys &&
                          options.accepted_keys.includes(
                            options.value_key
                              ? item[options.value_key]
                              : item.value
                          )) ||
                        (options.rejected_keys &&
                          !options.rejected_keys.includes(
                            options.value_key
                              ? item[options.value_key]
                              : item.value
                          )) ||
                        !options.rejected_keys
                      ) {
                        return (
                          <Radio.Button
                            style={{ flex: 1, textAlign: "center" }}
                            key={index}
                            value={
                              options.value_key
                                ? item[options.value_key]
                                : item.value
                            }
                          >
                            {options.text_key
                              ? item[options.text_key]
                              : item.text}
                          </Radio.Button>
                        );
                      }
                    }
                    return null;
                  })}
              </Radio.Group>
            </Form.Item>
            {/* {tooltip && (
							<Tooltip title={tooltip}>
								<InfoCircleOutlined className="ml-10" />
							</Tooltip>
						)} */}
          </Form.Item>
        );
      }
      return null;

    case "password":
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
          tooltip={
            tooltip && {
              title: tooltip,
              icon: <InfoCircleOutlined className="ml-10" />
            }
          }
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
          >
            <Input.Password {...rest} />
          </Form.Item>
        </Form.Item>
      );

    case "checkbox":
      return (
        <Form.Item
          hasFeedback={hasFeedback}
          name={name}
          noStyle
          rules={rules}
          valuePropName={rest.valuePropName}
        >
          <Checkbox {...rest}>{label}</Checkbox>
        </Form.Item>
      );

    default:
      return (
        <Form.Item
          label={label}
          extra={note}
          required={required ? true : false}
          hidden={hidden}
        >
          <Form.Item
            hasFeedback={hasFeedback}
            name={name}
            noStyle
            rules={rules}
          >
            <Input {...rest} />
          </Form.Item>
          {tooltip && (
            <Tooltip title={tooltip}>
              <InfoCircleOutlined className="ml-10" />
            </Tooltip>
          )}
        </Form.Item>
      );
  }
};

export default InputComponent;
