let Messages = [
    {
        name: '陈圣光',
        text: '留言A'
    },
    {
        name: '李岩',
        text: '留言B',
    },

];

let Users = [1,2,3,4,5,6].map((item, index) => {
    return {
        id: `${index}`,
        username: `用户${index}`,
        password: '123456'
    }
});
Users.unshift({
    id: '10000',
    username: 'admin',
    password: '123456'
})

let Orders = [1,2,3,4,5,6,7,8,9].map((item, index) => {
    return {
        orderNumber: `0000${index + 1}`,
        orderName: `订单${index + 1}`,
        type: '种类0',
        onePrice: '100',
        num: '222',
        person: 'admin'
    }
});

let Types = [1,2,3,4,5,6].map((item, index) => {
    return {
        id: `${index}`,
        typeName: `种类${index}`
    }
})

module.exports = [
    {
        url: '/login',
        type: 'get',
        data: (data) => {
            for(let i=0,len=Users.length;i<len;i++) {
                const { username, password } = Users[i];
                if(username === data.username && password === data.password) {
                    return username;
                }
            }

            return 'failed';
        }
    },
    {
        url: '/getMessages',
        type: 'get',
        data: () => {
            return Messages;
        }
    },
    {
        url: '/addMessage',
        type: 'get',
        data: (data) => {
            console.log('addMessage get', data);
        }
    },
    {
        url: '/addMessage',
        type: 'post',
        data: (data) => {
            console.log('addMessage',data);
        }
    },
    {
        url: '/getOrders',
        type: 'get',
        data: () => {
            return Orders;
        }
    },
    {
        url: '/getUsers',
        type: 'get',
        data: () => {
            return Users;
        }
    },
    {
        url: '/getTypes',
        type: 'get',
        data: () => {
            return Types;
        }
    },
]