import classNames from 'classnames'
import './index.scss'
import {useMemo, useState} from "react"
import Icon from "@/components/Icon"
import { billTypeToName } from '@/contants/index'

const MonthBill = ({date, billList}) => {

    const dayResult = useMemo(() => {
        const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [billList])

    const [visible, setVisible] = useState(false)

    return (
        <div className={classNames('dailyBill')}>
            <div className={"header"}>
                <div className={"dateIcon"}>
                    <span className={"date"}>{date}</span>
                    <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className={"oneLineOverview"}>
                    <div className={"pay"}>
                        <span className={"type"}>pay</span>
                        <span className={"money"}>{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className={"income"}>
                        <span className={"type"}>income</span>
                        <span className={"money"}>{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className={"balance"}>
                        <span className={"money"}>{dayResult.total.toFixed(2)}</span>
                        <span className={"type"}>balance</span>
                    </div>
                </div>
            </div>
            {/* single day list */}
            <div className={"billList"} style={{ display: visible ? 'block' : 'none' }}>
                {billList.map(item => {
                    return (
                        <div className={"bill"} key={item.id}><div/>
                            <Icon type={item.useFor} />
                            <div className={"detail"}>
                                <div className={"billtype"}>{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MonthBill