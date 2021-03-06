import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  message
} from "antd";
import React from "react";
import axios from "axios";

function confirm(e) {
  console.log(e);
  message.success("Delete Successfully!");
}
const { MonthPicker, RangePicker } = DatePicker;

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);
const DurationRegex = RegExp(/^[0-9]+$/);
const config = {
  rules: [{ type: "object", required: true, message: "Please select time!" }]
};
const rangeConfig = {
  rules: [{ type: "array", required: true, message: "Please select time!" }]
};

const formValid = ({ formerrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formerrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Model extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);

    this.state = {
      projectId: "",
      projectName: "",
      type: "",
      startDate: "",
      endDate: "",
      duration: "",
      status: "",
      visible: false,
      formerrors: {
        projectId: "",
        projectName: "",
        type: "",
        startDate: "",
        endDate: "",
        duration: "",
        status: ""
      }
    };
  }

  handlechange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "projectId":
        if (!ValidRegex.test(value)) {
          formerrors.projectId = "Invalid Id";
        } else if (value.length > 8) {
          formerrors.projectId = "Should be less than 8 characters";
        } else {
          formerrors.projectId = "";
        }
        break;
      case "projectName":
        if (!NameRegex.test(value)) {
          formerrors.projectName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.projectName = "Should be less than 70 characters";
        } else {
          formerrors.projectName = "";
        }
        break;

      case "type":
        if (!NameRegex.test(value)) {
          formerrors.type = "Invalid type";
        } else if (value.length > 30) {
          formerrors.type = "Should be less than 30 characters";
        } else {
          formerrors.type = "";
        }
        break;

      case "startDate":
        if (!NameRegex.test(value)) {
          formerrors.startDate = "Invalid start date";
        } else if (value.length > 30) {
          formerrors.startDate = "Should be less than 30 characters";
        } else {
          formerrors.startDate = "";
        }
        break;

      case "endDate":
        if (!NameRegex.test(value)) {
          formerrors.endDate = "Invalid end date";
        } else if (value.length > 30) {
          formerrors.endDate = "Should be less than 30 characters";
        } else {
          formerrors.endDate = "";
        }
        break;

      case "duration":
        if (!DurationRegex.test(value)) {
          formerrors.duration = "Invalid Duration";
        } else if (value.length > 30) {
          formerrors.duration = "Should be less than 30 characters";
        } else {
          formerrors.duration = "";
        }
        break;

      case "status":
        if (!NameRegex.test(value)) {
          formerrors.status = "Invalid status";
        } else if (value.length > 30) {
          formerrors.status = "Should be less than 30 characters";
        } else {
          formerrors.status = "";
        }
        break;
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Project Id :${this.state.projectId}
        Project Name: ${this.state.projectName}
        Type : ${this.state.type}
        startDate: ${this.state.startDate}
        endDate: ${this.state.endDate}
        duration:${this.state.duration}
        status:${this.state.status}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  onChangeStartDate = (date, dateString) => {
    // this.setState({startDate: dateString});

    this.setState({ startDate: dateString }, () =>
      console.log(this.state.startDate)
    );

    console.log(this.state.startDate);
  };
  onChangeEndDate = (date, dateString) => {
    this.setState({ endDate: dateString }, () =>
      console.log(this.state.endDate)
    );

    console.log(this.state.endDate);
  };
  state = {
    disabled: true,
    visible: false
  };

  toggleDisable = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  onChange = e => {
    console.log("checked = ", e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  getall() {}

  handleOk = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        message.success("Successfully Added!!!");
        this.setState({ visible: false });
      } else {
      }
    });
    if (formValid(this.state)) {
      console.info(`
        --SUBMITTING--
        Project Id: ${this.state.projectId}
        Project Name: ${this.state.projectName}
        Project Type:${this.state.type}
        Project Start Date: ${this.state.startDate}
        Project End Date: ${this.state.endDate}
        Project Duration: ${this.state.duration}
        Project Status : ${this.state.status}
 `);

      const projectData = {
        projectId: this.state.projectId,
        projectName: this.state.projectName,
        type: this.state.type,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        duration: this.state.duration,
        status: this.state.status
      };

      axios
        .post(
          "http://localhost:8085/projectservice/createproject",
          projectData
        )
        .then(res => {
          console.log(res.data);
          this.getall();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };
  state = { visible: false };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formerrors } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Project
        </Button>
        <br />
        <Modal
          title="Add Project"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="600px"
        >
          {/* <Form layout="vertical"> */}
          <form layout="vertical" onSubmit={this.handleSubmit} noValidate>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Project Id">
                  <div>
                    {getFieldDecorator("projectId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input ProjectId!"
                        }
                      ]
                    })(
                      <Input
                        className={
                          formerrors.projectId.length > 0 ? "error" : null
                        }
                        placeholder="Project Id"
                        name="projectId"
                        value={this.state.projectId}
                        // onChange={this.onChangeprojectId}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.projectId.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.projectId}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Project Name"
                  validateStatus={this.state.projectName.validateStatus}
                  help={this.state.projectName.errorMsg}
                >
                  <div>
                    {getFieldDecorator("projectName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input projectName!"
                        }
                      ]
                    })(
                      <Input
                        className={
                          formerrors.projectName.length > 0 ? "error" : null
                        }
                        placeholder="Project Name"
                        name="projectName"
                        value={this.state.projectName}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.projectName.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.projectName}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Type"
                  validateStatus={this.state.type.validateStatus}
                  help={this.state.type.errorMsg}
                >
                  <div>
                    {getFieldDecorator("type", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project Type!"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Type"
                        name="type"
                        value={this.state.type}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.type.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.type}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Start Date"
                  validateStatus={this.state.startDate.validateStatus}
                  help={this.state.startDate.errorMsg}
                >
                  <div>
                    {getFieldDecorator("startDate", {
                      rules: [
                        {
                          required: true,
                          message: "Please input startDate!"
                        }
                      ]
                    })(
                      <DatePicker
                        placeholder="Start Date"
                        name="startDate"
                        startDate={this.state.startDate}
                        onChange={this.onChangeStartDate}
                      />
                    )}
                  </div>
                  {formerrors.startDate.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.startDate}
                    </span>
                  )}
                  {/* </Form.Item> */}
                </Form.Item>
              </Col>

              <Col span={8}>
                {/* <Form.Item label="End Date"> */}
                <Form.Item
                  label="End Date"
                  validateStatus={this.state.endDate.validateStatus}
                  help={this.state.endDate.errorMsg}
                >
                  <div>
                    {getFieldDecorator("endDate", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project End Date!"
                        }
                      ]
                    })(
                      <DatePicker
                        placeholder="End Date"
                        name="endDate"
                        onChange={this.onChangeEndDate}
                      />
                    )}
                  </div>
                  {formerrors.endDate.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.endDate}
                    </span>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Duration"
                  validateStatus={this.state.duration.validateStatus}
                  help={this.state.duration.errorMsg}
                >
                  <div>
                    {getFieldDecorator("duration", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project Duration!"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Duration"
                        name="duration"
                        value={this.state.duration}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.duration.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.duration}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Status"
                  validateStatus={this.state.status.validateStatus}
                  help={this.state.status.errorMsg}
                >
                  <div>
                    {getFieldDecorator("status", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Project Status!"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Status"
                        name="status"
                        value={this.state.status}
                        onChange={this.handlechange}
                      />
                    )}
                  </div>
                  {formerrors.status.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.status}
                    </span>
                  )}
                </Form.Item>{" "}
              </Col>
            </Row>
          </form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(Model);
http://localhost:8085/projectservice/createproject