import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {useEffect, useMemo, useState} from "react"
import classNames from 'classnames'
import dayjs from 'dayjs'
import {useSelector} from "react-redux"
import _ from 'lodash'
import DailyBill from './components/MonthBill'

const Year = () => {
    const billList = useSelector(state => state.bill.billList)

    const yearGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY'))
    }, [billList])
    console.log(yearGroup)

    // state to control the date selection area
    const [dateVisible, setDateVisible] = useState(false)

    // show date
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY')
    })

    const [currentYearList, setYearList] = useState([])

    // annually money calculate
    const yearResult = useMemo(() => {
        const pay = currentYearList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentYearList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentYearList]);

    // show current annually result at first
    useEffect(() => {
        const nowDate = dayjs().format('YYYY')
        if (yearGroup[nowDate]) {
            setYearList(yearGroup[nowDate])
        }
    }, [yearGroup])

    const onConfirm = (date) => {
        setDateVisible(false)
        console.log(date)
        const formatDate = dayjs(date).format('YYYY')
        console.log(formatDate)
        setCurrentDate(formatDate)
        setYearList(yearGroup[formatDate] ?? [])
    }

    // group by days in current year
    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentYearList, (item) => dayjs(item.date).format('YYYY-MM'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [currentYearList])

    return (
        <div className="annuallyBill">
            <NavBar className="nav" backIcon={false}>
                Annually Payments
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
                            <span className="money">{yearResult.pay.toFixed(2)}</span>
                            <span className="type">spend</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.income.toFixed(2)}</span>
                            <span className="type">income</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.total.toFixed(2)}</span>
                            <span className="type">balance</span>
                        </div>
                    </div>
                    {/* date selection */}
                    <DatePicker
                        className={"kaDate"}
                        title={"date"}
                        precision={"year"}
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

export default Year
