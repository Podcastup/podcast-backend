import {DataTypes, Model} from "sequelize";
import uuidv4 from "uuid/v4";
import {db} from ".";

export class Notifications extends Model {
}

Notifications.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    uuid: {
        defaultValue: () => uuidv4(),
        type: DataTypes.UUID,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                msg: "Email is required",
            },
        },
    },
    event: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: "An event must be provided",
            },
        },
    },
    message: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    buttonLink: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: "A button link must be provided",
            },
        },
    },
    buttonText: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: "A button text must be provided",
            },
        },
    },
}, {tableName:"Notifications", sequelize:db.sequelize});

Notifications.beforeCreate((notifications, options) =>{

});
Notifications.sync();
