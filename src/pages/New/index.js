import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import {useState} from "react"
import { addBillList } from "@/store/modules/billStore"
import {useDispatch} from "react-redux";
import dayjs from "dayjs";


const New = () => {
    const navigate = useNavigate()

    // state to control pay and income
    const [billType, setBillType] = useState('pay')

    const [money, setMoney] = useState(0)

    const moneyChange = (value) => {
        setMoney(value)
    }

    const [useFor, setUseFor] = useState('')

    const dispatch = useDispatch()

    // save bill
    const saveBill = () => {
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: date,
            useFor: useFor
        }
        console.log(data)
        dispatch(addBillList(data))
    }

    // store the date chosen by time selector
    const [date, setDate] = useState()

    // control time selector open and close
    const [dateVisible, setDateVisible] = useState(false)

    // time selector confirm
    const dateConfirm = (confirm_date) => {
        console.log(confirm_date)
        setDate(confirm_date)
        setDateVisible(false)
    }


    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                create a new one
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' ? 'selected' :'')}
                        onClick={() => setBillType('pay')}
                    >
                        pay
                    </Button>
                    <Button
                        className={classNames(billType === 'income' ? 'selected' :'')}
                        shape="rounded"
                        onClick={() => setBillType('income')}
                    >
                        income
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
                            <DatePicker
                                className="kaDate"
                                title="kaDate"
                                max={new Date()}
                                visible={dateVisible}
                                onConfirm={dateConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type ? 'selected' :''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    save
                </Button>
            </div>
        </div>
    )
}

export default New