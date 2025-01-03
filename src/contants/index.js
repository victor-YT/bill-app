export const billListData = {
  pay: [
    {
      type: 'foods',
      name: 'Eat',
      list: [
        { type: 'food', name: 'food' },
        { type: 'drinks', name: 'drink' },
        { type: 'dessert', name: 'dessert' },
      ],
    },
    {
      type: 'taxi',
      name: 'Transportation',
      list: [
        { type: 'taxi', name: 'taxi & bus' },
        { type: 'longdistance', name: 'travel' },
      ],
    },
    {
      type: 'recreation',
      name: 'Recreation',
      list: [
        { type: 'bodybuilding', name: 'gym' },
        { type: 'game', name: 'game' },
        { type: 'audio', name: 'audio' },
        { type: 'travel', name: 'trip' },
      ],
    },
    {
      type: 'daily',
      name: 'Daily',
      list: [
        { type: 'clothes', name: 'clothes' },
        { type: 'bag', name: 'bag' },
        { type: 'book', name: 'book' },
        { type: 'home', name: 'home' },
      ],
    },
    {
      type: 'other',
      name: 'Other',
      list: [{ type: 'community', name: 'community' }],
    },
  ],
  income: [
    {
      type: 'professional',
      name: 'Work',
      list: [
        { type: 'salary', name: 'salary' },
        { type: 'overtimepay', name: 'over time' },
        { type: 'bonus', name: 'bonus' },
      ],
    },
    {
      type: 'other',
      name: 'Other',
      list: [
        { type: 'financial', name: 'financial' },
        { type: 'cashgift', name: 'gift' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})