'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Icon, Input, Button, Upload } from 'antd';
const FormItem = Form.Item;

import ajax from '../../redux/common/ajax';
import { register } from '../../redux/actions/account';
import styles from '../LoginRegisterForm/styles';
import logo from './register-logo.png';

@connect(
    null,
    dispatch => ({
        handleSubmit(e) {
            e.preventDefault();
            const { validateFieldsAndScroll } = this;
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log(values);
                    delete values.confirm;
                    dispatch(register(values));
                }
            })
        },
        checkUsername(rule, value, callback) {
            const pattern = /^\w+$/;
            if (value && value.length >= 3 && pattern.test(value)) {
                const validatePromise = ajax.get('/api/account/check_username', {
                    username: value
                });
                validatePromise.then(
                    result => {
                        callback();
                    },
                    error => {
                        callback('用户名已存在');
                    }
                )
            } else {
                callback();
            }
        },
        checkEmail(rule, value, callback) {
            const pattern = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if (!value) {
                callback();
            } else if (!pattern.test(value)){
                callback('邮箱格式不正确');
            } else {
                const validatePromise = ajax.get('/api/account/check_email', {
                    email: value
                });
                validatePromise.then(
                    result => {
                        callback();
                    },
                    error => {
                        callback('邮箱已被占用');
                    }
                )
            }
        }
    })
)
class RegisterForm extends Component {
    state = {
        confirmDirty: false
    }
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    checkConfirm(rule, value, callback) {
        if (value && value !== this.getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    }
    render() {
        const { handleSubmit, checkUsername, checkEmail } = this.props;
        const form = this.props.form;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={handleSubmit.bind(form)}>
                <Row className={styles.header}>
                    <Col span={8}>
                        <div className={styles.yellowCircle}>
                            <img className={styles.logo} src={logo} />
                        </div>
                    </Col>
                    <Col span={16}>
                        <h1>创建ReChat账号</h1>
                    </Col>
                </Row>
                <FormItem>
                    {
                        getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: '请输入用户名'
                            }, {
                                min: 3,
                                message: '用户名不得少于3个字符'
                            }, {
                                pattern: /^\w+$/,
                                message: '用户名包含非法字符'
                            }, {
                                validator: checkUsername
                            }]
                        })(
                            <Input prefix={<Icon type='user' />} placeholder='用户名' autoFocus autoComplete='off'/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('email', {
                            rules: [{
                                required: true,
                                message: '请输入邮箱'
                            }, {
                                validator: checkEmail
                            }]
                        })(
                            <Input prefix={<Icon type='mail' />} placeholder='邮箱' autoComplete='off'/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: '请输入密码'
                            }, {
                                min: 6,
                                message: '密码不得少于6个字符'
                            }, {
                                validator: this.checkPassword.bind(this)
                            }]
                        })(
                            <Input prefix={<Icon type='lock' />} type='password' placeholder='密码' />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('confirm', {
                            rules: [{
                                required: true,
                                message: '请输入确认密码'
                            }, {
                                validator: this.checkConfirm.bind(form)
                            }]
                        })(
                            <Input prefix={<Icon type='lock' />} type='password' placeholder='确认密码' onBlur={this.handleConfirmBlur.bind(this)}/>
                        )
                    }
                </FormItem>
                <Button type="primary" htmlType="submit" className={styles.button}>注册</Button>
            </Form>
        )
    }
}

const WrapRegisterForm = Form.create()(RegisterForm);

export default WrapRegisterForm;
