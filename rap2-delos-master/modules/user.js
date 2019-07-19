
module.exports = function(sequelize, DataTypes){

    return sequelize.define(

        'user',
        {
            'account' : {
                'type' : DataTypes.STRING(125),
                'allowNull': false
            },
            'password' : {
                'type' : DataTypes.STRING(125),
                'allowNull': false
            }

        }

    );
   

};