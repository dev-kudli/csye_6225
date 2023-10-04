const fs = require("fs");
const csv = require("csv-parser");

const UserClient = require("database").UserClient;
const userClient = new UserClient();

const readUsersFromCsv = async () => {
    const users = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream("../deployment/users.csv")
        .pipe(csv())
        .on("data", (data) => {
        const jsonItem = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
        };
        users.push(jsonItem);
        })
        .on("end", () => {
            resolve(users);
        });
    });
};

const createDefaultUsers = async (users) => {
    try {
        const addedUsers = await userClient.createUserBulk(users);
        return addedUsers.length;
    } catch (error) {
        throw error;
    }
}

const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[14][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
}

module.exports = {
    readUsersFromCsv,
    createDefaultUsers,
    isValidUUID,
}