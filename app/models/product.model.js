module.exports=(sequelize,Sequelize)=>{
let productTable=sequelize.define('ProductSequelize',{
        productid:{
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        productitle:{
            type:Sequelize.STRING,
        },
        productdescription:{
            type:Sequelize.STRING
        },
        productprice:{
            type :Sequelize.INTEGER,
        },
        productbrand:{
            type:Sequelize.STRING,
        },
        productrating:{
            type:Sequelize.STRING,
        },
        productimageid:{
            type:Sequelize.INTEGER,
        },
        productsize:{
            type:Sequelize.STRING,
        },
        productquantity:{
            type:Sequelize.INTEGER,
        },
        productcateogry:{
            type:Sequelize.STRING,
        },
        productimg:{
            type:Sequelize.STRING
        }
    });
    return productTable;
}