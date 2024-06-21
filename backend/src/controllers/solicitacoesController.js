"use strict";

const Request = require("tedious").Request;
const TYPES = require("tedious").TYPES;
const Connection = require("tedious").Connection;
const env = require("../../env");

const getAllsolicitacoes = (req, res) => {
  try {
    const result = [];
    const connection = new Connection(env);
    let sql = "SELECT * FROM Solicitacoes";

    if (
      req.query.nome_solicitante ||
      req.query.descricao_produto ||
      (req.query.preco && req.query.preco !== "0") ||
      req.query.aprovado
    )
      sql = sql + " WHERE ";

    if (req.query.nome_solicitante)
      sql = sql + "nome_solicitante LIKE @nome_solicitante";

    if (req.query.descricao_produto)
      if (req.query.nome_solicitante)
        sql = sql + " AND descricao_produto LIKE @descricao_produto";
      else sql = sql + "descricao_produto LIKE @descricao_produto";

    if (req.query.preco && req.query.preco !== "0")
      if (req.query.nome_solicitante || req.query.descricao_produto)
        sql = sql + " AND preco LIKE @preco";
      else sql = sql + "preco LIKE @preco";

    if (req.query.aprovado)
      if (
        req.query.nome_solicitante ||
        req.query.descricao_produto ||
        req.query.preco
      ) {
        if (req.query.aprovado === "Reprovadas") sql += " AND aprovado = 0";
        else sql += " AND aprovado = 1";
      } else {
        if (req.query.aprovado === "Reprovadas") sql += "aprovado = 0";
        else sql += "aprovado = 1";
      }

    sql = sql + ";";

    connection.on("connect", async function (err) {
      if (err) throw new Error(err);

      const request = new Request(sql, function (err) {
        if (err) throw new Error(err);
      });

      if (req.query.nome_solicitante) {
        request.addParameter(
          "nome_solicitante",
          TYPES.NVarChar,
          `%${req.query.nome_solicitante}%`
        );
      }

      if (req.query.descricao_produto) {
        request.addParameter(
          "descricao_produto",
          TYPES.NVarChar,
          `%${req.query.descricao_produto}%`
        );
      }

      if (req.query.preco) {
        request.addParameter("preco", TYPES.NVarChar, `%${req.query.preco}%`);
      }

      request.on("row", function (columns) {
        let object = {};
        columns.forEach(function (column) {
          object[column.metadata.colName] = column.value;
        });

        result.push(object);
      });

      request.on("requestCompleted", function (rowCount, more) {
        connection.close();
        return res.send(result);
      });

      connection.execSql(request);
    });

    connection.connect();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: "Ocorreu um erro interno, contate o suporte!" });
  }
};

const createSolicitacao = (req, res) => {
  try {
    const connection = new Connection(env);
    const object = {};

    if (
      !req.body.nome_solicitante ||
      !req.body.descricao_produto ||
      !req.body.preco
    )
      return res
        .status(400)
        .send({ error: "É necessário preencher todos os campos!" });

    connection.on("connect", async function (err) {
      if (err) throw new Error(err);

      const request = new Request(
        "INSERT Solicitacoes (nome_solicitante, descricao_produto, preco, aprovado) OUTPUT INSERTED.ID VALUES (@nome_solicitante, @descricao_produto, @preco, @aprovado)",
        function (err) {
          if (err) throw new Error(err);
        }
      );

      request.addParameter(
        "nome_solicitante",
        TYPES.NVarChar,
        req.body.nome_solicitante
      );
      request.addParameter(
        "descricao_produto",
        TYPES.NVarChar,
        req.body.descricao_produto
      );
      request.addParameter("preco", TYPES.Numeric, req.body.preco);
      request.addParameter("aprovado", TYPES.Bit, false);

      request.on("row", function (columns) {
        columns.forEach(function (column) {
          object[column.metadata.colName] = column.value;
        });
      });

      request.on("requestCompleted", function (rowCount, more) {
        connection.close();
        return res.status(201).send(object);
      });

      connection.execSql(request);
    });

    connection.connect();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: "Ocorreu um erro interno, contate o suporte!" });
  }
};

const aprovarSolicitacao = (req, res, next) => {
  try {
    const id = req.params.id;
    const connection = new Connection(env);

    connection.on("connect", async function (err) {
      if (err) throw new Error(err);

      const request = new Request(
        "UPDATE Solicitacoes SET aprovado = @aprovado WHERE ID = @ID",
        function (err) {
          if (err) throw new Error(err);
        }
      );

      request.addParameter("ID", TYPES.Int, id);
      request.addParameter("aprovado", TYPES.Bit, req.body.aprovado);

      request.on("requestCompleted", function (rowCount, more) {
        connection.close();
        if (rowCount === 0) {
          return res.status(404).send({
            message:
              "Solicitação não encontrada, recarregue a página por gentileza e se o erro persistir, contate o suporte!",
          });
        }
        return res.status(200).send({ message: "Atualizado com sucesso!" });
      });

      connection.execSql(request);
    });

    connection.connect();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: "Ocorreu um erro interno, contate o suporte!" });
  }
};

module.exports = {
  getAllsolicitacoes,
  createSolicitacao,
  aprovarSolicitacao,
};
