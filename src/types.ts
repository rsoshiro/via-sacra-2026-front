export interface ContentItem {
  quem: string;
  quem_extra?: string;
  texto: string;
}

export interface Section {
  id: string;
  titulo: string;
  subtitulo?: string;
  imagem?: string;
  paginas_originais?: number[];
  conteudo: ContentItem[];
}

export interface Metadata {
  titulo: string;
  ano: number;
  periodo: string;
  tema: string;
  paroquia: string;
  local: string;
  capa_path: string;
  logo_path: string;
}

export interface ViaSacraData {
  metadata: Metadata;
  secoes: Section[];
}
