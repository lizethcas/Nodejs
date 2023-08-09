const fs = require("fs").promises;


const contactsPath = './db/contacts.json'


function listContacts() {
    return fs.readFile(contactsPath).then(data => {
        return JSON.parse(data.toString())
    })


}

function getContactById(contactId) {
    return listContacts()
        .then((list) => {
            const filteredContact = list.find((contact) => contact.id === contactId);
            if (filteredContact) {
                return filteredContact;
            } else {
                throw new Error(`No se encontró ningún contacto con el id ${contactId}.`);
            }
        })
        .catch((err) => {
            console.error(err);
            throw err; // Puedes volver a lanzar el error si es necesario
        });
}

function removeContact(contactId) {
    return listContacts().then((list) => {
        const filteredList = list.filter((contact) => contact.id !== contactId);
        return fs.writeFile(contactsPath, JSON.stringify(filteredList), err => {
            if (err) {
                console.err(err);
            }
        }).then(() => `El contacto con el id ${contactId} fue removido con exito.`)
    })
}

function addContact(name, email, phone) {
    return listContacts().then((list) => {
        const addNewContact = {
            "id": "ABCDEFGHIJKLMNOPQ",
            "name": name,
            "email": email,
            "phone": phone
        };
        list.push(addNewContact)
        return fs.writeFile(contactsPath, JSON.stringify(list), err => {
            if (err) {
                console.err(err);
            }
        }).then(() => `El contacto  ${name} se agrego correctamente.`)
    })
}

module.exports = {
    listContacts, getContactById, removeContact, addContact
}