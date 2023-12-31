/* eslint-disable @typescript-eslint/no-extraneous-class */
import mysql, { Connection } from 'mysql2/promise'
import {
  UUID,
  UserModel,
  FolderModel,
  NoteModel,
  dataNoteandFolder,
  FolderMap
} from '../../types'
import { RowDataPacket } from 'mysql2'

const DEFAULT_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'task_glide'
}

const CONNECTION_DATA = DEFAULT_CONFIG

const connect = async (): Promise<Connection | undefined> => {
  try {
    const connection = await mysql.createConnection(CONNECTION_DATA)
    return connection
  } catch (error) {
    console.log(error)
  }
}

export class notesModel {
  static async createUser ({ data }: { data: UserModel }): Promise<void> {
    const { uid, name, email } = data
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const queryUser: string =
          ' select * from task_glide.usuarios where  usuarios.id_usuario= (?) ;'
        const [result] = await connectiondb.query<RowDataPacket[]>(queryUser, [
          uid
        ])
        if (result.length === 0) {
          const query: string =
            'insert into task_glide.usuarios(id_usuario,nombre,email) values (?,?,?)'
          await connectiondb?.query(query, [uid, name, email])
        }
      } catch (e) {
        throw new Error('Error al crear el usuario')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async getAllUser (): Promise<RowDataPacket[][]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'select  BIN_TO_UUID(id_usuario) id_usuario,nombre , email ,telefono from task_glide.usuarios;'
        const [result] = await connectiondb.query<RowDataPacket[][]>(query)
        return result
      } catch (e) {
        throw new Error('Error al consultar el usuario')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async deleteUser ({ id }: { id: UUID }): Promise<RowDataPacket[][]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'delete from task_glide.usuarios where usuarios.id_usuario = UUID_TO_BIN(?);'
        await connectiondb.query(query, id)
      } catch (e) {
        throw new Error('Error al eliminar el usuario')
      }
      const [result] = await connectiondb.query<RowDataPacket[][]>(
        'select  nombre , email ,telefono from task_glide.usuarios;'
      )
      return result
    } else {
      throw new Error('error al conectar con la base de datos')
    }
  }

  static async getAllFolders ({
    uid
  }: {
    uid: string
  }): Promise<RowDataPacket[][]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'select * from task_glide.getallfolders where id_usuario=(?) ;'
        const [result] = await connectiondb.query<RowDataPacket[][]>(query, [
          uid
        ])

        return result
      } catch (e) {
        throw new Error('Error al consultar las carpetas')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async createFolder ({
    data,
    uid
  }: {
    data: FolderModel
    uid: string
  }): Promise<void> {
    const { nombre } = data
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'insert into task_glide.carpetas (nombre_carpeta) values (?) '
        await connectiondb.query<RowDataPacket[]>(query, nombre)

        const query2: string =
          'select id_carpeta,created from task_glide.carpetas where carpetas.nombre_carpeta=(?) ORDER BY created desc limit 1'

        const [result2] = await connectiondb.query<RowDataPacket[]>(query2, [
          nombre
        ])

        const query3: string =
          'insert into task_glide.carpeta_usuario (id_usuario,id_carpeta) values (?,?)'

        await connectiondb.query<RowDataPacket[]>(query3, [
          uid,
          result2[0].id_carpeta
        ])
      } catch (e) {
        throw new Error('Error al crear la carpeta')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async deleteFolder ({ id }: { id: number }): Promise<void> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'delete from task_glide.carpetas where task_glide.carpetas.id_carpeta= (?);'
        await connectiondb.query(query, id)
      } catch (e) {
        throw new Error('Error al eliminar el usuario')
      }
    } else {
      throw new Error('error al conectar con la base de datos')
    }
  }

  static async createNote ({ data }: { data: NoteModel }): Promise<void> {
    const { temaNota, fechaNota, descripcionNota, idCarpeta } = data
    const connectiondb = await connect()

    if (connectiondb != null) {
      try {
        const query: string =
          'insert into task_glide.notas (tema_nota,fecha_nota,descripcion_nota,id_carpeta) values (?,?,?,?);'
        await connectiondb.query(query, [
          temaNota,
          fechaNota,
          descripcionNota,
          idCarpeta
        ])
      } catch (e) {
        throw new Error('Error al crear la nota')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async getAllNotes ({
    data
  }: {
    data: UserModel
  }): Promise<RowDataPacket[][]> {
    const { uid } = data
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'select * from task_glide.getallnotes where getallnotes.id_usuario = (?)'
        const [result] = await connectiondb.query<RowDataPacket[][]>(query, [
          uid
        ])
        return result
      } catch (e) {
        throw new Error('Error al consultar las notas')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async getAllNotesandFolders (): Promise<RowDataPacket[][]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'select carpetas.id_carpeta, carpetas.nombre_carpeta, id_nota, tema_nota, descripcion_nota, notas.id_carpeta as notas_carpeta from task_glide.carpetas inner join task_glide.notas on task_glide.carpetas.id_carpeta = task_glide.notas.id_carpeta;'
        const [result] = await connectiondb.query<RowDataPacket[][]>(query)

        return result
      } catch (e) {
        throw new Error('Error al consultar las notas y carpetas')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async getAllNotesandFoldersbyUser ({
    data
  }: {
    data: UserModel
  }): Promise<FolderMap[]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      const idUser = data.uid
      try {
        const query: string =
          'select * from task_glide.getCarpetNotes where  getCarpetNotes.id_usuario = (?)'
        const [result] = await connectiondb.query<RowDataPacket[]>(query, [
          idUser
        ])
        const folderMap = new Map<number, FolderMap>()

        // Iterar sobre el resultado y mapear las notas a las carpetas correspondientes
        result.forEach((row) => {
          const folderId = row.id_carpeta
          const folderName = row.nombre_carpeta

          // Si la carpeta aún no está en el mapa, agréguela con una lista vacía de notas
          if (!folderMap.has(folderId)) {
            folderMap.set(folderId, {
              id_carpeta: folderId,
              nombre_carpeta: folderName,
              notas: []
            })
          }

          // Agregar la nota a la carpeta correspondiente en el mapa
          const note = {
            ID_Nota: row.ID_Nota,
            tema_nota: row.tema_nota,
            id_usuario: row.id_usuario
          }

          const folder = folderMap.get(folderId)
          if (folder != null) {
            folder.notas.push(note)
          }
        })

        // Convertir el mapa a un array de carpetas
        const folders = Array.from(folderMap.values())

        return folders
      } catch (e) {
        throw new Error('Error al consultar las notas y carpetas')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async getNotesByIds (ids: number[]): Promise<RowDataPacket[]> {
    const connectiondb = await connect()
    const notes: RowDataPacket[] = []
    if (connectiondb != null) {
      try {
        for (const id of ids) {
          const query: string = 'SELECT id_nota,tema_nota,fecha_nota,descripcion_nota,notas.id_carpeta,usuarios.id_usuario AS id_usuario FROM task_glide.notas INNER JOIN task_glide.carpetas ON notas.id_carpeta = carpetas.id_carpeta  INNER JOIN task_glide.carpeta_usuario ON carpetas.id_carpeta = carpeta_usuario.id_carpeta  INNER JOIN task_glide.usuarios ON carpeta_usuario.id_usuario = usuarios.id_usuario where id_nota=(?)'
          const [result] = await connectiondb.query<RowDataPacket[]>(query, [id])
          if (result.length > 0) {
            notes.push(...result)
          }
        }
        return notes
      } catch (e) {
        throw new Error('Error al consultar las notas y carpetas')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async updateNoteandFolder ({
    dataNoteandFolder
  }: {
    dataNoteandFolder: dataNoteandFolder
  }): Promise<RowDataPacket[][]> {
    const { idNota, idCarpeta } = dataNoteandFolder
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string =
          'update task_glide.notas set task_glide.notas.id_carpeta=(?) where task_glide.notas.id_nota=(?);'
        const [result] = await connectiondb.query<RowDataPacket[][]>(query, [
          idCarpeta,
          idNota
        ])
        return result
      } catch (e) {
        throw new Error('Error al actualizar la nota')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async getHistorial ({
    data
  }: {
    data: UserModel
  }): Promise<RowDataPacket[][]> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const { uid } = data
        const query: string =
          'select * from task_glide.getNotesHistorial where id_usuario=(?);'
        const [result] = await connectiondb.query<RowDataPacket[][]>(query, [
          uid
        ])
        return result
      } catch (e) {
        throw new Error('Error al consultar las notas')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }

  static async checkReunion (id: number): Promise<void> {
    const connectiondb = await connect()
    if (connectiondb != null) {
      try {
        const query: string = 'SELECT COUNT(id_reunion) FROM reuniones WHERE id_reunion = (?);'
        const exists = await connectiondb.query<RowDataPacket[]>(query, [id])
        console.log(exists)
      } catch (e) {
        throw new Error('Error al consultar las notas y carpetas')
      }
    } else {
      throw new Error('Error al conectar con la base de datos')
    }
  }
}
