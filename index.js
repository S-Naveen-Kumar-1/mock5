const express = require("express")
const app = express()
const cors = require("cors")
const { connection } = require("./db")
const { UserModel } = require("./model/user.model")
const { userRouter } = require("./routes/user.Routes")
app.use(express.json())
app.use(cors())
app.use("users", userRouter)

app.post("/contact", async (req, res) => {
    const { name, email, phone, label } = req.body
    console.log(req.body)
    try {
        const user = new UserModel({
            name,
            email,
            phone,
            label
        })
        await user.save()
        res.status(200).send({ 'msg': "user added successfully", "data": user })
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
app.get("/", async (req, res) => {

    try {

        const data = await UserModel.find()
        res.status(200).send({ "data": data })
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
app.patch("/edit/:id", async (req, res) => {
    // const { name, email, phone, label, book } = req.body
    // console.log(req.body)
    const { id } = req.params
    const user = await UserModel.findOne({ _id: id })
    try {
        await UserModel.findByIdAndUpdate({ _id: user.id }, req.body)
        res.status(200).send({ 'msg': "user data updated successfully", "data": req.body })
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
app.delete("/delete/:id", async (req, res) => {
    // const { name, email, phone, label, book } = req.body
    // console.log(req.body)
    const { id } = req.params
    const user = await UserModel.findOne({ _id: id })
    console.log(user)
    try {
        await UserModel.findByIdAndDelete({ _id: user.id })
        res.status(200).send({ 'msg': "user data deleted successfully" })
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
app.listen(8080, async () => {
    try {
        await connection
        console.log("connected to db")
        console.log("server running in 8080")
    }
    catch (err) {
        console.log(err)
    }
})