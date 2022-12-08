// Definindo os 'imports'
const repBase = require('../bin/base/repository-base')
const firebase = require('../db')
const firestore = firebase.firestore()
const md5 = require('md5')

class tripRepository {
  constructor() {
    this._repBase = new repBase('trip', 'trips')
  }

  async create(data) {
    return await this._repBase.create(data)
  }

  async update(id, data) {
    return await this._repBase.update(id, {
      name: data.name,
      age: data.age,
      city: data.city,
      state: data.state
    })
  }

  async getAll() {
    return await this._repBase.getAll()
  }

  async getById(id) {
    var allStates = await this._repBase.getAll();
    var response = [];
    allStates.forEach(element => {
        if(element.usuario == id) {
            response.push(element);
        }
    });
    return await response;
  }

  async delete(id) {
    return await this._repBase.delete(id)
  }

  async authenticate(email, password) {
    let _hashPassword = md5(password)
    let user
    const res = await firestore
      .collection('users')
      .where('email', '==', email)
      .where('password', '==', _hashPassword)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data())
          user = doc.data()
        })
      })
    return user
  }
}

module.exports = tripRepository
