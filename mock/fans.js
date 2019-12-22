module.exports = [
    {
        url: '/login',
        type: 'get',
        data: "success"
    },
    {
        url: '/getMessages',
        type: 'get',
        data: [
            {
                name: '陈圣光',
                text: 'bbb'
            },
            {
                name: '李岩',
                text: 'aaa',
            },

        ]
    },
    {
        url: '/getOrders',
        type: 'get',
        data: [1,2,3,4,5,6,7,8,9].map((item, index) => {
            return {
                orderNumber: `0000${index + 1}`,
                orderName: `订单${index + 1}`,
                type: '无',
                onePrice: '100',
                num: '222',
                person: 'admin'
            }
        })
    }
]