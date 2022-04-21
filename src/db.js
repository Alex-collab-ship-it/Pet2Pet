import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('transactions.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                //tx.executeSql('DROP TABLE messenger')
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS messenger (id INTEGER PRIMARY KEY NOT NULL,"
                        + "fromUser varchar(200) NOT NULL, toUser varchar(200) NOT NULL, type varchar(200) NOT NULL," +
                        " content varchar(400) NOT NULL, dataStatus datetime NOT NULL, clientGet int(11) NOT NULL)",
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static getMessages(toUser) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`SELECT * FROM messenger WHERE (fromUser=?) OR (toUser=?)`,
                [toUser, toUser],
                (_,result) => resolve(result.rows._array),
                (_, error) => reject(error))
            })
        })
    }

    static addSelfMsgText(mail, toUser, msg, date) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`INSERT INTO messenger (fromUser, toUser, type, content, dataStatus, clientGet ) VALUES (?, ?, ?, ?, ?, ?)`,
                [mail, toUser, "Text", msg, date, 0],
                resolve,
                (_, error) => reject(error))
            })
        })
    }

    static addMsgText(mail, fromUser, msg, date) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`INSERT INTO messenger (fromUser, toUser, type, content, dataStatus, clientGet ) VALUES (?, ?, ?, ?, ?, ?)`,
                [fromUser, mail, "Text", msg, date, 1],
                resolve,
                (_, error) => reject(error))
            })
        })
    }

}