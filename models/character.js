// character_id (created by sequelize), user_id, character_name, avatar, dexterity, initiative_bonus, hitpoints, conditions

module.exports = function(sequelize, Sequelize) {
    const Character = sequelize.define("Character", {
        character_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        character_name: {
            type: Sequelize.STRING
        },
        dexterity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        initiative_bonus: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        initiative_roll: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        hitpoints: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        conditions: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        isCharacter: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    Character.associate = function(models) {
        Character.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Character;
}