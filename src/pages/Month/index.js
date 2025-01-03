import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {useEffect, useMemo, useState} from "react"
import classNames from 'classnames'
import dayjs from 'dayjs'
import {useSelector} from "react-redux"
import _ from 'lodash'
import DailyBill from './components/DayBill'

const Month = () => {
    const billList = useSelector(state => state.bill.billList)

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])
    console.log(monthGroup)

    // state to control the date selection area
    const [dateVisible, setDateVisible] = useState(false)

    // show date
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })

    const [currentMonthList, setMonthList] = useState([])

    // monthly money calculate
    const monthResult = useMemo(() => {
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList]);

    // show current month result at first
    useEffect(() => {
        const nowDate = dayjs().format('YYYY-MM')
        if (monthGroup[nowDate]) {
            setMonthList(monthGroup[nowDate])
        }
    }, [monthGroup])

    const onConfirm = (date) => {
        setDateVisible(false)
        console.log(date)
        const formatDate = dayjs(date).format('YYYY-MM')
        console.log(formatDate)
        setCurrentDate(formatDate)
        setMonthList(monthGroup[formatDate] ?? [])
    }

    // group by days in current month
    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [currentMonthList])

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backIcon={false}>
                Monthly Payments
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* date selection area */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className='text'>
                            {currentDate + ''}
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* statistical area */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">spend</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">income</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">balance</span>
                        </div>
                    </div>
                    {/* date selection */}
                    <DatePicker
                        className={"kaDate"}
                        title={"date"}
                        precision={"month"}
                        visible={dateVisible}
                        max={new Date()}
                        cancelText={"cancel"}
                        confirmText={"confirm"}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                    />
                </div>
                {/* daily bill */}
                {
                    dayGroup.keys.map(key => {
                        return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]}/>
                    })
                }
            </div>
        </div>
    )
}

export default Month
