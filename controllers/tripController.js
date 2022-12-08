'use strict'

const tripRepository = require('../repositories/trip-repository')
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const config = require('../config')

const _repo = new tripRepository()

function tripController() {}

tripController.prototype.post = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.usuario, 'Informe o id do usuário')
  _validator.isRequired(req.body.ano, 'Informe o ano da viagem')
  _validator.isRequired(req.body.estado, 'Informe o estado da viagem')

  ctrlBase.post(_repo, _validator, req, res)
}

tripController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.usuario, 'Informe o id do usuário')
  _validator.isRequired(req.body.ano, 'Informe o ano da viagem')
  _validator.isRequired(req.body.estado, 'Informe o estado da viagem')

  ctrlBase.put(_repo, _validator, req, res)
}

tripController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

tripController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

tripController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

tripController.prototype.authenticate = async (req, res) => {
    let _validator = new validators()
  
    _validator.isRequired(req.body.email, 'Informe o seu email')
    _validator.isEmail(req.body.email, 'O email informado é inválido')
    _validator.isRequired(req.body.password, 'Informe a sua senha')
  
    if (!_validator.isValid()) {
      res.status(400).send({
        message: 'Não foi possível efetuar o Login!',
        validation: _validator.errors()
      })
    }
  
    let user = await _repo.authenticate(req.body.email, req.body.password)
    if (user) {
      res.status(200).send({
          user: user,
          token: jwt.sign(
              {
              user: user
              },
              config.secretKey
          )
      })
    } else {
      res.status(404).send({
        message: 'Usuário e senha inválidos!'
      })
    }
}

module.exports = tripController
