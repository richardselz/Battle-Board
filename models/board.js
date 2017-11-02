// Board model

// character_id, user_id, character_name, avatar, dexterity, initiative_bonus, hitpoints, conditions

module.exports = function(sequelize, Sequelize) {
    const Board = sequelize.define("Board", {
        board_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        game_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }, 
        character_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    // Associate so that if user deletes we can simply destroy all records
    Board.associate = function(models) {
        Board.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Board;
}