import repository.repositoryDB as db

basedatos = db.baseDeDatos("estilo3d","golpea1987")
basedatos.creoBaseDeDatos("comiendohastaloscodos")
basedatos.creoTablas("comiendohastaloscodos")
basedatos.cierroConeccion()