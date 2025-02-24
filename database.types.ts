export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "AER_2025~2016_crawlingdata": {
        Row: {
          abstract: string | null
          article_url: string | null
          author: string | null
          doi: string | null
          jelcode: string | null
          journal_month: number | null
          journal_name: string | null
          journal_pages: string | null
          journal_volume: string | null
          journal_year: number | null
          title: string | null
        }
        Insert: {
          abstract?: string | null
          article_url?: string | null
          author?: string | null
          doi?: string | null
          jelcode?: string | null
          journal_month?: number | null
          journal_name?: string | null
          journal_pages?: string | null
          journal_volume?: string | null
          journal_year?: number | null
          title?: string | null
        }
        Update: {
          abstract?: string | null
          article_url?: string | null
          author?: string | null
          doi?: string | null
          jelcode?: string | null
          journal_month?: number | null
          journal_name?: string | null
          journal_pages?: string | null
          journal_volume?: string | null
          journal_year?: number | null
          title?: string | null
        }
        Relationships: []
      }
      all_articles: {
        Row: {
          abstract: string
          article_id: number
          article_url: string
          created_at: string
          doi: string
          journal_month: number
          journal_name: string
          journal_pages: string
          journal_volume: string
          journal_year: number
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          abstract: string
          article_id?: never
          article_url: string
          created_at?: string
          doi: string
          journal_month: number
          journal_name: string
          journal_pages: string
          journal_volume: string
          journal_year: number
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          abstract?: string
          article_id?: never
          article_url?: string
          created_at?: string
          doi?: string
          journal_month?: number
          journal_name?: string
          journal_pages?: string
          journal_volume?: string
          journal_year?: number
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      article_author: {
        Row: {
          article_id: number
          author_id: number
          created_at: string
        }
        Insert: {
          article_id: number
          author_id: number
          created_at?: string
        }
        Update: {
          article_id?: number
          author_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_author_article_id_all_articles_article_id_fk"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "all_articles"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "article_author_author_id_author_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author"
            referencedColumns: ["author_id"]
          },
        ]
      }
      article_jel_code: {
        Row: {
          article_id: number
          created_at: string
          jel_code_id: number
          updated_at: string
        }
        Insert: {
          article_id: number
          created_at?: string
          jel_code_id: number
          updated_at?: string
        }
        Update: {
          article_id?: number
          created_at?: string
          jel_code_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_jel_code_article_id_all_articles_article_id_fk"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "all_articles"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "article_jel_code_jel_code_id_jel_code_jel_code_id_fk"
            columns: ["jel_code_id"]
            isOneToOne: false
            referencedRelation: "jel_code"
            referencedColumns: ["jel_code_id"]
          },
        ]
      }
      author: {
        Row: {
          author_id: number
          author_name: string
          created_at: string
        }
        Insert: {
          author_id?: never
          author_name: string
          created_at?: string
        }
        Update: {
          author_id?: never
          author_name?: string
          created_at?: string
        }
        Relationships: []
      }
      jel_code: {
        Row: {
          created_at: string
          jel_code: string
          jel_code_id: number
          jel_code_name: string
          jel_code_sector1: string
          jel_code_sector1_name: string
          jel_code_sector2: string
          jel_code_sector2_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          jel_code: string
          jel_code_id?: never
          jel_code_name: string
          jel_code_sector1: string
          jel_code_sector1_name: string
          jel_code_sector2: string
          jel_code_sector2_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          jel_code?: string
          jel_code_id?: never
          jel_code_name?: string
          jel_code_sector1?: string
          jel_code_sector1_name?: string
          jel_code_sector2?: string
          jel_code_sector2_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profile_save_article: {
        Row: {
          article_id: number
          created_at: string
          profile_id: string
        }
        Insert: {
          article_id: number
          created_at?: string
          profile_id: string
        }
        Update: {
          article_id?: number
          created_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_save_article_article_id_all_articles_article_id_fk"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "all_articles"
            referencedColumns: ["article_id"]
          },
          {
            foreignKeyName: "profile_save_article_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          degree: Database["public"]["Enums"]["degree"]
          first_name: string
          last_name: string
          major: string | null
          profile_id: string
          university: string | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          degree?: Database["public"]["Enums"]["degree"]
          first_name: string
          last_name: string
          major?: string | null
          profile_id: string
          university?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          degree?: Database["public"]["Enums"]["degree"]
          first_name?: string
          last_name?: string
          major?: string | null
          profile_id?: string
          university?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      test_crawlingdata: {
        Row: {
          abstract: string | null
          author: string | null
          jelcode: string | null
          journal_name: string | null
          journal_pages: string | null
          journal_volume: string | null
          title: string | null
        }
        Insert: {
          abstract?: string | null
          author?: string | null
          jelcode?: string | null
          journal_name?: string | null
          journal_pages?: string | null
          journal_volume?: string | null
          title?: string | null
        }
        Update: {
          abstract?: string | null
          author?: string | null
          jelcode?: string | null
          journal_name?: string | null
          journal_pages?: string | null
          journal_volume?: string | null
          title?: string | null
        }
        Relationships: []
      }
      test2_crawlingdata: {
        Row: {
          abstract: string | null
          article_url: string | null
          author: string | null
          doi: string | null
          jelcode: string | null
          journal_month: number | null
          journal_name: string | null
          journal_pages: string | null
          journal_volume: string | null
          journal_year: number | null
          title: string | null
        }
        Insert: {
          abstract?: string | null
          article_url?: string | null
          author?: string | null
          doi?: string | null
          jelcode?: string | null
          journal_month?: number | null
          journal_name?: string | null
          journal_pages?: string | null
          journal_volume?: string | null
          journal_year?: number | null
          title?: string | null
        }
        Update: {
          abstract?: string | null
          article_url?: string | null
          author?: string | null
          doi?: string | null
          jelcode?: string | null
          journal_month?: number | null
          journal_name?: string | null
          journal_pages?: string | null
          journal_volume?: string | null
          journal_year?: number | null
          title?: string | null
        }
        Relationships: []
      }
      total_year: {
        Row: {
          journal_year: number
        }
        Insert: {
          journal_year: number
        }
        Update: {
          journal_year?: number
        }
        Relationships: []
      }
    }
    Views: {
      disticnt_sector2: {
        Row: {
          jel_code_sector2: string | null
          jel_code_sector2_name: string | null
        }
        Relationships: []
      }
      number_of_all_articles_years: {
        Row: {
          article_count: number | null
          journal_year: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      article_year_list: {
        Args: {
          category_level: string
          category_value: string[]
        }
        Returns: {
          article_id: number
          journal_year: number
          title: string
          author: string
          abstract: string
          journal_name: string
          jelcode: string
          article_url: string
        }[]
      }
      count_articles_by_jel: {
        Args: {
          category_level: string
          category_value: string
        }
        Returns: {
          journal_year: number
          cnt: number
          total_cnt: number
          ratio: number
        }[]
      }
      count_articles_by_jel_v2: {
        Args: {
          category_level: string
          category_value: string
        }
        Returns: {
          journal_year: number
          cnt: number
          total_cnt: number
          ratio: number
        }[]
      }
      count_articles_by_jel2: {
        Args: {
          category_level: string
          category_values: string[]
        }
        Returns: {
          journal_year: number
          cnt: number
          total_cnt: number
          ratio: number
        }[]
      }
      count_articles_by_sector: {
        Args: {
          sector_code: string
        }
        Returns: {
          year: number
          cnt: number
        }[]
      }
      get_articles_by_jel_code_ratio: {
        Args: {
          p_jel_code_sector: string
        }
        Returns: {
          journal_year: number
          cnt: number
          total_cnt: number
          ratio: number
        }[]
      }
      original_count_articles_by_jel: {
        Args: {
          category_level: string
          category_value: string
        }
        Returns: {
          journal_year: number
          cnt: number
          total_cnt: number
          ratio: number
        }[]
      }
    }
    Enums: {
      degree:
        | "On Bachelor Course"
        | "Bachelor"
        | "On Master Course"
        | "Master"
        | "On PhD Course"
        | "PhD"
        | "N/A"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
