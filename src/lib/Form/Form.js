import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';

import './form.less';

export default class Form extends Component {
    constructor(props) {
        super(props);

        const {
            feilds,
            filter,
        } = this.props;

        const allKeys = Reflect.ownKeys(feilds);

        this._refs = {};
        let validators = {};

        allKeys.forEach((item) => {
            if(feilds[item].fit !== 'text') {
                this._refs[item] = React.createRef();
                validators[item] = [];
            }
        });

        this.state = {
            keys: filter ? filter : ( feilds ? allKeys : []),
            feilds,
            validators,
        }
    }
    
    static formItems = {
        //内置组件
    }

    static register(Components) {
        Form.formItems = {
            ...Components,
            ...Form.formItems,
        }
    }

    getValues = () => {
        const result = {};

        this.state.keys.forEach((item) => {
            if(this._refs[item]) {
                result[item] = this._refs[item].current.getValue();
            }
        });

        return result;
    }

    setValues = (data) => {
        if(!data) {
            this.state.keys.forEach((item) => {
                if(this._refs[item]) {
                    this._refs[item].current.setValue();
                }
            });

            return;
        }

        Reflect.ownKeys(data).forEach((item) => {
            this._refs[item] && this._refs[item].current.setValue(data[item]);
        });
    }

    checkValues = () => {
        const { keys, feilds } = this.state;

        let result = true;

        let validators = {};

        keys.forEach((item) => {
            let validator = [];

            feilds[item].rules && feilds[item].rules.forEach((callback) => {
                const value = this._refs[item].current.getValue();

                const msg = callback(value);
                if(msg && typeof msg === 'string') {
                    validator.push(msg);
                    result = false;
                }
            })
            
            validators[item] = validator;
        });

        this.setState({
            validators
        });

        return result;
    }

    sendData = () => {
        const {
            beforeAjax,
            afterAjax,
            ...source
        } = (this.props.source ? this.props.source : {});

        let data = (beforeAjax ? beforeAjax(this.getValues()) : this.getValues());

        if(!source.method || source.method.toUpperCase() === 'GET') {
            source.params = data;
        }else {
            source.data = data;
        }

        if(this.checkValues() && source.url) {
            axios({
                ...source
            }).then((result) => {
                afterAjax && afterAjax(result);
            });
        }
    }

    _onChange = (e, item) => {
        const { feilds } = this.state;

        const {
            fit,
            name,
            onChange,
            onFormChange,
            rules,
            ...props
        } = feilds[item];

        onChange && onChange(e);

        const changeValue = this._refs[item].current.getValue();
        const allValues = this.getValues();
        this._onFormChange(changeValue,allValues);

        let validator = [];
        rules && rules.forEach((callback) => {
            const msg = callback(changeValue);
            if(msg && typeof msg === 'string') {
                validator.push(msg);
            }
        });
        this.setState({
            validators: {
                ...this.state.validators,
                [item]: validator,
            }
        })
    }

    _onFormChange = (changeValue,allValues) => {
        let feilds = { ...this.state.feilds };
        let keys = [ ...this.state.keys ];

        const allKeys = Reflect.ownKeys(feilds);

        allKeys.forEach((item) => {
            let changeConfigs;
            if(feilds[item].onFormChange) changeConfigs = feilds[item].onFormChange(changeValue,allValues);

            if(Object.prototype.toString.call(changeConfigs) === '[object Object]') {
                feilds = {
                    ...feilds,
                    [item]: {
                        ...feilds[item],
                        ...changeConfigs,
                    }
                }
            }

            const isIn = ~keys.indexOf(item);

            if(changeConfigs === false && isIn) {
                const index = keys.indexOf(item);
                keys.splice(index,1);
            }
    
            if(changeConfigs === true && !isIn) {
                keys.push(item);
            }
        })

        this.setState({
            feilds,
            keys,
        })
    }

    /*todolist
        全局问题
        布局
    */
    render() {
        const {
            layout,
            btns,
        } = this.props;

        const {
            feilds,
            keys,
            validators,
        } = this.state;

        const btnsConfig = (btns && btns.length > 0) ? btns : ['提交','重置'];
        const allKeys = Reflect.ownKeys(feilds);

        return (
            <form>
                {
                    allKeys.map((item) => {
                        const {
                            fit,
                            name,
                            onChange,
                            onFormChange,
                            rules,
                            ...props
                        } = feilds[item];
                        const Component = Form.formItems[fit];

                        if(fit === 'text' && ~keys.indexOf(item)) {
                            return (
                                <div className="form-item">
                                    <label className="form-item-label"></label>
                                    <div className="form-item-content">
                                        <p { ...props }>{ props.content }</p>
                                    </div>
                                </div>
                            )
                        }

                        if(~keys.indexOf(item)) {
                            return (
                                <div className="form-item">
                                    <label className="form-item-label">{name}</label>
                                    <div className="form-item-content">
                                        <Component
                                            {...props}
                                            ref={this._refs[item]}
                                            onChange={(e) => {
                                                this._onChange(e, item)
                                            }}/>
                                        <div className="form-item-error-msg">
                                            {
                                                validators[item] && validators[item].map((msg) => {
                                                    return (
                                                        <p>{msg}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                <div className="form-btns">
                    <label className="form-item-label"></label>
                    {
                        btnsConfig.map((item, index) => {
                            if(typeof item === 'string' && index === 0) return (
                                <div className="form-btn">
                                    <Button onClick={()=>{this.sendData()}}>
                                        {item}
                                    </Button>
                                </div>
                            );

                            if(typeof item === 'string' && index === 1) return (
                                <div className="form-btn">
                                    <Button onClick={()=>{this.setValues()}}>
                                        {item}
                                    </Button>
                                </div>
                            );

                            return (
                                <div className="form-btn">
                                    { item }
                                </div>
                            );
                        })
                    }
                </div>
            </form>
        )
    }
}