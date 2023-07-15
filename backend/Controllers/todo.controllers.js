let TODO = []

const user = require('../Models/user')

const createTodo = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(404).json({
            message: "Title or description Null"
        })
    }
    try {
        const getUser = await user.findOne({ username: req.user.username })
        if (!getUser) {
            res.status(404).json({
                message: "No User"
            })
        }
        getUser.todo.push({ id: Date.now(), title, description })
        await getUser.save();

        res.json({
            todo: getUser.todo
        })

    } catch (error) {
        console.log(error);
    }
}

const getTodos = async (req, res) => {
    const getUser = await user.findOne({ username: req.user.username })

    if (!getUser) {
        res.status(404).json({
            message: "No User"
        })
    }
    const todos = getUser.todo
    res.json({
        todo: todos
    });
}

const deleteTodo = (req, res) => {
    const id = parseInt(req.params.id);
    let index = TODO.findIndex(x => x.id === id)

    if (index === -1) {
        res.status(404).json({
            message: "TODO not found",
            id: id
        });
    }
    else {
        TODO.splice(index, 1);
        res.status(200).send({
            TODO: TODO
        });
    }
}


const updateTodo = (req, res) => {
    const id = parseInt(req.params.id);
    let index = TODO.findIndex(x => x.id === id)

    if (index === -1) {
        res.status(404).json({
            message: "TODO not found",
            id: id
        });
    }
    else {
        TODO[index].title = req.body.title;
        TODO[index].description = req.body.description;
        res.status(200).send({
            TODO: TODO
        });
    }
}

const isAuthenticated = (req, res) => {
    let username = req.user.username;
    let password = req.user.password;

    let isUser = false;

    USERS.forEach(element => {
        if (element.username === username && element.password === password) {
            isUser = true;
        }
    })
    if (isUser) {
        res.json({
            message: true,
            user: req.user.username
        })
    }
    else {
        res.status(403).json({
            message: false
        });
    }
}

const getNumberOfTodos = (req, res) => {
    res.json({
        count: TODO.length
    });
}

module.exports = {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    isAuthenticated,
    getNumberOfTodos
}