import {DataTypes, Model} from "sequelize";
import uuidv4 from "uuid/v4";
import {db} from ".";

export class Token extends Model {

}

Token.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    uuid: {
        defaultValue: () => uuidv4(),
        type: DataTypes.UUID,
    },
    token: {
        allowNull: false,
        type: DataTypes.STRING,
    },

}, {tableName: "Tokens", sequelize: db.sequelize});

Token.beforeCreate((token, options) =>{

})
Token.sync();