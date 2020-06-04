import {DataTypes, Model} from "sequelize";
import uuidv4 from "uuid/v4";
import {db} from ".";
import {PasswordHelper} from "../../helpers";


export class User extends Model {
  public password?: string;
}

// @ts-ignore
User.init({
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
}, {tableName: "Users", sequelize: db.sequelize});

User.beforeCreate(async (user, options) => {
  user.password = await PasswordHelper.hashPassword(user.password as any);
});
User.sync();