module.exports = function(sequelize, Sequelize) {
    const Game = sequelize.define("Game", {
        game_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        game_name: {
            type: Sequelize.STRING,
            unique: true
        },
        round: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        turn_id: {
            type: Sequelize.INTEGER,
            defaultValue: null
        }
    });

    Game.associate = function(models) {
        Game.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Game;
}