
const { UserModel } = require("../model/user.model")
const express = require("express")
const userRouter = express()

userRouter.post("/contact", async (req, res) => {
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
userRouter.patch("/edit/:id", async (req, res) => {

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
userRouter.delete("/delete/:id", async (req, res) => {
    // const { name, email, phone, label, book } = req.body
    // console.log(req.body)
    const { id } = req.params
    const user = await UserModel.findOne({ _id: id })
    try {
        await UserModel.findByIdAndDelete({ _id: user.id })
        res.status(200).send({ 'msg': "user data deleted successfully" })
    }
    catch (err) {
        res.status(400).send({ "err": err.message })
    }
})
module.exports = { userRouter }