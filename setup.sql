CREATE USER webappdbuser with PASSWORD='pasmskjdsnds!i(98892jsdkasd'

execute sp_addrolemember db_datareader, "webappdbuser"
execute sp_addrolemember db_datawriter, "webappdbuser"

CREATE Table users
(

    id INT Identity Primary Key,
    name NVARCHAR(255),
    email NVARCHAR(255)
 );

 SELECT * FROM USERS