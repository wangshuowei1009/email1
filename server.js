const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 创建邮件传输器
const transporter = nodemailer.createTransport({
    service: "gmail", // 使用 Gmail SMTP
    auth: {
        user: "wangshuowei1009@gmail.com", // 替换为你的 Gmail 地址
        pass: "18500039219wsw", // 替换为你的 Gmail 密码或应用密码
    },
});

// 邮件发送路由
app.post("/send-email", (req, res) => {
    const email = req.body.email; // 从请求体中获取邮箱

    const mailOptions = {
        from: "wangshuowei1009@gmail.com", // 替换为你的 Gmail 地址
        to: email, // 发送到用户输入的邮箱
        subject: "感谢您的提交！",
        text: "谢谢您填写表单，我们会尽快与您联系。",
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("邮件发送失败:", error);
            return res.status(500).json({ message: "邮件发送失败" });
        }
        console.log("邮件发送成功:", info.response);
        res.json({ message: "邮件发送成功" });
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行，监听端口 ${PORT}`);
});