
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
    { id:101, produto:"PROD-001", operacao:"Corte",      horas:2.5, dataEntrega:"2026-01-26" },
    { id:102, produto:"PROD-002", operacao:"Dobra",      horas:1.5, dataEntrega:"2026-01-27" },
    { id:103, produto:"PROD-003", operacao:"Furação",    horas:3.0, dataEntrega:"2026-01-28" },
    { id:104, produto:"PROD-004", operacao:"Solda",      horas:2.0, dataEntrega:"2026-01-29" },
    { id:105, produto:"PROD-005", operacao:"Pintura",    horas:4.0, dataEntrega:"2026-01-30" },

    { id:106, produto:"PROD-006", operacao:"Corte",      horas:1.0, dataEntrega:"2026-02-02" },
    { id:107, produto:"PROD-007", operacao:"Dobra",      horas:2.5, dataEntrega:"2026-02-03" },
    { id:108, produto:"PROD-008", operacao:"Usinagem",   horas:5.0, dataEntrega:"2026-02-04" },
    { id:109, produto:"PROD-009", operacao:"Solda",      horas:3.5, dataEntrega:"2026-02-05" },
    { id:110, produto:"PROD-010", operacao:"Montagem",   horas:2.0, dataEntrega:"2026-02-06" },

    { id:111, produto:"PROD-011", operacao:"Corte",      horas:2.0, dataEntrega:"2026-02-09" },
    { id:112, produto:"PROD-012", operacao:"Dobra",      horas:1.5, dataEntrega:"2026-02-10" },
    { id:113, produto:"PROD-013", operacao:"Furação",    horas:3.5, dataEntrega:"2026-02-11" },
    { id:114, produto:"PROD-014", operacao:"Pintura",    horas:2.5, dataEntrega:"2026-02-12" },
    { id:115, produto:"PROD-015", operacao:"Montagem",   horas:4.0, dataEntrega:"2026-02-13" },

    { id:116, produto:"PROD-016", operacao:"Corte",      horas:1.5, dataEntrega:"2026-02-16" },
    { id:117, produto:"PROD-017", operacao:"Dobra",      horas:2.0, dataEntrega:"2026-02-17" },
    { id:118, produto:"PROD-018", operacao:"Solda",      horas:3.0, dataEntrega:"2026-02-18" },
    { id:119, produto:"PROD-019", operacao:"Usinagem",   horas:5.5, dataEntrega:"2026-02-19" },
    { id:120, produto:"PROD-020", operacao:"Pintura",    horas:2.5, dataEntrega:"2026-02-20" },

    { id:121, produto:"PROD-021", operacao:"Montagem",   horas:3.0, dataEntrega:"2026-02-23" },
    { id:122, produto:"PROD-022", operacao:"Corte",      horas:1.0, dataEntrega:"2026-02-24" },
    { id:123, produto:"PROD-023", operacao:"Dobra",      horas:2.0, dataEntrega:"2026-02-25" },
    { id:124, produto:"PROD-024", operacao:"Furação",    horas:3.0, dataEntrega:"2026-02-26" },
    { id:125, produto:"PROD-025", operacao:"Solda",      horas:4.5, dataEntrega:"2026-02-27" },

    { id:126, produto:"PROD-026", operacao:"Pintura",    horas:2.0, dataEntrega:"2026-03-02" },
    { id:127, produto:"PROD-027", operacao:"Usinagem",   horas:6.0, dataEntrega:"2026-03-03" },
    { id:128, produto:"PROD-028", operacao:"Montagem",   horas:3.5, dataEntrega:"2026-03-04" },
    { id:129, produto:"PROD-029", operacao:"Corte",      horas:1.5, dataEntrega:"2026-03-05" },
    { id:130, produto:"PROD-030", operacao:"Dobra",      horas:2.5, dataEntrega:"2026-03-06" },

    { id:131, produto:"PROD-031", operacao:"Furação",    horas:2.0, dataEntrega:"2026-03-09" },
    { id:132, produto:"PROD-032", operacao:"Solda",      horas:3.0, dataEntrega:"2026-03-10" },
    { id:133, produto:"PROD-033", operacao:"Pintura",    horas:4.0, dataEntrega:"2026-03-11" },
    { id:134, produto:"PROD-034", operacao:"Usinagem",   horas:5.0, dataEntrega:"2026-03-12" },
    { id:135, produto:"PROD-035", operacao:"Montagem",   horas:2.5, dataEntrega:"2026-03-13" },

    { id:136, produto:"PROD-036", operacao:"Corte",      horas:1.0, dataEntrega:"2026-03-16" },
    { id:137, produto:"PROD-037", operacao:"Dobra",      horas:2.0, dataEntrega:"2026-03-17" },
    { id:138, produto:"PROD-038", operacao:"Furação",    horas:3.0, dataEntrega:"2026-03-18" },
    { id:139, produto:"PROD-039", operacao:"Solda",      horas:2.5, dataEntrega:"2026-03-19" },
    { id:140, produto:"PROD-040", operacao:"Pintura",    horas:3.5, dataEntrega:"2026-03-20" },

    { id:141, produto:"PROD-041", operacao:"Usinagem",   horas:6.5, dataEntrega:"2026-03-23" },
    { id:142, produto:"PROD-042", operacao:"Montagem",   horas:2.0, dataEntrega:"2026-03-24" },
    { id:143, produto:"PROD-043", operacao:"Corte",      horas:1.5, dataEntrega:"2026-03-25" },
    { id:144, produto:"PROD-044", operacao:"Dobra",      horas:2.5, dataEntrega:"2026-03-26" },
    { id:145, produto:"PROD-045", operacao:"Furação",    horas:3.5, dataEntrega:"2026-03-27" },

    { id:146, produto:"PROD-046", operacao:"Solda",      horas:4.0, dataEntrega:"2026-03-30" },
    { id:147, produto:"PROD-047", operacao:"Pintura",    horas:2.0, dataEntrega:"2026-03-31" },
    { id:148, produto:"PROD-048", operacao:"Usinagem",   horas:5.5, dataEntrega:"2026-04-01" },
    { id:149, produto:"PROD-049", operacao:"Montagem",   horas:3.0, dataEntrega:"2026-04-02" },
    { id:150, produto:"PROD-050", operacao:"Corte",      horas:1.5, dataEntrega:"2026-04-03" }
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
