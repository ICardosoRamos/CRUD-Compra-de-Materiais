"use strict";

const express = require("express");

const solicitacoesController = require("../../controllers/solicitacoesController");

const router = express.Router();

router.get("/solicitacoes", solicitacoesController.getAllsolicitacoes);
router.post("/solicitacoes", solicitacoesController.createSolicitacao);
router.put("/solicitacoes/:id", solicitacoesController.aprovarSolicitacao);

module.exports = {
  routes: router,
};
