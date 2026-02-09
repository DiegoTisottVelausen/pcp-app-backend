import express from "express"
import cors from "cors"

const app = express()
const PORT = 10000

// Middlewares
app.use(cors())
app.use(express.json())

// ---- MOCK ERP (temporário) ----
app.get("/erp", (req, res) => {
  res.json([
    {
      ordem_id: "OP-001",
      produto: "Produto A",
      operacao: "Corte",
      maquina: "Corte",
      tempo: 1,
      data: "2026-02-02"
    },
    {
      ordem_id: "OP-002",
      produto: "Produto B",
      operacao: "Dobra",
      maquina: "Dobra",
      tempo: 2.5,
      data: "2026-02-03"
    },
    {
      ordem_id: "OP-003",
      produto: "Produto C",
      operacao: "Usinagem",
      maquina: "Usinagem",
      tempo: 5,
      data: "2026-02-04"
    },
    {
      ordem_id: "OP-004",
      produto: "Produto D",
      operacao: "Solda",
      maquina: "Solda",
      tempo: 3.5,
      data: "2026-02-05"
    },
    {
      ordem_id: "OP-005",
      produto: "Produto E",
      operacao: "Montagem",
      maquina: "Montagem",
      tempo: 2,
      data: "2026-02-06"
    }
  ])
})



// ---- PCP SALVO ----
let planos = []
let contadorPlano = 1

app.get("/pcp/versoes", (req, res) => {
  res.json(
    planos.map(p => ({
      id: p.id,
      versao: p.versao,
      dataCriacao: p.dataCriacao,
      usuario: p.usuario,
      origem: p.origem
    }))
  )
})

app.post("/pcp", (req, res) => {
  const { ordens, usuario = "admin", origem = "simulacao" } = req.body

  const novoPlano = {
    id: contadorPlano++,
    versao: `v${contadorPlano}`,
    dataCriacao: new Date().toISOString(),
    usuario,
    origem,
    ordens
  }

  planos.push(novoPlano)

  res.json(novoPlano)
})


app.get("/pcp", (req, res) => {
  if (planos.length === 0) {
    return res.json([])
  }

  // retorna a última versão salva
  const ultimoPlano = planos[planos.length - 1]
  res.json(ultimoPlano.ordens)
})


// ---- START SERVER ----
app.listen(PORT, () => {
  console.log(`✅ Backend PCP rodando na porta ${PORT}`)
})

