
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

app.get("/erp/ordens", async (req, res) => {
  try {
    // aqui no futuro vamos chamar a API real do ERP

    // por enquanto, dados de teste (simulando o ERP)
    const dadosErp = [
      {
        id: 101,
        produto: "PROD-001",
        operacao: "Corte",
        horas: 2.5,
        dataEntrega: "2026-02-06"
      },
      {
        id: 102,
        produto: "PROD-002",
        operacao: "Dobra",
        horas: 1.75,
        dataEntrega: "2026-02-04"
      }
    ]

    res.json(dadosErp)
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: "Erro ao buscar dados do ERP" })
  }
})


app.listen(PORT, () => {
  console.log(`🚀 Backend PCP rodando na porta ${PORT}`)
})
