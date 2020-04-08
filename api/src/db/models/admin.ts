import {DataTypes, Model} from "sequelize";
import uuidv4 from "uuid/v4";
import {db} from ".";
import {PasswordHelper} from "../../helpers";


export class Admin extends Model {
    public password?: string;
}

Admin.init({
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
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: "A password must be provided",
            },
        },
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: "A first name must be provided",
            },
        },
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: "A last name must be provided",
            },
        },
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {tableName: "Admins", sequelize: db.sequelize});

Admin.beforeCreate(async (admin, options) => {
    admin.password = await PasswordHelper.hashPassword(admin.password as any);
});
Admin.sync()