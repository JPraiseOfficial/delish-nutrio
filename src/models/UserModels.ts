import mysqldb from "../config/mysqldb.js";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

/* ---------- User Model ---------- */
class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare username: string | null;
  declare phone_number: string;
  declare email: string;
  declare password: string;
  declare verifyEmailToken: string | null;
  declare verifyEmailTokenExpires: Date | null;
  declare isVerified: boolean;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: true },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    verifyEmailToken: { type: DataTypes.STRING, allowNull: true },
    verifyEmailTokenExpires: { type: DataTypes.DATE, allowNull: true },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: mysqldb,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

/* ---- UserProfile Model ---- */
class UserProfile extends Model<
  InferAttributes<UserProfile>,
  InferCreationAttributes<UserProfile>
> {
  declare id: CreationOptional<number>;
  declare gender: string;
  declare age: string;
  declare country: string;
  declare region: string;
  declare dietary_preferences: string;
  declare health_goals: string;
  declare activity_levels: string;
  declare allergies: string;
  declare medical_condition: string;
  declare height: string;
  declare weight: string;

  declare UserId: ForeignKey<User["id"]>;
}

UserProfile.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    gender: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING, allowNull: false },
    dietary_preferences: { type: DataTypes.STRING, allowNull: false },
    health_goals: { type: DataTypes.STRING, allowNull: false },
    activity_levels: { type: DataTypes.STRING, allowNull: false },
    allergies: { type: DataTypes.STRING, allowNull: false },
    medical_condition: { type: DataTypes.STRING, allowNull: false },
    height: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: mysqldb,
    modelName: "UserProfile",
    tableName: "User_Profiles",
    timestamps: true,
  }
);

/* --- UserMealPlan Model --- */
class UserMealPlan extends Model<
  InferAttributes<UserMealPlan>,
  InferCreationAttributes<UserMealPlan>
> {
  declare id: CreationOptional<number>;
  declare breakfast: object | null;
  declare lunch: object | null;
  declare dinner: object | null;
  declare snacks: object | null;
  declare other: object | null;

  declare UserId: ForeignKey<User["id"]>;
}

UserMealPlan.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    breakfast: { type: DataTypes.JSON, allowNull: true },
    lunch: { type: DataTypes.JSON, allowNull: true },
    dinner: { type: DataTypes.JSON, allowNull: true },
    snacks: { type: DataTypes.JSON, allowNull: true },
    other: { type: DataTypes.JSON, allowNull: true },
  },
  {
    sequelize: mysqldb,
    modelName: "UserMealPlan",
    tableName: "User_Meal_Plans",
    timestamps: true,
  }
);


User.hasOne(UserProfile);
UserProfile.belongsTo(User);

User.hasOne(UserMealPlan);
UserMealPlan.belongsTo(User);

export { User, UserProfile, UserMealPlan };