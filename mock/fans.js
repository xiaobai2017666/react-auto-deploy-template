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
    }
]