import {DataTypes, Model} from "sequelize";
import uuidv4 from "uuid/v4";
import {db} from ".";
import {PasswordHelper} from "../../helpers";


export class Profile extends Model {
}

Profile.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    uuid: {
        defaultValue: () => uuidv4(),
        type: DataTypes.UUID,
    },

    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    userId:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    bio: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    avatar: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: "A password must be provided",
            },
        },
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {tableName: "Profiles", sequelize: db.sequelize});

Profile.beforeCreate(async (profile, options) => {
});
Profile.sync();