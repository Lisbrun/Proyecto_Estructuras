export interface Notes {
  idNota: string | number
  titulo: string
  descripcion: string
  fecha: string
  fechaEliminacion: string | null
  idFolder: number | null
}
export interface Folder {
  idCarpeta: number
  nombre: string
  created: Date
}

export interface NotesandFolder
  extends Pick<Notes, 'idNota' | 'titulo' | 'descripcion' | 'idFolder'>,
    Pick<Folder, 'idCarpeta' | 'nombre'> {
  idNota: number
  // Puedes agregar propiedades adicionales si es necesario.
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export interface dataNoteandFolder {
  idNota: number
  idCarpeta: number
}

export interface NotesModel {
  getAllNotes: () => Promise<Notes[]>
}

export interface UserModel {
  uid: string
  name: string
  email: string
}

export interface UserInterface {
  id_usuario: UUID
  nombre: string
  email: string
  telefono: number
}

export interface FolderModel {
  nombre: string
}

export interface NoteModel {
  temaNota: string
  fechaNota: string
  descripcionNota: string
  idCarpeta: number
}
interface Note {
  ID_Nota: number
  tema_nota: string
  id_usuario: string
}

export interface FolderMap {
  id_carpeta: number
  nombre_carpeta: string
  notas: Note[]
}

export interface notesHistory {
  id_nota: number
  tema_nota: string
  fecha_cambios: string
  id_carpeta: number
  id_usuario: number
}
