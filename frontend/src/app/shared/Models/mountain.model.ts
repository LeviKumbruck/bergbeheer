export interface Mountain {
  id: number;
  name: string;
  location: string;
  height: number;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface MountainPayload {
  name: string;
  location: string;
  height: number;
  description?: string | null;
}
