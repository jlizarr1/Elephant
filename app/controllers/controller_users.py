from pathlib import Path

from flask import Blueprint, jsonify, request, send_from_directory, send_file
from app import mongo
from app.models.models import User, AbstractUser, Admin, UserDao, DaoFactory

users_router = Blueprint("user", __name__)

daoFactory = DaoFactory()
usersColl = mongo.db.users # our users collection in mongodb
mongo_user_dao = daoFactory.getDao('user', usersColl) # initialize a DAO with the collection

adminEmails = ['yifanandrew@yahoo.com', 'seekr.oose@gmail.com']

@users_router.route('/api/userinfo', methods=['POST'])
def add_user():
    name = request.form['username']
    email = request.form['email']
    optIn = request.form['optIn']
    
    # Find a matching user
    matchingUser = mongo_user_dao.findAllMatchingEmail(email)
    listOfItemIds = []
    
    # If a user already exists upon login, then don't create a new user
    if matchingUser:
        return jsonify(matchingUser[0].toDict()), 200
    

    if (email in adminEmails):
        user = Admin(name=name, email=email, optIn=optIn, listOfItemIds=listOfItemIds)
        mongo_user_dao.insert(user)
        return jsonify(user.toDict()), 200
    else:
        user = User(name=name, email=email, optIn=optIn, listOfItemIds=listOfItemIds)
        mongo_user_dao.insert(user)
        return jsonify(user.toDict()), 200
        

@users_router.route('/api/userinfo', methods=['PUT'])
def update_user():
    name = request.form['username']
    email = request.form['email']
    optIn = request.form['optIn']
    # print(optIn)
    matchingUser = mongo_user_dao.findAllMatchingEmail(email)

    if (isinstance(matchingUser[0], Admin)):
        user = Admin(Id=matchingUser[0].Id, name=name, email=email, optIn=optIn, listOfItemIds=matchingUser[0].listOfItemIds)
        mongo_user_dao.update(user)
        return jsonify(user.toDict()), 200
    else:
        user = User(Id=matchingUser[0].Id, name=name, email=email, optIn=optIn, listOfItemIds=matchingUser[0].listOfItemIds)
        mongo_user_dao.update(user)
        return jsonify(user.toDict()), 200
    
@users_router.route('/api/userinfo/<Id>', methods=['DELETE'])
def delete_user(Id):
    numDeleted = mongo_user_dao.remove(Id)

    if numDeleted == 1:
        output = {'message': 'deleted'}
    else:
        output = {'message': 'not deleted'}

    return jsonify({'result': output}), 200


@users_router.route('/api/userinfo', methods=['GET'])
def get_all_users():
    # get list of all items using DAO and specifying the tags
    listOfUsers = mongo_user_dao.findAll()

    output = [user.toDict() for user in listOfUsers]
    return jsonify(output), 200

@users_router.route('/api/userinfo/<email>', methods=['GET'])
def get_user_by_email(email):
    # get list of all items using DAO and specifying the tags
    listOfUsers = mongo_user_dao.findAllMatchingEmail(email)

    output = [user.toDict() for user in listOfUsers]
    return jsonify(output), 200

@users_router.route('/api/optin/<email>', methods=['GET'])
def get_user_opt_in(email):
    # get list of all items using DAO and specifying the tags
    optInUsers = mongo_user_dao.findAllOptIn(email)
    if not optInUsers:
        output = [False]
    else:
        output = [True]
    return jsonify(output), 200