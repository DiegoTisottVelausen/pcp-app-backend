
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// 🔥 "Banco" em memória
let ordens = []

// 📥 Carregar programação
app.get("/pcp", (req, res) => {
  res.json(ordens)
})

// 📤 Salvar programação
app.post("/pcp", (req, res) => {
  ordens = req.body
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend PCP rodando na porta ${PORT}`)
})
